interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder = "Rechercher..." }) => {
    return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="bg-white w-80 h-10 rounded-lg px-4"
      placeholder={placeholder}
    />
  );
}

export default SearchInput;