"use client";

import { useRouter } from "next/navigation";

export default function NoteCard({ note }) {
  const router = useRouter();

  const deleteNote = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `https://quick-notes-hy2u.onrender.com/api/notes/${note.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Unable to delete the note.");
    }
  };

  return (
    <div className="note-card">
      <h2>{note.title}</h2>

      <p>{note.content}</p>

      <button onClick={deleteNote} className="delete-button">
        Delete
      </button>
    </div>
  );
}