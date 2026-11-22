"use client";

import { useState } from "react";
import { reminders } from "../../data";
import { Car, Warning } from "@/app/(main)/type";
import Item from "./item";

interface sectionProps {
  title: string;
  titleColor: string;
//   items: Reminder[];
  selectedCar : Car;
  warnings: Warning[]; // Adjust the type as needed
}
const Section = ({ title, titleColor, selectedCar,warnings }: sectionProps) => {

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // const [itemsTab, setRemindersTab] = useState(warnings);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((title) => title !== value));
    }
  };
  // console.log(itemsTab)
  return (
    <div
      className={`flex-1 flex flex-col shadow-black shadow-md `}
    >
      <h2 className={`text-xl font-bold p-3 bg-${titleColor}`}>{title}</h2>

      <div className="w-full h-1/2 p-4 flex-1 overflow-y-auto space-y-6 px-2">
        {warnings.map((warning, index) => (
          warning.car?.id === selectedCar.id && (
          <Item key={warning.id} {...warning}  handleOptionChange={handleOptionChange} selectedOptions = {selectedOptions}/>
        )))}
      </div>
    </div>
  );
};

export default Section;
