"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateNoteForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please enter both title and content.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://quick-notes-hy2u.onrender.com/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create note");
      }

      setTitle("");
      setContent("");

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Unable to create the note.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <input
        type="text"
        placeholder="Note title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(event) => setContent(event.target.value)}
        rows="5"
      />

      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Note"}
      </button>
    </form>
  );
}