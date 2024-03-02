import { useState } from "react";
import styled from "styled-components";

function Calendar() {
  const [date, setDate] = useState(new Date());

  const goToPreviousMonth = () => {
    setDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1)
    );
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    ).getDay();
    const calendarDays = [];

    // 첫 번째 날 이전의 빈 칸 추가
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(
        <div key={`empty-${i}`} className="calendar-day empty-day"></div>
      );
    }

    // 각 날짜에 해당하는 칸 추가
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(
        <div key={i} className="calendar-day">
          {i}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <Container>
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={goToPreviousMonth}>이전 달</button>
          <h2>
            {date.toLocaleString("default", { month: "long", year: "numeric" })}
          </h2>
          <button onClick={goToNextMonth}>다음 달</button>
        </div>
        <div className="calendar-body">{renderCalendar()}</div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  border: 1px solid pink;

  .calendar {
    font-family: Arial, sans-serif;
  }

  .calendar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .calendar-header button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;
  }

  .calendar-header button:hover {
    background-color: #0056b3;
  }

  .calendar-header h2 {
    margin: 0;
  }

  .calendar-body {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
  }

  .calendar-day {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    border: 1px solid #ccc;
  }

  .empty-day {
    background-color: #f0f0f0;
    border: none;
    pointer-events: none; /* 빈 칸은 클릭 이벤트를 비활성화 */
  }
`;

export default Calendar;
