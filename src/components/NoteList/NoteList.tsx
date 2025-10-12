import { deleteNote } from '../../services/noteService'
import type { Note } from '../../types/note'
import css from './NoteList.module.css'

interface NoteListProps {
    data: Note[],
    setIsDeletedElement: (item: string | null) => void
}

export default function NoteList({ data, setIsDeletedElement }: NoteListProps) {
    
    function handleDelete(id: string) {
        deleteNote(id)
        setIsDeletedElement(id)
        setTimeout(() => setIsDeletedElement(null), 100)
    }

    return (
        <ul className={css.list}>
            {data.map(el => (
                <li key={el.id} className={css.listItem}>
                    <h2 className={css.title}>{el.title}</h2>
                    <p className={css.content}>{el.content}</p>
                    <div className={css.footer}>
                        <span className={css.tag}>{el.tag}</span>
                        <button onClick={() => handleDelete(el.id)} className={css.button}>Delete</button>
                    </div>
                </li>
            ))}
        </ul>
    )
}