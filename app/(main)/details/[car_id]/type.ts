export interface Reminder {
  id: number;
  title: string;
  value: string;
  selectedOptions? : string[];
  handleOptionChange? : (event: React.ChangeEvent<HTMLInputElement>)=>void;
  reminderSelected? : Reminder;
}

export interface MaintenanceValue {
  id: number;
  value: string;
}

export interface Maintenance {
  id: number;
  type: string;
  values: MaintenanceValue[];
}