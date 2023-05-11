import Note from "./note";
import AddNote from "./add-note";
import type { Note as NoteType } from "../views/notes/main";
import type { FormFields } from "./add-note";

interface ListProps {
  notes?: NoteType[];
  handleAddNote: (fields: FormFields) => void;
  handleDeleteNote: (id: number) => void;
  onModal: (id: number) => void;
}

const NotesList = ({
  notes,
  handleAddNote,
  handleDeleteNote,
  onModal,
}: ListProps) => {
  return (
    <div className="grid gap-4 grid-cols-4">
      {notes?.map((note: NoteType) => (
        <Note
          key={note.id}
          {...note}
          handleDeleteNote={handleDeleteNote}
          onModal={onModal}
        />
      ))}
      <AddNote handleAddNote={handleAddNote} />
    </div>
  );
};

export default NotesList;
