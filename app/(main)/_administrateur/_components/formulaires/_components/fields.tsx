import { useRef, useState } from "react";
import { EyeIcon } from "../../../../_assets/icon";

// ===== Composants réutilisables =====

// --------- Input text -------------

interface FieldProps {
  label: string;
  name: string;
  value?: any;
  type?: string;
  required?: boolean;
  isPassword?: boolean;
  error?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

export const InputField = ({
  label,
  name,
  value,
  type = "text",
  required = false,
  error,
  onChange,
  isPassword,
}: FieldProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className="flex flex-col mb-1 relative">
      <label htmlFor={name} className="font-medium mb-3  opacity-50">
        {label}{" "}
      </label>
      <input
        id={name}
        name={name}
        type={showPassword ? "text" : type}
        value={value || ""}
        onChange={onChange}
        required={required}
        className={`border-b border-gray-300 rounded px-3 py-2 w-full focus:outline-none  focus:border-jaune focus:border-b ${error ? "border-red-500" : ""} ${name === "name" ? "uppercase " : ""}`}
      />
      {isPassword && (
        <button
          onClick={() => setShowPassword(!showPassword)}
          type="button"
          className="absolute right-3 top-[60%] text-slate-500"
        >
          {!showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>
          )}
        </button>
      )}
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};

// -------- Select input --------------

interface SelectFieldProps {
  label: string;
  name: string;
  value: any;
  options: { value: string | number; label: string; desc?: string }[];
  required?: boolean;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
export const SelectField = ({
  label,
  name,
  value,
  options,
  required = false,
  error,
  onChange,
}: SelectFieldProps) => (
  <div className="flex flex-col mb-1">
    <label htmlFor={name} className="font-medium mb-3 opacity-50">
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value || ""}
      onChange={onChange}
      required={required}
      className={`border-b border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-jaune focus:border-jaune ${error ? "border-red-500" : ""}`}
    >
      <option value="">Sélectionnez</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
  </div>
);

// ---------- Upload file ----------------

interface FileDropProps {
  label: string;
  name: string;
  files: File[];
  multiple?: boolean;
  onChange: (files: File[]) => void;
  accept?: string;
  error?: string;
}

const compressImage = (
  file: File,
  maxWidth = 400,
  maxHeight = 400,
): Promise<File> =>
  new Promise((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let { width, height } = img;
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(new File([blob], file.name, { type: file.type }));
        },
        file.type,
        0.7,
      );
    };
  });

const imageTypes = ["image/jpeg", "image/png", "image/webp"];

export const FileDropMultiple = ({
  label,
  name,
  files,
  multiple = false,
  onChange,
  accept,
  error,
}: FileDropProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!e.dataTransfer.files.length) return;
    handleFiles(Array.from(e.dataTransfer.files));
  };

  const handleFiles = async (selectedFiles: File[]) => {
    const processedFiles: File[] = [];
    for (const f of selectedFiles) {
      // let file = f;
      // if (imageTypes.includes(f.type)) file = await compressImage(f, 400, 400);
      processedFiles.push(f);
    }
    if (multiple) onChange([...files, ...processedFiles]);
    else onChange(processedFiles);
  };

  const handleClick = () => inputRef.current?.click();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(Array.from(e.target.files));
  };
  const removeFile = (index: number) => {
    const updated = [...files];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <div className="flex flex-col ">
      <label className="font-medium mb-3 opacity-50">{label}</label>
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`border border-dashed rounded px-3 py-6 w-full text-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 ${error ? "border-red-500" : ""}`}
      >
        <span>
          {files.length
            ? `${files.length} fichier(s) sélectionné(s)`
            : "Glissez & déposez ou cliquez"}
        </span>
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          className="hidden"
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {files.map((f, i) => (
          <div key={i} className="relative">
            {imageTypes.includes(f.type) ? (
              <img
                src={URL.createObjectURL(f)}
                alt={f.name}
                className="w-20 h-20 object-cover rounded-md"
              />
            ) : (
              <div className="w-20 h-20 border flex items-center justify-center rounded-md text-sm text-gray-700">
                {f.name}
              </div>
            )}
            <button
              type="button"
              onClick={() => removeFile(i)}
              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};
