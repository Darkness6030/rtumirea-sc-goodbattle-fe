export type BattleHistoryItem = {
  date: string
  id: string
  languages: string[]
  participants: number
  place?: number
  role: 'organizer' | 'participant'
  solvedTasks: number
  status: 'finished' | 'in_progress'
  title: string
  totalTasks: number
}

export type UserProfile = {
  battlesOrganized: number
  battlesPlayed: number
  email: string
  joinedAt: string
  name: string
  topLanguage: string
  winRate: number
  wins: number
}

export const MOCK_USER: UserProfile = {
  battlesOrganized: 12,
  battlesPlayed: 34,
  email: 'alexey@example.com',
  joinedAt: '2025-09-15',
  name: 'Алексей',
  topLanguage: 'JavaScript',
  winRate: 41,
  wins: 14,
}

export const MOCK_BATTLE_HISTORY: BattleHistoryItem[] = [
  {
    date: '2026-04-05',
    id: 'b1',
    languages: ['javascript', 'python'],
    participants: 4,
    place: 2,
    role: 'participant',
    solvedTasks: 3,
    status: 'finished',
    title: 'Алгоритмы: строки',
    totalTasks: 3,
  },
  {
    date: '2026-04-03',
    id: 'b2',
    languages: ['typescript', 'javascript'],
    participants: 6,
    role: 'organizer',
    solvedTasks: 5,
    status: 'finished',
    title: 'Веб-разработка: основы',
    totalTasks: 5,
  },
  {
    date: '2026-04-01',
    id: 'b3',
    languages: ['python', 'cpp'],
    participants: 3,
    place: 1,
    role: 'participant',
    solvedTasks: 4,
    status: 'finished',
    title: 'Математика и логика',
    totalTasks: 4,
  },
  {
    date: '2026-03-28',
    id: 'b4',
    languages: ['java', 'cpp', 'python'],
    participants: 8,
    role: 'organizer',
    solvedTasks: 3,
    status: 'finished',
    title: 'Структуры данных',
    totalTasks: 4,
  },
  {
    date: '2026-03-25',
    id: 'b5',
    languages: ['javascript'],
    participants: 5,
    place: 3,
    role: 'participant',
    solvedTasks: 2,
    status: 'finished',
    title: 'FizzBuzz Challenge',
    totalTasks: 3,
  },
  {
    date: '2026-03-20',
    id: 'b6',
    languages: ['typescript', 'python'],
    participants: 4,
    role: 'organizer',
    solvedTasks: 4,
    status: 'finished',
    title: 'Сортировки и поиск',
    totalTasks: 4,
  },
]

export const LANGUAGES = [
  { id: 'javascript', label: 'JavaScript' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'python', label: 'Python' },
  { id: 'go', label: 'Go' },
  { id: 'cpp', label: 'C++' },
  { id: 'java', label: 'Java' },
]

export const TASKS = [
  {
    description: 'Напишите функцию, которая переворачивает строку',
    id: '1',
    title: 'Реверс строки',
  },
  {
    description: 'Найдите сумму всех элементов массива',
    id: '2',
    title: 'Сумма массива',
  },
  {
    description: 'Проверьте, является ли строка палиндромом',
    id: '3',
    title: 'Палиндром',
  },
  {
    description: 'Найдите наибольший общий делитель двух чисел',
    id: '4',
    title: 'НОД',
  },
  {
    description: 'Реализуйте функцию FizzBuzz',
    id: '5',
    title: 'FizzBuzz',
  },
]
