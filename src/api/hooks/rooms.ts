import { $api } from '../query-client'

export function useCreateRoom() {
  return $api.useMutation('post', '/api/rooms')
}

export function useJoinRoom() {
  return $api.useMutation('post', '/api/rooms/join')
}
