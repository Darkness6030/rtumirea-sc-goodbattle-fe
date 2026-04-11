import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useCallback, useEffect, useMemo, useState } from 'react'

import type { BattleStatus, TestResult } from '@/lib/battle-mock'

import { BattleContext } from '@/components/battle/battle-context'
import { BattleResultsDialog } from '@/components/battle/battle-results-dialog'
import { EditorGrid } from '@/components/battle/editor-grid'
import { TaskPanel } from '@/components/battle/task-panel'
import {
  CURRENT_ROLE,
  CURRENT_USER_ID,
  MOCK_BATTLE_RESULTS,
  MOCK_ROOM,
  MOCK_TEST_RESULTS,
} from '@/lib/battle-mock'

export const Route = createFileRoute('/(app)/rooms/$roomId')({
  component: BattleRoomPage,
})

function BattleRoomPage() {
  const navigate = useNavigate()

  useEffect(() => {
    function block(e: ClipboardEvent) {
      e.preventDefault()
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

  const [participants, setParticipants] = useState(MOCK_ROOM.participants)
  const [status, setStatus] = useState<BattleStatus>(MOCK_ROOM.status)
  const [currentTaskIndex, setCurrentTaskIndex] = useState(
    MOCK_ROOM.currentTaskIndex,
  )
  const [testResults, setTestResults] = useState<null | TestResult[]>(null)
  const [isRunningCode, setIsRunningCode] = useState(false)

  const currentTask = MOCK_ROOM.tasks[currentTaskIndex]
  const nextTask = MOCK_ROOM.tasks[currentTaskIndex + 1]

  const onCodeChange = useCallback((participantId: string, code: string) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === participantId ? { ...p, code } : p)),
    )
  }, [])

  const onLanguageChange = useCallback((language: string) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === CURRENT_USER_ID ? { ...p, language } : p)),
    )
    setTestResults(null)
  }, [])

  const onRunCode = useCallback(() => {
    setIsRunningCode(true)
    setTestResults(null)
    setTimeout(() => {
      setTestResults(MOCK_TEST_RESULTS)
      setIsRunningCode(false)
    }, 1500)
  }, [])

  const onStart = useCallback(() => setStatus('running'), [])
  const onPause = useCallback(() => setStatus('paused'), [])
  const onFinish = useCallback(() => setStatus('finished'), [])
  const onTimerEnd = useCallback(() => setStatus('paused'), [])

  const onNextTask = useCallback(() => {
    if (currentTaskIndex < MOCK_ROOM.tasks.length - 1) {
      setCurrentTaskIndex((prev) => prev + 1)
      setStatus('running')
      setTestResults(null)
    }
  }, [currentTaskIndex])

  const contextValue = useMemo(
    () => ({
      availableLanguages: MOCK_ROOM.languages,
      currentTask,
      currentTaskIndex,
      currentUserId: CURRENT_USER_ID,
      isRunningCode,
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
      role: CURRENT_ROLE,
      status,
      testResults,
      timeLimit: MOCK_ROOM.timeLimit,
      totalTasks: MOCK_ROOM.tasks.length,
    }),
    [
      currentTask,
      currentTaskIndex,
      isRunningCode,
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
        results={MOCK_BATTLE_RESULTS}
      />
    </BattleContext>
  )
}
