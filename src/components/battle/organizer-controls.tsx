import { Flag, Pause, Play, SkipForward } from 'lucide-react'

import type { BattleStatus } from '@/lib/battle-types'

import { Button } from '@/components/ui'

function OrganizerControls({
  currentTaskIndex,
  onFinish,
  onNextTask,
  onPause,
  onStart,
  status,
  totalTasks,
}: {
  currentTaskIndex: number
  onFinish: () => void
  onNextTask: () => void
  onPause: () => void
  onStart: () => void
  status: BattleStatus
  totalTasks: number
}) {
  const isLastTask = currentTaskIndex >= totalTasks - 1

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        {status === 'running' ? (
          <Button className="flex-1" onClick={onPause} variant="outline">
            <Pause className="size-4" />
            Пауза
          </Button>
        ) : (
          <Button
            className="flex-1"
            disabled={status === 'finished'}
            onClick={onStart}
          >
            <Play className="size-4" />
            {status === 'paused' ? 'Продолжить' : 'Старт'}
          </Button>
        )}
        <Button
          disabled={isLastTask || status === 'waiting'}
          onClick={onNextTask}
          variant="outline"
        >
          <SkipForward className="size-4" />
          След. задача
        </Button>
      </div>
      <Button
        disabled={status === 'waiting'}
        onClick={onFinish}
        variant="destructive"
      >
        <Flag className="size-4" />
        Завершить
      </Button>
    </div>
  )
}

export { OrganizerControls }
