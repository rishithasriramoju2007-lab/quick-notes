import CreateNoteForm from "./components/CreateNoteForm";
import NotesList from "./components/NotesList";

async function getNotes() {
  const response = await fetch("https://quick-notes-hy2u.onrender.com/api/notes", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }

  return response.json();
}

export default async function Home() {
  const notes = await getNotes();

  return (
    <main className="container">
      <h1>Quick Notes</h1>

      <p className="subtitle">
        Create, view, and delete your notes.
      </p>

      <CreateNoteForm />

      <h2 className="notes-heading">My Notes</h2>

      <NotesList notes={notes} />
    </main>
  );
}