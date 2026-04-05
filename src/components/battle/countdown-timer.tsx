import { useEffect, useState } from 'react'

import type { BattleStatus } from '@/lib/battle-mock'

import { cn } from '@/lib/utils'

function CountdownTimer({
  onTimerEnd,
  status,
  timeLimit,
}: {
  onTimerEnd: () => void
  status: BattleStatus
  timeLimit: number
}) {
  const [remaining, setRemaining] = useState(timeLimit * 60)

  useEffect(() => {
    setRemaining(timeLimit * 60)
  }, [timeLimit])

  useEffect(() => {
    if (status !== 'running') return

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          onTimerEnd()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [status, onTimerEnd])

  const minutes = Math.floor(remaining / 60)
  const seconds = remaining % 60
  const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  const isLow = remaining < 60 && remaining > 0

  return (
    <div
      className={cn(
        'text-center font-mono text-4xl font-bold tabular-nums',
        isLow && 'text-destructive',
        status === 'waiting' && 'text-muted-foreground',
      )}
    >
      {display}
    </div>
  )
}

export { CountdownTimer }
