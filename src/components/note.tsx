import { MdDeleteForever, MdEdit } from "react-icons/md";
import type { Note as NoteType } from "../views/notes/main";

interface NoteProps extends NoteType {
  handleDeleteNote: (id: number) => void;
  onModal: (id: number) => void;
}
const Note = ({
  id,
  text,
  title,
  date,
  handleDeleteNote,
  onModal,
}: NoteProps): JSX.Element => {
  return (
    <div className="bg-[#fef68a] rounded-lg p-4 min-h-[170px] flex flex-col justify-between whitespace-pre-wrap">
      <div>
        <h4 className="font-bold mb-2">{title}</h4>
        <span>{text}</span>
      </div>

      <div className="flex items-center justify-between">
        <small>{date}</small>
        <div className="flex items-center gap-2">
          <MdDeleteForever
            onClick={() => handleDeleteNote(id)}
            className="cursor-pointer"
            size="1.3em"
          />
          <MdEdit
            onClick={() => onModal(id)}
            className="cursor-pointer"
            size="1.3em"
          />
        </div>
      </div>
    </div>
  );
};

export default Note;
