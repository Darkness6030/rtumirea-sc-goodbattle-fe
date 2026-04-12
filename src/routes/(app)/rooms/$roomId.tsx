import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

import type {
  BattleResult,
  BattleStatus,
  Participant,
  Role,
  TestResult,
} from '@/lib/battle-types'

import { languagesQueryOptions, queryClient, roomQueryOptions } from '@/api'
import { BattleContext } from '@/components/battle/battle-context'
import { BattleResultsDialog } from '@/components/battle/battle-results-dialog'
import { EditorGrid } from '@/components/battle/editor-grid'
import { TaskPanel } from '@/components/battle/task-panel'
import { Spinner } from '@/components/ui'
import {
  connectRoomSocket,
  disconnectRoomSocket,
  onRoomSocketDisconnect,
  onRoomSocketMessage,
  sendRoomSocketMessage,
} from '@/lib/room-socket-client'
import { useAuthStore } from '@/stores/auth-store'

let roomSocketDisconnectTimeout: null | number = null

export const Route = createFileRoute('/(app)/rooms/$roomId')({
  beforeLoad: async ({ params }) => {
    if (!window.navigator.onLine) {
      throw new Error('Потеряно сетевое соединение')
    }

    try {
      await connectRoomSocket(params.roomId)
    } catch {
      throw new Error('Не удалось подключиться к комнате')
    }
  },
  component: BattleRoomPage,
  loader: async ({ params }) => {
    const [languages, room] = await Promise.all([
      queryClient.ensureQueryData(languagesQueryOptions()),
      queryClient.ensureQueryData(roomQueryOptions(params.roomId)),
    ])

    return {
      languages,
      room,
    }
  },
  pendingComponent: PagePending,
})

function BattleRoomPage() {
  const navigate = useNavigate()
  const { languages, room: initialRoom } = Route.useLoaderData()
  const { user } = useAuthStore()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const [socketError, setSocketError] = useState<Error | null>(null)
  const [participants, setParticipants] = useState<Participant[]>(
    initialRoom.participants
      .filter((participant) => participant.role !== 'organizer')
      .map((participant) => ({
        code: participant.code,
        id: participant.id,
        language: participant.language,
        userId: participant.user_id,
        username: participant.username,
      })),
  )
  const [status, setStatus] = useState<BattleStatus>(
    initialRoom.status as BattleStatus,
  )
  const [currentTaskIndex, setCurrentTaskIndex] = useState(
    initialRoom.current_task_index,
  )
  const [testResults, setTestResults] = useState<null | TestResult[]>(null)
  const [battleResults, setBattleResults] = useState<BattleResult[]>([])
  const [isRunningCode, setIsRunningCode] = useState(false)

  const tasks = useMemo(
    () =>
      initialRoom.tasks.map((task) => ({
        description: task.description,
        examples: task.examples,
        id: task.id,
        title: task.title,
      })),
    [initialRoom.tasks],
  )

  const role = initialRoom.role as Role

  const languageNameByCode = useMemo(
    () =>
      Object.fromEntries(
        languages.map((language) => [language.code, language.name]),
      ),
    [languages],
  )

  const currentParticipantId = participants.find(
    (p) => p.userId === user.id,
  )?.id

  const currentTask = tasks[currentTaskIndex] ?? tasks[0]

  if (!currentTask) {
    throw new Error('В комнате нет задач')
  }

  const nextTask = tasks[currentTaskIndex + 1]

  useEffect(() => {
    return onRoomSocketDisconnect((error) => {
      setSocketError(error)
    })
  }, [])

  useEffect(() => {
    const unsubscribe = onRoomSocketMessage((message) => {
      switch (message.type) {
        case 'battle_finished': {
          setBattleResults(
            message.data.results.map((result) => ({
              participantId: result.id,
              place: result.place,
              solvedTasks: result.solved_tasks,
              totalTasks: result.total_tasks,
              totalTime: formatTotalTime(result.total_time),
              username: result.username,
            })),
          )
          setStatus('finished')
          toast.success('Баттл завершен')
          break
        }
        case 'code_update': {
          if (message.data.id === currentParticipantId) {
            return
          }
          setParticipants((prev) =>
            prev.map((participant) =>
              participant.id === message.data.id
                ? { ...participant, code: message.data.code }
                : participant,
            ),
          )
          break
        }
        case 'error': {
          setIsRunningCode(false)
          toast.error(message.data.detail)
          break
        }
        case 'language_change': {
          setParticipants((prev) =>
            prev.map((participant) =>
              participant.id === message.data.id
                ? { ...participant, language: message.data.language }
                : participant,
            ),
          )
          break
        }
        case 'next_task': {
          setCurrentTaskIndex(message.data.currentTaskIndex)
          setIsRunningCode(false)
          setTestResults(null)
          setParticipants((prev) =>
            prev.map((participant) => ({ ...participant, code: '' })),
          )
          toast.info(`Переход к задаче ${message.data.currentTaskIndex + 1}`)
          break
        }
        case 'participant_joined': {
          if (message.data.role === 'organizer') {
            break
          }

          setParticipants((prev) => {
            const existingParticipant = prev.find(
              (participant) => participant.id === message.data.id,
            )

            if (!existingParticipant) {
              return [
                ...prev,
                {
                  code: '',
                  id: message.data.id,
                  language: message.data.language,
                  userId: message.data.user_id,
                  username: message.data.username,
                },
              ]
            }

            return prev.map((participant) =>
              participant.id === message.data.id
                ? {
                    ...participant,
                    language: message.data.language,
                    username: message.data.username,
                  }
                : participant,
            )
          })
          toast.info(`${message.data.username} подключился к комнате`)
          break
        }
        case 'participant_left': {
          const leftParticipantName = participants.find(
            (participant) => participant.id === message.data.id,
          )?.username

          setParticipants((prev) =>
            prev.filter((participant) => participant.id !== message.data.id),
          )

          toast.info(
            leftParticipantName
              ? `${leftParticipantName} покинул комнату`
              : 'Участник покинул комнату',
          )
          break
        }
        case 'run_code_result': {
          setIsRunningCode(false)
          setTestResults(message.data.results)

          const passedCount = message.data.results.filter(
            (result) => result.passed,
          ).length

          toast.success(`Тесты: ${passedCount}/${message.data.results.length}`)
          break
        }
        case 'status_change': {
          setStatus(message.data.status)

          if (message.data.status === 'running') {
            toast.success('Баттл запущен')
          }

          if (message.data.status === 'paused') {
            toast.info('Баттл на паузе')
          }

          if (message.data.status === 'finished') {
            toast.success('Баттл завершен')
          }
          break
        }
      }
    })

    return unsubscribe
  }, [participants, currentParticipantId])

  useEffect(() => {
    function handleOffline() {
      setSocketError(new Error('Потеряно сетевое соединение'))
    }

    if (!window.navigator.onLine) {
      handleOffline()
    }

    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  useEffect(() => {
    if (roomSocketDisconnectTimeout !== null) {
      window.clearTimeout(roomSocketDisconnectTimeout)
      roomSocketDisconnectTimeout = null
    }

    return () => {
      roomSocketDisconnectTimeout = window.setTimeout(() => {
        disconnectRoomSocket()
        roomSocketDisconnectTimeout = null
      }, 150)
    }
  }, [])

  useEffect(() => {
    function block(event: ClipboardEvent) {
      event.preventDefault()
      alert('Копирование и вставка запрещены')
    }

    document.addEventListener('copy', block, { capture: true })
    document.addEventListener('cut', block, { capture: true })
    document.addEventListener('paste', block, { capture: true })

    return () => {
      document.removeEventListener('copy', block, { capture: true })
      document.removeEventListener('cut', block, { capture: true })
      document.removeEventListener('paste', block, { capture: true })
    }
  }, [])

  const onCodeChange = useCallback(
    (participantId: string, code: string) => {
      if (participantId !== currentParticipantId) {
        return
      }

      setParticipants((prev) =>
        prev.map((participant) =>
          participant.id === participantId
            ? { ...participant, code }
            : participant,
        ),
      )

      sendRoomSocketMessage({
        data: {
          code,
        },
        type: 'code_update',
      })
    },
    [currentParticipantId],
  )

  const onLanguageChange = useCallback(
    (language: string) => {
      setParticipants((prev) =>
        prev.map((participant) =>
          participant.id === currentParticipantId
            ? { ...participant, language }
            : participant,
        ),
      )
      setTestResults(null)

      sendRoomSocketMessage({
        data: {
          language,
        },
        type: 'language_change',
      })
    },
    [currentParticipantId],
  )

  const onRunCode = useCallback(() => {
    const currentParticipant = participants.find(
      (participant) => participant.id === currentParticipantId,
    )

    if (!currentParticipant) {
      return
    }

    setIsRunningCode(true)
    setTestResults(null)

    sendRoomSocketMessage({
      data: {
        code: currentParticipant.code,
        language: currentParticipant.language,
        task_id: currentTask.id,
      },
      type: 'run_code',
    })
  }, [participants, currentParticipantId, currentTask.id])

  const onStart = useCallback(() => {
    sendRoomSocketMessage({
      data: {},
      type: 'start_battle',
    })
  }, [])

  const onPause = useCallback(() => {
    sendRoomSocketMessage({
      data: {},
      type: 'pause_battle',
    })
  }, [])

  const onFinish = useCallback(() => {
    sendRoomSocketMessage({
      data: {},
      type: 'finish_battle',
    })
  }, [])

  const onTimerEnd = useCallback(() => {
    sendRoomSocketMessage({
      data: {},
      type: 'pause_battle',
    })
  }, [])

  const onNextTask = useCallback(() => {
    sendRoomSocketMessage({
      data: {},
      type: 'next_task',
    })
    setTestResults(null)
  }, [])

  if (socketError) {
    throw socketError
  }

  const contextValue = useMemo(
    () => ({
      currentParticipantId,
      currentTask,
      currentTaskIndex,
      isRunningCode,
      languageNameByCode,
      languages: initialRoom.languages,
      nextTaskTitle: nextTask?.title,
      onCodeChange,
      onFinish,
      onLanguageChange,
      onNextTask,
      onPause,
      onRunCode,
      onStart,
      onTimerEnd,
      participants,
      remainingSeconds: initialRoom.remaining_seconds,
      role,
      roomCode: initialRoom.code,
      status,
      testResults,
      timeLimit: initialRoom.time_limit,
      totalTasks: initialRoom.total_tasks,
    }),
    [
      currentParticipantId,
      currentTask,
      currentTaskIndex,
      initialRoom.code,
      initialRoom.languages,
      initialRoom.remaining_seconds,
      initialRoom.time_limit,
      initialRoom.total_tasks,
      isRunningCode,
      languageNameByCode,
      nextTask?.title,
      onCodeChange,
      onFinish,
      onLanguageChange,
      onNextTask,
      onPause,
      onRunCode,
      onStart,
      onTimerEnd,
      participants,
      role,
      status,
      testResults,
    ],
  )

  function handleBattleResultsDialogClose() {
    navigate({ to: '/battles' })
  }

  return (
    <BattleContext value={contextValue}>
      <div className="flex min-h-0 flex-1 gap-4 pb-4">
        <TaskPanel />
        <EditorGrid />
      </div>
      <BattleResultsDialog
        onClose={handleBattleResultsDialogClose}
        open={status === 'finished'}
        results={battleResults}
      />
    </BattleContext>
  )
}

function formatTotalTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function PagePending() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Spinner />
    </div>
  )
}
