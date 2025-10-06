
type Option = { id: number; name: string };

interface SelectFieldProps {
  id: string;
  name: string;
  label?: string;
  value: string;
  options: Option[];
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  name,
  label,
  value,
  options,
  placeholder,
  onChange,
}) => {
  return (
    <div className="max-sm:flex sm:flex-2 flex-col w-full ">
      {label && (
        <label htmlFor={id} className="text-white">
          {label}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-sm px-3 py-2 focus:border-blue-500 w-full
                   focus:ring focus:ring-blue-200 focus:outline-none text-slate-700 bg-white"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.name}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
