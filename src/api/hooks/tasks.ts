import { $api } from '../query-client'

export function tasksQueryOptions() {
  return $api.queryOptions('get', '/api/tasks', undefined, {
    retry: false,
    throwOnError: false,
  })
}

export function useTasksQuery() {
  return $api.useQuery('get', '/api/tasks', undefined, {
    retry: false,
    throwOnError: false,
  })
}
