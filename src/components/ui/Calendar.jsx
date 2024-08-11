import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import PropTypes from "prop-types";
import { media } from "../../media";

const CalendarContainer = styled.div`
  position: relative;
  font-family: "Pretendard Variable";
  font-weight: 500;
`;

const DropdownButton = styled.button`
  width: 266.76px;
  height: 40px;
  border: 0.8px solid var(--festie-gray-600, #949494);
  border-radius: 4px;
  padding: 5.95px 10px;
  color: #000000;
  font-family: "Pretendard Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  text-align: start;
  appearance: none;
  background-color: white;
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px;
  ${media.mobile`
    width : 230px;
    `}
`;

const CalendarWrapper = styled.div`
  z-index: 100;
  position: absolute;
  top: 0%;
  right: 0; /* 버튼 왼쪽에 달력 위치 설정 */
  //transform: translateX(-80%); /* 달력 너비에 맞게 조정 */
  transform: translateY(30%);
  display: ${(props) => (props.isOpen ? "block" : "none")};

  /* 전체 달력 배경색 */
  .react-calendar {
    background: #b7e6e2 !important; /* 연한 청록색 배경색 */
    border: 0px solid #ddd; /* 테두리 없음 */
    border-radius: 4px; /* 둥근 모서리 */
    width: 300px; /* 달력 너비 설정 */
    font-size: 13.4px; /* 달력 폰트 크기 설정 */
    font-weight: 500;
  }

  /* 달력 헤더 스타일 */
  .react-calendar__navigation {
    margin-bottom: 10px; /* 헤더와 날짜 사이의 간격 설정 */
  }

  .react-calendar__navigation button {
    font-size: 16px; /* 네비게이션 버튼 폰트 크기 설정 */
  }

  /* 선택된 날짜 배경색 및 원형 모양 */
  .react-calendar__tile--active,
  .react-calendar__tile--hasActive {
    background: #256b66; /* 진한 초록색 배경색 */
    color: white; /* 흰색 텍스트 */
  }

  /* 날짜 범위 배경색 */
  .react-calendar__tile--range {
    background: #ffffff; /* 선택된 날짜 사이의 하얀색 배경색 */
    color: black; /* 검정색 텍스트 */
  }

  /* 범위의 시작일 배경색 및 테두리 */
  .react-calendar__tile--rangeStart {
    background: #256b66; /* 범위 시작일의 진한 초록색 배경색 */
    color: white; /* 흰색 텍스트 */
    border-top-left-radius: 50%; /* 왼쪽 위 모서리 둥글게 */
    border-bottom-left-radius: 50%; /* 왼쪽 아래 모서리 둥글게 */
  }

  /* 범위의 종료일 배경색 및 테두리 */
  .react-calendar__tile--rangeEnd {
    background: #256b66; /* 범위 종료일의 진한 초록색 배경색 */
    color: white; /* 흰색 텍스트 */
    border-top-right-radius: 50%; /* 오른쪽 위 모서리 둥글게 */
    border-bottom-right-radius: 50%; /* 오른쪽 아래 모서리 둥글게 */
  }

  /* 날짜 범위 표시 스타일 */
  .selected-range {
    flex-grow: 1; /* 버튼 그룹이 가능한 모든 공간을 차지하도록 설정 */
    display: flex;
    justify-content: space-between;
    padding: 10px;
    color: ${(props) =>
      props.range[0] && props.range[1] ? "#1D1B20" : "#888"}; /* 텍스트 색상 */
    background-color: ${(props) =>
      props.range[0] && props.range[1] ? "#ffffff" : "#f0f0f0"}; /* 배경색 */
    border: 1px solid #ddd; /* 경계선 */
    border-radius: 4px; /* 둥근 모서리 */
    margin-bottom: 10px; /* 날짜 범위와 달력 사이의 간격 */
  }

  /* 버튼 영역 스타일 */
  .button-container {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-top: 1px solid #ffffff; /* 상단 경계선 */
    background: #b7e6e2; /* 달력과 동일한 배경색 */
  }

  /* 버튼 그룹 스타일 */
  .button-group {
    display: flex;
    justify-content: flex-end; /* 오른쪽 끝에 배치 */
    flex-grow: 1; /* 버튼 그룹이 가능한 모든 공간을 차지하도록 설정 */
  }

  /* 버튼 스타일 */
  .calendar-button {
    background-color: transparent; /* 투명한 배경색 */
    color: #15181e; /* 버튼 텍스트 색상 */
    padding: 8px 12px;
    font-size: 12px;
    cursor: pointer;
    border: none; /* 테두리 제거 */
  }

  .calendar-button.reset {
    margin-right: auto; /* 왼쪽 끝에 배치 */
  }

  .calendar-button.cancel,
  .calendar-button.confirm {
    margin-left: 16px; /* 버튼들 사이의 여백 설정 */
  }
`;

const CustomCalendar = ({ onChange, value }) => {
  const [range, setRange] = useState(value);
  const [tempRange, setTempRange] = useState(value); // 추가된 상태
  const [isOpen, setIsOpen] = useState(false);

  const today = new Date(); // 오늘 날짜
  const maxDate = today; // 최대 날짜 설정

  const handleToggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  const handleDateChange = (dates) => {
    if (Array.isArray(dates) && dates.length === 2) {
      const [start, end] = dates;
      if (start <= maxDate && end <= maxDate) {
        setTempRange(dates); // 날짜가 유효한 경우 임시 범위 상태 업데이트
      }
    }
  };

  const handleReset = () => {
    const threeMonthsAgo = moment().subtract(3, "months").toDate(); // 3개월 전 날짜
    setTempRange([threeMonthsAgo, today]); // 임시 범위 상태에 3개월 전 날짜와 오늘 날짜를 설정
  };

  const handleCancel = () => {
    setTempRange(range); // 원래 범위로 되돌리기
    setIsOpen(false);
  };

  const handleConfirm = () => {
    setRange(tempRange); // 임시 범위를 최종 범위로 설정
    if (typeof onChange === "function") {
      onChange(tempRange);
    }
    setIsOpen(false);
  };

  const formatRange = (range) => {
    if (range[0] && range[1]) {
      return `📅   ${moment(range[0]).format("YYYY.MM.DD")} - ${moment(
        range[1]
      ).format("YYYY.MM.DD")}   `;
    }
    return "날짜를 선택해주세요";
  };

  const formatTempRange = (range) => {
    if (range[0] && range[1]) {
      return `선택한 날짜: ${moment(range[0]).format("YYYY.MM.DD")} - ${moment(
        range[1]
      ).format("YYYY.MM.DD")}`;
    }
    return "날짜를 선택해주세요";
  };

  return (
    <CalendarContainer>
      <DropdownButton onClick={handleToggleCalendar}>
        {formatRange(range)}
      </DropdownButton>
      <CalendarWrapper isOpen={isOpen} range={tempRange}>
        <div className="selected-range">{formatTempRange(tempRange)}</div>
        <Calendar
          onChange={handleDateChange}
          formatDay={(locale, date) => moment(date).format("DD")}
          value={tempRange} // 임시 범위 상태 사용
          selectRange
          minDate={new Date(0)} // 최소 날짜 제한을 현재 날짜로 설정
          maxDate={maxDate} // 최대 날짜 제한을 오늘 날짜로 설정
        />
        <div className="button-container">
          <button className="calendar-button reset" onClick={handleReset}>
            초기화
          </button>
          <div className="button-group">
            <button className="calendar-button cancel" onClick={handleCancel}>
              취소
            </button>
            <button className="calendar-button confirm" onClick={handleConfirm}>
              확인
            </button>
          </div>
        </div>
      </CalendarWrapper>
    </CalendarContainer>
  );
};

CustomCalendar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
};

export default CustomCalendar;
