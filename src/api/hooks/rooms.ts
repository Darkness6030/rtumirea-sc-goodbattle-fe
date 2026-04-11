import { useMutation } from '@tanstack/react-query'

import { fetchClient } from '../client'

type CreateRoomBody = {
  languages: string[]
  task_ids: string[]
  time_limit: number
}

type JoinRoomBody = {
  code: string
  username: string
}

export function useCreateRoom(
  onSuccess?: (data: Awaited<ReturnType<typeof createRoom>>) => void,
) {
  return useMutation({
    mutationFn: createRoom,
    onSuccess,
  })
}

export function useJoinRoom(
  onSuccess?: (data: Awaited<ReturnType<typeof joinRoom>>) => void,
) {
  return useMutation({
    mutationFn: joinRoom,
    onSuccess,
  })
}

async function createRoom(body: CreateRoomBody) {
  const { data, error } = await fetchClient.POST('/api/rooms', { body })

  if (error) throw error
  if (!data) throw new Error('Create room failed')

  return data
}

async function joinRoom(body: JoinRoomBody) {
  const { data, error } = await fetchClient.POST('/api/rooms/join', { body })

  if (error) throw error
  if (!data) throw new Error('Join room failed')

  return data
}
