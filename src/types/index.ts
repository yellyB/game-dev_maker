export type ScheduleCategory = "study" | "work" | "rest";
export type ScheduleCategoryName = "학습" | "알바" | "휴식";

export interface Schedule<T extends ScheduleCategory = ScheduleCategory> {
  key: number;
  category: T;
  name: string;
  money: number;
  codingSkillPoint: number;
  socialSkillPoint: number;
  stressPoint: number;
  turtleNeckPoint: number;
}

export interface UserState {
  name: string;
  money: number;
  codingSkillPoint: number;
  socialSkillPoint: number;
  stressPoint: number;
  turtleNeckPoint: number;
}

export interface ScheduleGroup<T extends ScheduleCategory> {
  category: T;
  categoryName: ScheduleCategoryName;
  schedules: Schedule<T>[];
}

export interface SelectedSchedule extends Schedule {
  index: number;
}

export type GameState = "init_setting" | "playing" | "end";

export type PointOfUserState = Partial<UserState>;
