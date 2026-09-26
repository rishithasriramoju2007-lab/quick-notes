const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Notes file
const notesFile = path.join(__dirname, "notes.json");

// Read notes from JSON file
function readNotes() {
  const data = fs.readFileSync(notesFile, "utf-8");
  return JSON.parse(data);
}

// Save notes to JSON file
function saveNotes(notes) {
  fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2));
}

// GET - Get all notes
app.get("/api/notes", (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

// POST - Create a new note
app.post("/api/notes", (req, res) => {
  const notes = readNotes();

  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: "Title and content are required"
    });
  }

  const newNote = {
    id: Date.now(),
    title: title,
    content: content
  };

  notes.push(newNote);
  saveNotes(notes);

  res.status(201).json(newNote);
});

// DELETE - Delete a note
app.delete("/api/notes/:id", (req, res) => {
  const notes = readNotes();

  const id = Number(req.params.id);

  const updatedNotes = notes.filter((note) => note.id !== id);

  if (notes.length === updatedNotes.length) {
    return res.status(404).json({
      message: "Note not found"
    });
  }

  saveNotes(updatedNotes);

  res.json({
    message: "Note deleted successfully"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});