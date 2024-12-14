import { Dispatch, SetStateAction } from "react";

interface SearchInterface {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  type: string;
  placeholder: string;
  label: string;
  className?: string;
}

const Search: React.FC<SearchInterface> = ({
  search,
  setSearch,
  type,
  placeholder,
  label,
  className,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="ml-2 text-blue-400">{label}</p>
      <input
        type={type}
        placeholder={placeholder}
        className={className}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
