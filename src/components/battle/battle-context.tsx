import { createContext, use } from 'react'

import type {
  BattleStatus,
  BattleTask,
  Participant,
  Role,
  TestResult,
} from '@/lib/battle-mock'

type BattleContextValue = {
  availableLanguages: string[]
  currentTask: BattleTask
  currentTaskIndex: number
  currentUserId: string
  isRunningCode: boolean
  nextTaskTitle?: string
  onCodeChange: (participantId: string, code: string) => void
  onFinish: () => void
  onLanguageChange: (language: string) => void
  onNextTask: () => void
  onPause: () => void
  onRunCode: () => void
  onStart: () => void
  onTimerEnd: () => void
  participants: Participant[]
  role: Role
  status: BattleStatus
  testResults: null | TestResult[]
  timeLimit: number
  totalTasks: number
}

const BattleContext = createContext<BattleContextValue | null>(null)

function useBattle() {
  const ctx = use(BattleContext)
  if (!ctx) {
    throw new Error('useBattle must be used within BattleProvider')
  }
  return ctx
}

export { BattleContext, useBattle }
export type { BattleContextValue }
