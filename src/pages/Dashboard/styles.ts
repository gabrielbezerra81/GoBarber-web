import styled, { css } from "styled-components";
import { shade } from "polished";

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: none;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    strong {
      color: #ff9000;
      font-weight: 500;
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #ff9000;
    display: flex;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: "";
      width: 1px;
      height: 12px;
      background: #ff9000;
      margin: 0 8px;
    }
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  > strong {
    color: #999591;
    font-size: 20px;
    font-weight: 400;
  }

  div {
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      height: 80%;
      width: 2px;
      left: 0px;
      background: #ff9000;
      border-radius: 10px;
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #fff;
      font-weight: 500;
      font-size: 24px;
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #999591;

      svg {
        color: #ff9000;
        margin-right: 8px;
      }
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  > p {
    color: #999591;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #f4ede8;
    width: 70px;

    svg {
      color: #ff9000;
      margin-right: 8px;
    }
  }

  div {
    display: flex;
    align-items: center;
    background: #3e3b47;
    border-radius: 10px;
    padding: 16px 24px;
    position: relative;
    margin-left: 24px;
    flex: 1;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #fff;
      font-size: 20px;
    }
  }
`;

interface CalendarProps {
  selectedDate: Date | undefined;
  shouldColorDayLetter: boolean;
}

export const Calendar = styled.aside<CalendarProps>`
  width: 380px;

  .DayPicker {
    background: #28262e;
    border-radius: 10px;
    width: 100%;
  }

  .DayPicker-wrapper {
    padding-bottom: 16px;
  }

  .DayPicker-Caption {
    color: #f4ede8;
    background: #3e3b47;
    height: 50px;
    border-radius: 10px 10px 0 0;
    padding: 13px 16px;
    text-align: center;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    width: 100%;
    margin: 0;
    padding: 0 16px 0 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
    transition: background-color 0.2s;
  }

  .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, "#3e3b47")} !important;
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360;
    background: transparent;
  }

  .DayPicker-Day--outside {
    background: transparent;
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--outside) {
    background: #ff9000 !important;
    color: #232129 !important;
  }

  .DayPicker-Weekday {
    color: #666360;
    font-size: 16px;
  }

  ${({ selectedDate, shouldColorDayLetter }) => {
    if (!selectedDate || !shouldColorDayLetter) return css``;

    const day = selectedDate.getDay() + 1;

    return css`
      .DayPicker-WeekdaysRow > div:nth-child(${day}) {
        color: #ff9000;
      }
    `;
  }}
`;

export const CalendarNavBar = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;

  button {
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      color: #999591;
      transition: color 0.2s;
    }

    svg:hover {
      color: ${shade(0.2, "#999591")};
    }
  }
`;
