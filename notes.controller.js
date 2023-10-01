const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await saveNotes(notes);
  console.log(chalk.bgGreen("Note was added!"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.yellow("Here the list of notes"));
  notes.forEach((note) => {
    console.log(chalk.blue(note.id, note.title));
  });
}

async function removeNote(id) {
  const notes = await getNotes();

  const filteredNotes = notes.filter((note) => note.id !== id);

  await saveNotes(filteredNotes);
  console.log(chalk.red(`Note with id="${id}" has been removed.`));
}

async function editNote(id, newTitle) {
  const notes = await getNotes();

  const note = notes.find((note) => note.id === id);

  if (note) {
    note.title = newTitle;
    await saveNotes(notes);
    console.log(chalk.green(`Note with id="${id}" has been updated`));
  } else {
    console.log(chalk.red(`Note with id="${id}" not found`));
  }
}

module.exports = {
  addNote,
  getNotes,
  removeNote,
  editNote,
};
