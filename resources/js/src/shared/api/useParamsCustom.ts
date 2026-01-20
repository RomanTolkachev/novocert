import { useSearchParams } from 'react-router-dom'
import qs from 'qs'
import { useCallback, useMemo } from 'react'

export type TParamsCustom<Q extends Record<string, any>> = [
    (query: Q, replace?: boolean) => void,
    () => Q
]

export function useParamsCustom<Q extends Record<string, any> = Record<string, any>>(): TParamsCustom<Q> {
    const [searchParams, setSearchParams] = useSearchParams()

    const setQuery = useCallback((query: Q, replace: boolean = false) => {
        setSearchParams(
            qs.stringify(query, {
                arrayFormat: 'brackets',
                skipNulls: true,
                filter: (_, value) => (value === '' ? undefined : value)
            }),
            { replace }
        )
    }, [setSearchParams])

    const getQuery = useCallback((): Q => {
        return qs.parse(searchParams.toString()) as Q
    }, [searchParams])

    return useMemo(() => [setQuery, getQuery] as TParamsCustom<Q>, [setQuery, getQuery])
}
