import { State } from "../types";

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
