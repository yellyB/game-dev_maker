import { START_MONTH } from "./staticData";

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
    initialValue,
    getMonth,
    moveToNextMonth,
  };
}

export const currentMonth = createProgressData(START_MONTH);
