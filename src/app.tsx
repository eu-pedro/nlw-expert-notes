import { useState } from 'react'
import LogoNlwExpert from './assets/logo-nlw-expert.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'

interface NoteProps {
  id: string
  date: Date
  content: string
}

export function App() {
  const [notes, setNotes] = useState<NoteProps>([
    {
      id: crypto.randomUUID(),
      date: new Date(),
      content: 'Hello World',
    },
  ])

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={LogoNlwExpert} alt="NLW Expert" />
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-3 auto-rows-[250px] gap-6">
        <NewNoteCard />

        <NoteCard
          note={{
            date: new Date(),
            content: 'Hello World',
          }}
        />
      </div>
    </div>
  )
}
