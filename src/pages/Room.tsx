import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { PointOfUserState } from "types";
import { END_MONTH } from "datas/constantDatas";
import { colors } from "datas/colors";

import Overlay from "../components/Overlay";
import ScheduleExecutionProgress from "../components/ScheduleExecutionProgress";
import GameState from "../components/GameState";
import ScheduleTable from "../components/ScheduleTable";
import { useSchedulesContext } from "../context/schedules.context";
import { useGameContext } from "../context/game.context";
import { useEndingType } from "../hooks/useEndingType";
import Dialog from "../components/Dialog";
import Button from "../components/Button";
import { comma } from "../common/utils";

export default function Room() {
  const { gameState, updateGameState, month, moveToNextMonth } =
    useGameContext();
  const { clear } = useSchedulesContext();
  const [ending, isTurtleEnding] = useEndingType();

  const bgmRef = useRef<HTMLAudioElement>(null);
  const effectRef = useRef<HTMLAudioElement>(null);

  const [isBgmPlaying, setIsBgmPlaying] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isScheduleExcuting, setIsScheduleExcuting] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [updatedValueOfCurrInterval, setUpdatedValueOfCurrInterval] =
    useState<PointOfUserState>({});

  const handleExecute = () => {
    setShowOverlay(false);
    setIsScheduleExcuting(true);
  };

  const handleOnEnd = (updatedValueOfCurrInterval: PointOfUserState) => {
    const effectSound = effectRef.current;

    setIsScheduleExcuting(false);
    setUpdatedValueOfCurrInterval(updatedValueOfCurrInterval);

    // todo: 거북이 엔딩은 실행 도중에도 볼 수 있는 엔딩으로 수정
    if (isTurtleEnding) {
      updateGameState("end");
      effectSound?.play();

      return;
    }

    clear();
    setIsDialogOpen(true);
  };

  const handleDialogOnConfirm = () => {
    const effectSound = effectRef.current;

    moveToNextMonth();

    if (month === END_MONTH) {
      setTimeout(() => {
        updateGameState("end");
        effectSound?.play();
      }, 1000);
    }
  };

  useEffect(() => {
    const bgm = bgmRef.current;

    setTimeout(() => {
      if (!bgm) return;

      bgm.loop = true;
      bgm.volume = 0.3;

      if (isBgmPlaying) bgm.play();
      else bgm.pause();
    }, 1000);
  }, [isBgmPlaying]);

  return (
    <>
      <Container>
        {isScheduleExcuting && (
          <ScheduleExecutionProgressWrapper>
            <ScheduleExecutionProgress onEnd={handleOnEnd} />
          </ScheduleExecutionProgressWrapper>
        )}

        <Month>현재 날짜: {month}월 (종료: 9월)</Month>

        <Content>
          <GameState />
          <ButtonContainer>
            <Button
              color={colors.navy}
              onClick={() => {
                setShowOverlay(true);
              }}
              disabled={isScheduleExcuting}
              size="large"
            >
              스케줄 짜기
            </Button>
          </ButtonContainer>
        </Content>
      </Container>

      <Overlay
        isShow={showOverlay}
        onClose={() => {
          clear();
          setShowOverlay(false);
        }}
      >
        <ScheduleTable onExecute={handleExecute} />
      </Overlay>
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="이번달 실행 결과"
        onConfirm={handleDialogOnConfirm}
      >
        <ResultTable>
          {/* todo: 금액은 따로 저장해서 보여줘야함. (다른 수치는 마이너스 허용 안하게 했는데 금액도 거기 끼어있기때문) */}
          {!!updatedValueOfCurrInterval.money && (
            <Row>금액: {comma(updatedValueOfCurrInterval.money)}</Row>
          )}
          {!!updatedValueOfCurrInterval.codingSkillPoint && (
            <Row>개발력: +{updatedValueOfCurrInterval.codingSkillPoint}</Row>
          )}
          {!!updatedValueOfCurrInterval.socialSkillPoint && (
            <Row>사회성: +{updatedValueOfCurrInterval.socialSkillPoint}</Row>
          )}
          {!!updatedValueOfCurrInterval.stressPoint && (
            <Row>스트레스: +{updatedValueOfCurrInterval.stressPoint}</Row>
          )}
        </ResultTable>
      </Dialog>

      <IconContainer onClick={() => setIsBgmPlaying(!isBgmPlaying)}>
        {isBgmPlaying ? (
          <AudioIcon src={"/game-dev_maker/images/icon_audio.png"} />
        ) : (
          <MuteIcon src={"/game-dev_maker/images/icon_mute.png"} />
        )}
      </IconContainer>

      <audio ref={bgmRef} src={"/game-dev_maker/sound/bgm.mp3"} autoPlay />
      <audio
        ref={effectRef}
        src={"/game-dev_maker/sound/effect_end.wav"}
      ></audio>
    </>
  );
}

const IconContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 4px;
  img {
    width: 34px;
  }
`;

const AudioIcon = styled.img``;
const MuteIcon = styled.img``;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  background-image: url("${process.env.NODE_ENV === "development"
    ? ""
    : "https://yellyb.github.io"}/game-dev_maker/images/home.png");
  background-size: cover;
  background-position: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 8px;

  button {
    width: 100%;
  }
`;

const Month = styled.div`
  float: right;
  margin: 20px;
  font-size: 28px;
`;

const ButtonContainer = styled.div`
  margin: 12px 0;
`;

const ResultTable = styled.div``;

const Row = styled.div``;

const ScheduleExecutionProgressWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;
