import type { components } from '@/api/__generated__/schema'

type BattleResult = {
  participantId: string
  place: number
  solvedTasks: number
  totalTasks: number
  totalTime: string
  username: string
}

type BattleStatus = 'finished' | 'paused' | 'running' | 'waiting'

type BattleTask = {
  description: string
  examples: { input: string; output: string }[]
  id: string
  title: string
}

type Participant = {
  code: string
  id: string
  language: string
  userId: string
  username: string
}

type Role = 'organizer' | 'participant'

type RoomResponse = components['schemas']['RoomResponse']

type TestResult = {
  actual: string
  expected: string
  input: string
  passed: boolean
}

export type {
  BattleResult,
  BattleStatus,
  BattleTask,
  Participant,
  Role,
  RoomResponse,
  TestResult,
}
