interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder = "Rechercher..." }) => {
    return (
      <div className="max-sm:flex sm:flex-2 flex-col w-full ">
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="flex-col bg-white w-full h-10 rounded-sm px-4" 
          placeholder={placeholder}
        />
      </div>
  );
}

export default SearchInput;