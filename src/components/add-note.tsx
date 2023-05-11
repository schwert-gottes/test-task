import { useState } from "react";

type FormFields = {
  title: string;
  text: string;
};

interface AddNoteProps {
  handleAddNote: (fields: FormFields) => void;
}

const AddNote = ({ handleAddNote }: AddNoteProps): JSX.Element => {
  const [fields, setFields] = useState<FormFields>({
    title: "",
    text: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    const { value, name } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleAddNote(fields);
    setFields({
      title: "",
      text: "",
    });
  };

  return (
    <form onSubmit={onSubmit} className="bg-[#67d7cc] flex flex-col">
      <input
        value={fields.title}
        type="text"
        name="title"
        onChange={handleChange}
        required
        placeholder="Type title here"
        className="border-blue-300 border-2 placeholder:text-black"
      />
      <textarea
        rows={8}
        name="text"
        cols={10}
        placeholder="Type to add a note..."
        value={fields.text}
        onChange={handleChange}
        className="border-none resize-none bg-[#67d7cc] focus:outline-none placeholder:text-black"
        required
      ></textarea>
      <div className="note-footer">
        <button
          type="submit"
          className="bg-[#e1e1e1] border-none w-full  px-3 py-2 hover:bg-[#ededed] cursor-pointer"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export type { FormFields };

export default AddNote;
