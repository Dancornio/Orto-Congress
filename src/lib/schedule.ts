import rawSchedule from "@/data/schedule.json";

export type ScheduleItem = {
  day: string;
  dateLabel: string;
  time: string;
  room: string;
  title: string;
  type: string;
  speakerSlug?: string;
};

export const schedule = rawSchedule as ScheduleItem[];

export const scheduleDays = Array.from(
  new Set(schedule.map((item) => item.day))
);

export const scheduleRooms = Array.from(
  new Set(schedule.map((item) => item.room))
);
