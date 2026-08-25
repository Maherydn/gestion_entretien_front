"use client";

import { useState } from "react";
import { reminders } from "../../data";
import { Reminder } from "../../type";
import { Car } from "@/app/(main)/type";
import ReminderItem from "../../_components/reminder/ReminderItem";
import Item from "./item";

interface sectionProps {
  title: string;
  titleColor: string;
//   items: Reminder[];
  selectedCar : Car;
}
const Section = ({ title, titleColor, selectedCar }: sectionProps) => {

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const [itemsTab, setRemindersTab] = useState(reminders);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((title) => title !== value));
    }
  };

  return (
    <div
      className={`flex-1 flex flex-col shadow-black shadow-md `}
    >
      <h2 className={`text-xl font-bold p-3 bg-${titleColor}`}>{title}</h2>

      <div className="w-full h-1/2 p-4 flex-1 overflow-y-auto space-y-6 px-2">
        {itemsTab.map((reminder, index) => (
          <Item key={index} {...reminder}  handleOptionChange={handleOptionChange} selectedOptions = {selectedOptions} reminderSelected= {reminder} selectedCar = {selectedCar}/>
        ))}
      </div>
    </div>
  );
};

export default Section;
