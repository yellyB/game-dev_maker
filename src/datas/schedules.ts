import { Schedule, ScheduleCategory, ScheduleGroup } from "~/types";

const studySchedules: Schedule<"study">[] = [
  {
    key: 0,
    category: "study",
    name: "코딩 학원",
    money: -100000,
    codingSkillPoint: 10,
    socialSkillPoint: 10,
    stressPoint: 10,
    turtleNeckPoint: 10,
  },
  {
    key: 1,
    category: "study",
    name: "강의",
    money: -50000,
    codingSkillPoint: 7,
    socialSkillPoint: 1,
    stressPoint: 7,
    turtleNeckPoint: 7,
  },
  {
    key: 2,
    category: "study",
    name: "개발 서적",
    money: -30000,
    codingSkillPoint: 5,
    socialSkillPoint: 0,
    stressPoint: 3,
    turtleNeckPoint: 3,
  },
  {
    key: 3,
    category: "study",
    name: "스터디",
    money: -0,
    codingSkillPoint: 3,
    socialSkillPoint: 10,
    stressPoint: 0,
    turtleNeckPoint: 0,
  },
];

const workSchedules: Schedule<"work">[] = [
  {
    key: 4,
    category: "work",
    name: "치킨집 서빙",
    money: 100000,
    codingSkillPoint: 0,
    socialSkillPoint: 10,
    stressPoint: 10,
    turtleNeckPoint: 0,
  },
  {
    key: 5,
    category: "work",
    name: "코인 투자",
    money: 0, // todo: 0 말고 아직 결정되지 않은 데이터로 넣기
    codingSkillPoint: 1,
    socialSkillPoint: -5,
    stressPoint: 0,
    turtleNeckPoint: 0,
  },
];

const restSchedules: Schedule<"rest">[] = [
  {
    key: 6,
    category: "rest",
    name: "운동",
    money: -30000,
    codingSkillPoint: 0,
    socialSkillPoint: 3,
    stressPoint: -10,
    turtleNeckPoint: -10,
  },
  {
    key: 7,
    category: "rest",
    name: "게임",
    money: -0,
    codingSkillPoint: 1,
    socialSkillPoint: -3,
    stressPoint: -5,
    turtleNeckPoint: 0,
  },
];

export const schedules: ScheduleGroup<ScheduleCategory>[] = [
  { category: "study", categoryName: "학습", schedules: [...studySchedules] },
  { category: "work", categoryName: "알바", schedules: [...workSchedules] },
  { category: "rest", categoryName: "휴식", schedules: [...restSchedules] },
];
