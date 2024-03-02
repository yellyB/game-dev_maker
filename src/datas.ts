import { Schedule, ScheduleCategory } from "./types";

const studySchedules: Schedule<"study">[] = [
  {
    index: 0,
    category: "study",
    name: "코딩학원",
    price: 100000,
    codingSkillScore: 10,
    socialSkillsScore: 10,
    stressScore: 10,
    turtleNeckScore: 10,
  },
  {
    index: 1,
    category: "study",
    name: "강의",
    price: 50000,
    codingSkillScore: 7,
    socialSkillsScore: 1,
    stressScore: 7,
    turtleNeckScore: 7,
  },
  {
    index: 2,
    category: "study",
    name: "개발서적",
    price: 30000,
    codingSkillScore: 5,
    socialSkillsScore: 0,
    stressScore: 3,
    turtleNeckScore: 3,
  },
  {
    index: 3,
    category: "study",
    name: "스터디",
    price: 0,
    codingSkillScore: 3,
    socialSkillsScore: 10,
    stressScore: 0,
    turtleNeckScore: 0,
  },
];

const workSchedules: Schedule<"work">[] = [
  {
    index: 4,
    category: "work",
    name: "치킨집 서빙",
    income: 100000,
    codingSkillScore: 0,
    socialSkillsScore: 10,
    stressScore: 10,
    turtleNeckScore: 0,
  },
  {
    index: 5,
    category: "work",
    name: "코인투자",
    income: Math.floor(Math.random() * 600000) - 300000, // todo: 우선 여기에 정의해뒀는데, 실제로는 실행할때마다 다시 랜덤하게 가져와야함
    codingSkillScore: 1,
    socialSkillsScore: -5,
    stressScore: 0,
    turtleNeckScore: 0,
  },
];

const restSchedules: Schedule<"rest">[] = [
  {
    index: 6,
    category: "rest",
    name: "운동",
    price: 30000,
    codingSkillScore: 0,
    socialSkillsScore: 3,
    stressScore: -10,
    turtleNeckScore: -10,
  },
  {
    index: 7,
    category: "rest",
    name: "게임(젤리의 전설: 야생마의 숨결)",
    price: 0,
    codingSkillScore: 1,
    socialSkillsScore: -3,
    stressScore: -5,
    turtleNeckScore: 0,
  },
];

export const schedules: Schedule<ScheduleCategory>[] = [
  ...studySchedules,
  ...workSchedules,
  ...restSchedules,
];
