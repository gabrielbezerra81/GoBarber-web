import React, { useState, useCallback, useEffect, useMemo } from "react";
import moment from "moment";
import DayPicker, { DayModifiers } from "react-day-picker";
import "react-day-picker/lib/style.css";

import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  NextAppointment,
  Section,
  Appointment,
  CalendarNavBar,
} from "./styles";

import logoImg from "../../assets/logo.svg";
import unknownUserImage from "../../assets/undefinedProfilePicture.png";

import { FiPower, FiClock } from "react-icons/fi";
import { useAuth } from "../../context/authContext";

import "moment/locale/pt-br";
import api from "../../services/api";

interface MonthAvailability {
  day: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  formattedHour: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(() => {
    let date = moment(new Date());

    while (date.day() < 1 || date.day() > 5) {
      date.add(1, "day");
    }

    return date.toDate();
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [shouldColorDayLetter, setShouldColorDayLetter] = useState(
    !!selectedDate
  );

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailability[]
  >([]);

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const { signOut, user } = useAuth();

  const handleDaySelection = useCallback(
    (day: Date, { selected, disabled }: DayModifiers) => {
      if (disabled) return;

      if (selected) {
        setSelectedDate(undefined);
        setShouldColorDayLetter(false);
        return;
      }

      setShouldColorDayLetter(true);
      setSelectedDate(day);
    },
    []
  );

  const handleMonthChange = useCallback(
    (date: Date) => {
      setCurrentMonth(date);
      setShouldColorDayLetter(date.getMonth() === selectedDate?.getMonth());
    },
    [selectedDate]
  );

  useEffect(() => {
    const month = currentMonth.getMonth() + 1;
    const year = currentMonth.getFullYear();

    api
      .get<MonthAvailability[]>(`providers/${user.id}/month-availability`, {
        params: {
          month,
          year,
        },
      })
      .then((response) => {
        setMonthAvailability(response.data);
      })
      .catch(console.log);
  }, [currentMonth, user.id]);

  useEffect(() => {
    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;
      const day = selectedDate.getDate();

      api
        .get<Appointment[]>("appointments/me", {
          params: {
            year,
            month,
            day,
          },
        })
        .then((response) => {
          const formattedAppointments = response.data.map((appointment) => {
            return {
              ...appointment,
              formattedHour: moment(appointment.date).format("HH:mm"),
            };
          });

          formattedAppointments.sort((a, b) => {
            if (a.formattedHour < b.formattedHour) return -1;
            if (a.formattedHour > b.formattedHour) return 1;
            return 0;
          });

          setAppointments(formattedAppointments);
        })
        .catch(console.log);
    }
  }, [selectedDate]);

  const disabledDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const dates = monthAvailability
      .filter((monthDay) => monthDay.available === false)
      .map((monthDay) => {
        const date = new Date(year, month, monthDay.day);

        return date;
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  const selectedDateAsText = useMemo(() => {
    return moment(selectedDate).format("[Dia] DD [de] MMMM");
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    const day = moment(selectedDate).format("dddd");
    return day.charAt(0).toUpperCase() + day.slice(1);
  }, [selectedDate]);

  const isToday = useMemo(() => {
    return moment(selectedDate).isSame(new Date(), "day");
  }, [selectedDate]);

  const morningAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      return moment(appointment.date).hours() < 12;
    });
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      return moment(appointment.date).hours() >= 12;
    });
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments.find((appointment) =>
      moment(appointment.date).isAfter(new Date())
    );
  }, [appointments]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url || unknownUserImage} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>

          <p>
            {isToday && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          {isToday && nextAppointment && (
            <NextAppointment>
              <strong>Agendamento a seguir</strong>
              <div>
                <img
                  src={nextAppointment.user.avatar_url || unknownUserImage}
                  alt={nextAppointment.user.name}
                />
                <strong>{nextAppointment.user.name}</strong>

                <span>
                  <FiClock /> {nextAppointment.formattedHour}
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>Manhã</strong>

            {morningAppointments.length === 0 && (
              <p>Nenhum agendamento neste período</p>
            )}

            {morningAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock /> {appointment.formattedHour}
                </span>
                <div>
                  <img
                    src={appointment.user.avatar_url || unknownUserImage}
                    alt={appointment.user.name}
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>

          <Section>
            <strong>Tarde</strong>

            {afternoonAppointments.length === 0 && (
              <p>Nenhum agendamento neste período</p>
            )}

            {afternoonAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock /> {appointment.formattedHour}
                </span>
                <div>
                  <img
                    src={appointment.user.avatar_url || unknownUserImage}
                    alt={appointment.user.name}
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>
        <Calendar
          selectedDate={selectedDate}
          shouldColorDayLetter={shouldColorDayLetter}
        >
          <DayPicker
            showWeekDays
            weekdaysShort={days}
            months={months}
            fromMonth={new Date()}
            selectedDays={selectedDate}
            modifiers={{
              today: undefined,
            }}
            disabledDays={[
              { daysOfWeek: [0, 6] },
              { before: new Date() },
              ...disabledDays,
            ]}
            onDayClick={handleDaySelection}
            enableOutsideDaysClick={false}
            navbarElement={({
              onNextClick,
              onPreviousClick,
              showPreviousButton,
            }) => (
              <CalendarNavBar>
                {showPreviousButton ? (
                  <button
                    onClick={() => {
                      onPreviousClick();
                    }}
                  >
                    <BsArrowLeftShort size={26} />
                  </button>
                ) : (
                  <div />
                )}

                <button
                  onClick={() => {
                    onNextClick();
                  }}
                >
                  <BsArrowRightShort size={26} />
                </button>
              </CalendarNavBar>
            )}
            onMonthChange={handleMonthChange}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;

const days = moment.weekdaysShort().map((day) => day.charAt(0).toUpperCase());

const months = moment
  .months()
  .map((month) => month.charAt(0).toUpperCase() + month.slice(1));
