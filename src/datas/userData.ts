import { Status } from "../types";

export const status: Status = {
  name: "김백수",
  money: 50000,
  codingSkillPoint: 0,
  socialSkillPoint: 0,
  stressPoint: 0,
  turtleNeckPoint: 0,
  maxPoint: 100,
};

// todo:  게임 실행에 관련된 데이터 저장하기. 일단은 n월 밖에 없음
function createProgressData(initialValue: number) {
  let month = initialValue;

  function getMonth() {
    return month;
  }

  function setMonth(newValue: number) {
    month = newValue;
  }

  function moveToNextMonth() {
    setMonth(getMonth() + 1);
  }

  return {
    getMonth,
    setMonth,
    moveToNextMonth,
  };
}

export const currentMonth = createProgressData(3);
