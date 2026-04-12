import { $api } from '../query-client'

export function useLanguagesQuery() {
  return $api.useQuery('get', '/api/languages')
}
