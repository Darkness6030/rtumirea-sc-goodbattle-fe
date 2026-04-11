import { $api } from '../query-client'

type BattleRole = 'organizer' | 'participant'

export function battlesQueryOptions(role: BattleRole) {
  return $api.queryOptions('get', '/api/battles', battlesQueryParams(role), {
    retry: false,
    throwOnError: false,
  })
}

export function useBattlesQuery(role: BattleRole) {
  return $api.useQuery('get', '/api/battles', battlesQueryParams(role), {
    retry: false,
    throwOnError: false,
  })
}

function battlesQueryParams(role: BattleRole) {
  return {
    params: {
      query: {
        role,
      },
    },
  }
}
