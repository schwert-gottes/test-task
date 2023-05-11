import React from "react";
import { MdSearch } from "react-icons/md";
import type { SortOption } from "../views/notes/main";
interface SearchProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  sortOptions: SortOption[];
  onSelectChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const Search = ({
  onChange,
  value,
  sortOptions,
  onSelectChange,
}: SearchProps): JSX.Element => {
  return (
    <form className="rounded-lg p-1 mb-6">
      <div className="grid grid-cols-4">
        <div className="relative col-span-3">
          <input
            className="border-none bg-[#E9E9E9] focus:outline-none w-full px-10 py-2"
            value={value}
            onChange={onChange}
            type="text"
            placeholder="type to search..."
          />
          <MdSearch className="absolute top-2 left-2" size="1.3em" />
        </div>

        <select className="border border-blue-400" onChange={onSelectChange}>
          {sortOptions?.map((option: SortOption) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default Search;
