"use client";

import NoteCard from "./NoteCard";

export default function NotesList({ notes }) {
  if (notes.length === 0) {
    return (
      <div className="empty">
        <p>No notes available.</p>
        <p>Create your first note above!</p>
      </div>
    );
  }

  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}