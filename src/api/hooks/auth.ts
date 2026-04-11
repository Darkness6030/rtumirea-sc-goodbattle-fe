import { useMutation } from '@tanstack/react-query'

import { fetchClient } from '../client'
import { $api, queryClient } from '../query-client'

type LoginBody = {
  email: string
  password: string
}

type RegisterBody = {
  email: string
  password: string
  username: string
}

export function authMeQueryOptions() {
  return $api.queryOptions('get', '/api/auth/me', undefined, {
    retry: false,
    throwOnError: false,
  })
}

export async function fetchAuthUser() {
  try {
    return await queryClient.fetchQuery(authMeQueryOptions())
  } catch {
    return null
  }
}

export function useAuthMeQuery() {
  return $api.useQuery('get', '/api/auth/me', undefined, {
    retry: false,
    throwOnError: false,
  })
}

export function useLogin(
  onSuccess?: (user: Awaited<ReturnType<typeof login>>) => void,
) {
  return useMutation({
    mutationFn: login,
    onSuccess,
  })
}

export function useLogout(onSuccess?: () => void) {
  return useMutation({
    mutationFn: async () => {
      const { error } = await fetchClient.POST('/api/auth/logout', {})

      if (error) throw error
    },
    onSuccess,
  })
}

export function useRegister(
  onSuccess?: (user: Awaited<ReturnType<typeof register>>) => void,
) {
  return useMutation({
    mutationFn: register,
    onSuccess,
  })
}

async function login(body: LoginBody) {
  const { data, error } = await fetchClient.POST('/api/auth/login', { body })

  if (error) throw error
  if (!data) throw new Error('Login failed')

  return data
}

async function register(body: RegisterBody) {
  const { data, error } = await fetchClient.POST('/api/auth/register', {
    body,
  })

  if (error) throw error
  if (!data) throw new Error('Registration failed')

  return data
}
