import { useSearchParams } from 'react-router-dom'
import qs from 'qs'
import { useCallback, useMemo } from 'react'

type QueryParams = Record<string, any>
export type TParamsCustom = [(query: QueryParams, replace?: boolean) => void, () => QueryParams]

export function useParamsCustom(): TParamsCustom {
    const [searchParams, setSearchParams] = useSearchParams()

    const setQuery = useCallback((query: Record<string, any>, replace: boolean = false) => {
        setSearchParams(
            qs.stringify(query, {
                arrayFormat: 'brackets',
                skipNulls: true,
                filter: (_, value) => (value === '' ? undefined : value)
            }),
            { replace }
        )
    }, [setSearchParams])

    const getQuery = useCallback(<T extends Record<string, unknown>>(): T => {
        return qs.parse(searchParams.toString()) as T
    }, [searchParams])

    return useMemo(() => [setQuery, getQuery] as TParamsCustom, [setQuery, getQuery])
}
