import React, { useState } from "react";
import { Search, NoteList, UpdateNote } from "../../components";
import type { FormFields } from "../../components/add-note";

interface Note {
  id: number;
  text: string;
  title: string;
  date: string;
}

type Sort = "title" | "date";

interface SortOption {
  value: Sort;
  label: string;
}

const sortOptions: SortOption[] = [
  {
    label: "Last update (newest)",
    value: "date",
  },

  {
    label: "Title",
    value: "title",
  },
];

const applyFilters = (notes: Note[], query: string): Note[] =>
  notes.filter((note: any) => {
    let matches = true;

    if (query) {
      const properties: string[] = ["title"];
      let containsQuery = false;

      properties.forEach((property: string) => {
        if (note[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        matches = false;
      }
    }

    return matches;
  });

const sortNotes = (notes: Note[], sortBy: string): Note[] => {
  if (sortBy === "title") {
    notes.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();

      if (titleA < titleB) return 1;
      if (titleA > titleB) return -1;
      return 0;
    });
  } else {
    notes.sort((a, b) => {
      const dateA = new Date(a.date.split("/").reverse().join("/")) as any;
      const dateB = new Date(b.date.split("/").reverse().join("/")) as any;
      return dateA - dateB;
    });
  }

  return notes;
};

const App = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [searchText, setSearchText] = useState<string>("");
  const [noteId, setNoteId] = useState<number | boolean>();
  const [sort, setSort] = useState<string>(sortOptions[0].value);

  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      text: "This is my first note!",
      title: "This is my first note!",
      date: "15/04/2021",
    },
  ]);

  const addNote = (fields: FormFields) => {
    const date: Date = new Date();
    const newNote: Note = {
      id: notes?.length + 1,
      text: fields?.text,
      title: fields?.title,
      date: date.toLocaleDateString(),
    };
    const newNotes: Note[] = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id: number): void => {
    const newNotes: Note[] = notes?.filter((note: Note) => note.id !== id);
    setNotes(newNotes);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setSearchText(value);
  };

  const onUpdate = (fields: FormFields, id?: number): void => {
    const UpdatedNotes: Note[] = notes.map((note: Note) => {
      if (note.id === id) {
        return { ...note, title: fields.title, text: fields.text };
      }
      return note;
    });

    setNotes(UpdatedNotes);
  };
  const openModal = (): void => {
    setIsOpen(true);
  };
  const onModal = (id: number): void => {
    setNoteId(id);
    openModal();
  };

  const closeModal = (): void => {
    setIsOpen(false);
    setNoteId(false);
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const { value } = e.target;
    setSort(value);
  };
  const note = notes?.find((note: Note) => note.id === noteId) as Note;

  const filteredNotes: Note[] = applyFilters(notes, searchText);
  const sortedCustomers: Note[] = sortNotes(filteredNotes, sort);

  console.log(sortedCustomers);

  return (
    <React.Fragment>
      <Search
        onChange={onChange}
        value={searchText}
        sortOptions={sortOptions}
        onSelectChange={onSelectChange}
      />
      <NoteList
        notes={sortedCustomers}
        handleAddNote={addNote}
        handleDeleteNote={deleteNote}
        onModal={onModal}
      />
      {noteId && (
        <UpdateNote
          {...note}
          isOpen={isOpen}
          noteId={noteId}
          onUpdate={onUpdate}
          closeModal={closeModal}
        />
      )}
    </React.Fragment>
  );
};

export type { Note, SortOption };
export default App;
