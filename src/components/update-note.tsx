import type { Note } from "../views/notes/main";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

type FormFields = {
  title: string;
  text: string;
};

interface AddNoteProps extends Note {
  onUpdate: (fields: FormFields, id: number) => void;
  closeModal: () => void;
  isOpen: boolean;
  noteId: number | boolean;
}

const UpdateNote = ({
  onUpdate,
  id,
  title,
  text,
  closeModal,
  isOpen,
}: AddNoteProps): JSX.Element => {
  const [fields, setFields] = useState<FormFields>({
    title: title ?? "",
    text: text ?? "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    const { value, name } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onUpdate(fields, id);
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Update Note
                </Dialog.Title>
                <div className="mt-2">
                  <form
                    onSubmit={onSubmit}
                    className="bg-[#67d7cc] flex flex-col"
                  >
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
                        update
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export type { FormFields };

export default UpdateNote;
