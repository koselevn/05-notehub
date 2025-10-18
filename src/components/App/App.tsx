import css from './App.module.css';
import { useState } from 'react';
import { useQuery, keepPreviousData  } from '@tanstack/react-query';
import Pagination from '../Pagination/Pagination';
import NoteList from '../NoteList/NoteList';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import { fetchNotes } from '../../services/noteService';
import SearchBox from '../SearchBox/SearchBox';

export default function App() {
  const [page, setPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');


  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', page, searchQuery],
    queryFn: () => fetchNotes(searchQuery, page),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox setSearchQuery={setSearchQuery} />
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button onClick={() => setIsOpenModal(true)} className={css.button}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error!</p>}
      {isSuccess && <NoteList notes={data.notes} />}

      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <NoteForm onClose={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}
