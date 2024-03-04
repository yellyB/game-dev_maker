export type ScheduleCategory = "study" | "work" | "rest";
export type ScheduleCategoryName = "학습" | "알바" | "휴식";

export interface Schedule<T extends ScheduleCategory = ScheduleCategory> {
  key: number;
  category: T;
  name: string;
  price?: T extends "study" | "rest" ? number : never;
  income?: T extends "work" ? number : never;
  codingSkillPoint: number;
  socialSkillPoint: number;
  stressPoint: number;
  turtleNeckPoint: number;
}

export interface Status {
  name: string;
  money: number;
  codingSkillPoint: number;
  socialSkillPoint: number;
  stressPoint: number;
  turtleNeckPoint: number;
  maxPoint: number;
}

export interface ScheduleGroup<T extends ScheduleCategory> {
  category: T;
  categoryName: ScheduleCategoryName;
  schedules: Schedule<T>[];
}
