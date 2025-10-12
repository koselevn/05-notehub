import css from "./SearchBox.module.css"
import { useDebouncedCallback } from 'use-debounce';

interface SearchBoxProps {
    setSearchQuery: (item: string) => void,
    searchQuery: string
}

export default function SearchBox({setSearchQuery, searchQuery}: SearchBoxProps) {
    const updateSearchQuery = useDebouncedCallback(
         (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value), 500
    )

    return (
        <input onChange={updateSearchQuery} className={css.input} type="text" placeholder="Search notes" />
    )
}