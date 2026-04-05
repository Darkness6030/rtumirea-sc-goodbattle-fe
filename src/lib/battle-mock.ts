export type BattleResult = {
  name: string
  participantId: string
  place: number
  solvedTasks: number
  totalTasks: number
  totalTime: string
}
export type BattleRoom = {
  currentTaskIndex: number
  id: string
  languages: string[]
  participants: Participant[]
  status: BattleStatus
  tasks: BattleTask[]
  timeLimit: number
}

export type BattleStatus = 'finished' | 'paused' | 'running' | 'waiting'

export type BattleTask = {
  description: string
  examples: { input: string; output: string }[]
  id: string
  title: string
}

export type Participant = {
  code: string
  id: string
  language: string
  name: string
}

export type Role = 'organizer' | 'participant'

export type TestResult = {
  actual: string
  expected: string
  input: string
  passed: boolean
}

export const CURRENT_ROLE: Role = 'organizer'
export const CURRENT_USER_ID = 'p1'

export const MOCK_TEST_RESULTS: TestResult[] = [
  {
    actual: '"olleh"',
    expected: '"olleh"',
    input: '"hello"',
    passed: true,
  },
  {
    actual: '"elttaB dooG"',
    expected: '"elttaB dooG"',
    input: '"Good Battle"',
    passed: true,
  },
  {
    actual: '"ba"',
    expected: '"cba"',
    input: '"abc"',
    passed: false,
  },
]

export const MOCK_ROOM: BattleRoom = {
  currentTaskIndex: 0,
  id: 'abc123',
  languages: ['javascript', 'typescript', 'python', 'cpp', 'java'],
  participants: [
    {
      code: '// your solution\nfunction reverse(s) {\n  return s.split("").reverse().join("")\n}',
      id: 'p1',
      language: 'javascript',
      name: 'Алексей',
    },
    {
      code: 'def reverse(s):\n    return s[::-1]',
      id: 'p2',
      language: 'python',
      name: 'Мария',
    },
    {
      code: '#include <algorithm>\nstring reverse(string s) {\n  std::reverse(s.begin(), s.end());\n  return s;\n}',
      id: 'p3',
      language: 'cpp',
      name: 'Дмитрий',
    },
  ],
  status: 'waiting',
  tasks: [
    {
      description:
        'Напишите функцию, которая принимает строку и возвращает её в обратном порядке.\n\nОграничения:\n- Длина строки: 1 ≤ s.length ≤ 10⁵\n- Строка содержит только ASCII-символы',
      examples: [
        { input: '"hello"', output: '"olleh"' },
        { input: '"Good Battle"', output: '"elttaB dooG"' },
      ],
      id: '1',
      title: 'Реверс строки',
    },
    {
      description:
        'Найдите сумму всех элементов целочисленного массива.\n\nОграничения:\n- Длина массива: 1 ≤ arr.length ≤ 10⁶\n- Элементы: -10⁹ ≤ arr[i] ≤ 10⁹',
      examples: [
        { input: '[1, 2, 3, 4, 5]', output: '15' },
        { input: '[-1, 0, 1]', output: '0' },
      ],
      id: '2',
      title: 'Сумма массива',
    },
  ],
  timeLimit: 10,
}

export const MOCK_BATTLE_RESULTS: BattleResult[] = [
  {
    name: 'Мария',
    participantId: 'p2',
    place: 1,
    solvedTasks: 2,
    totalTasks: 2,
    totalTime: '08:32',
  },
  {
    name: 'Алексей',
    participantId: 'p1',
    place: 2,
    solvedTasks: 2,
    totalTasks: 2,
    totalTime: '09:15',
  },
  {
    name: 'Дмитрий',
    participantId: 'p3',
    place: 3,
    solvedTasks: 1,
    totalTasks: 2,
    totalTime: '10:00',
  },
]

export const LANGUAGE_LABELS: Record<string, string> = {
  cpp: 'C++',
  java: 'Java',
  javascript: 'JavaScript',
  python: 'Python',
  typescript: 'TypeScript',
}
