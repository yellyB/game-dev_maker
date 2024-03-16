import { useEffect, useState } from "react";
import styled from "styled-components";
import { SCHEDULE_EXECUTING_TIME } from "../datas/constantDatas";

interface Props {
  currSchedule: any;
}

const images = ["동작1.png", "동작2.png", "동작3.png"];

export default function ScheduleImages({ currSchedule }: Props) {
  const IMAGES_LEN = images.length;
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    if (imageIndex >= IMAGES_LEN) {
      setImageIndex(() => 0);
    }

    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) => prevIndex + 1);
    }, SCHEDULE_EXECUTING_TIME / IMAGES_LEN);

    return () => clearInterval(intervalId);
  }, [currSchedule]);

  return (
    <Container>
      <img
        src={`/images/${images[imageIndex]}`}
        alt={`Image ${imageIndex + 1}`}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 50%;
  height: 50%;
  border: 3px solid green;
`;
