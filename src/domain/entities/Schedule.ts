export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  description: string;
  artist?: string;
}

export interface Schedule {
  items: ScheduleItem[];
}
