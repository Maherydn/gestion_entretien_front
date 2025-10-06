export interface Reminder {
  id: number;
  title: string;
  value: string;
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