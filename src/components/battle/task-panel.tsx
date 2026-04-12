import { Copy } from 'lucide-react'
import { toast } from 'sonner'

import {
  Badge,
  Button,
  Card,
  CardContent,
  Separator,
  Typography,
} from '@/components/ui'

import { useBattle } from './battle-context'
import { CountdownTimer } from './countdown-timer'
import { OrganizerControls } from './organizer-controls'

const STATUS_LABELS = {
  finished: 'Завершён',
  paused: 'Пауза',
  running: 'Идёт баттл',
  waiting: 'Ожидание',
} as const

const STATUS_VARIANTS = {
  finished: 'destructive',
  paused: 'outline',
  running: 'default',
  waiting: 'secondary',
} as const

function TaskPanel() {
  const {
    currentTask,
    currentTaskIndex,
    nextTaskTitle,
    onFinish,
    onNextTask,
    onPause,
    onStart,
    onTimerEnd,
    remainingSeconds,
    role,
    roomCode,
    status,
    totalTasks,
  } = useBattle()

  async function handleCopyRoomCode() {
    await navigator.clipboard.writeText(roomCode)
    toast.success('Код комнаты скопирован')
  }

  return (
    <div className="flex w-80 shrink-0 flex-col gap-4">
      <div className="flex shrink-0 flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Badge variant={role === 'organizer' ? 'default' : 'outline'}>
              {role === 'organizer' ? 'Организатор' : 'Участник'}
            </Badge>
            <Button
              className="ml-auto"
              onClick={handleCopyRoomCode}
              size="xs"
              variant="outline"
            >
              <Copy className="size-3.5" />
              {roomCode}
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Typography className="text-muted-foreground" variant="small">
              Задача {currentTaskIndex + 1} из {totalTasks}
            </Typography>
            <div className="flex-1" />
            <Badge variant={STATUS_VARIANTS[status]}>
              {STATUS_LABELS[status]}
            </Badge>
          </div>
        </div>

        <CountdownTimer
          onTimerEnd={onTimerEnd}
          remainingSeconds={remainingSeconds}
          status={status}
        />

        {role === 'organizer' && (
          <>
            <OrganizerControls
              currentTaskIndex={currentTaskIndex}
              onFinish={onFinish}
              onNextTask={onNextTask}
              onPause={onPause}
              onStart={onStart}
              status={status}
              totalTasks={totalTasks}
            />
            {nextTaskTitle && (
              <Typography className="text-muted-foreground" variant="small">
                Следующая: {nextTaskTitle}
              </Typography>
            )}
          </>
        )}

        <Separator />
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
        <Typography variant="h2">{currentTask.title}</Typography>

        <Typography className="whitespace-pre-line" variant="body">
          {currentTask.description}
        </Typography>

        {currentTask.examples.length > 0 && (
          <div className="flex flex-col gap-2">
            <Typography className="font-medium" variant="small">
              Примеры
            </Typography>
            {currentTask.examples.map((ex, i) => (
              <Card key={i} size="sm">
                <CardContent className="space-y-1 font-mono text-sm">
                  <div>
                    <span className="text-muted-foreground">Вход: </span>
                    {ex.input}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Выход: </span>
                    {ex.output}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export { TaskPanel }
