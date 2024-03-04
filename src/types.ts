export type ScheduleCategory = "study" | "work" | "rest";

export interface Schedule<T extends ScheduleCategory> {
  index: number;
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
