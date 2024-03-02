export type ScheduleCategory = "study" | "work" | "rest";

export interface Schedule<T extends ScheduleCategory> {
  index: number;
  category: T;
  name: string;
  price?: T extends "study" | "rest" ? number : never;
  income?: T extends "work" ? number : never;
  codingSkillScore: number;
  socialSkillsScore: number;
  stressScore: number;
  turtleNeckScore: number;
}
