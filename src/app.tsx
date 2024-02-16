import { ChangeEvent, useState } from 'react'
import LogoNlwExpert from './assets/logo-nlw-expert.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'

interface NoteProps {
  id: string
  date: Date
  content: string
}

export function App() {
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<NoteProps[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage)
    }
    return []
  })

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    const notesArray = [newNote, ...notes]

    setNotes([newNote, ...notes])

    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const query = e.target.value

    setSearch(query)
  }
  const filteredNotes =
    search !== ''
      ? notes.filter((n) =>
          n.content.toLowerCase().includes(search.toLowerCase()),
        )
      : notes

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={LogoNlwExpert} alt="NLW Expert" />
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none"
          onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-3 auto-rows-[250px] gap-6">
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  )
}
