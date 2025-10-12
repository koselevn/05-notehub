import axios from "axios";
import type { FormValues } from "../types/note";

export async function fetchNotes(search: string, page: number) {
    const url = 'https://notehub-public.goit.study/api/notes'
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`
      },
      params: {
          search: search,
          page: page,
          perPage: 12
      }
    }

    const response = await axios.get(url, options)

    return response.data
}

export async function createNote(objet: FormValues) {
  const url = 'https://notehub-public.goit.study/api/notes'
  const options = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`
    },
  }

  const response = await axios.post(url, objet, options)

  return response
}

export async function deleteNote(id: string) {
  const url = `https://notehub-public.goit.study/api/notes/${id}`
  const options = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`
    },
  }

  const response = await axios.delete(url, options)

  return response
}