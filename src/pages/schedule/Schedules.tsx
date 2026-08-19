import ArrowLeftIcon from '@/components/icons/ArrowLeft';
import ArrowRightIcon from '@/components/icons/ArrowRight';
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  startOfMonth,
  subDays,
  subMonths,
} from 'date-fns';
import { useState } from 'react';
import { getSafeDate } from '@/helpers/date';
import SchedulesComp from '@/components/Schedules';

const getDaysOfTheMonth = (date: Date): Date[] => {
  const firstDay = startOfMonth(date);

  const calendarStart = subDays(firstDay, firstDay.getDay());

  const calendarEnd = addDays(calendarStart, 41);

  return eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });
};

type SchedulesView = 'DAILY' | 'WEEKLY' | 'MONTHLY';

const Schedules = () => {
  const [currentDate, setCurrentDate] = useState<Date>(getSafeDate(new Date()));
  const [editDateMode, setEditDateMode] = useState(false);
  const [currentView, setCurrentView] = useState<SchedulesView>('MONTHLY');

  const handleEditMode = () => {
    setEditDateMode((prev) => !prev);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.currentTarget.value;
    setCurrentDate(getSafeDate(new Date(date)));
    setEditDateMode(false);
  };

  const daily = currentView === 'DAILY';
  const weekly = currentView === 'WEEKLY';
  const monthly = currentView === 'MONTHLY';

  return (
    <>
      <div className="d-flex flex-column w-100">
        <div className="d-flex w-100 mb-3 align-content-center justify-content-between">
          <div className="d-flex mb-3 align-items-center">
            <button
              className="btn"
              type="button"
              onClick={() => setCurrentDate((current) => subMonths(current, 1))}
            >
              <ArrowLeftIcon />
            </button>
            {!editDateMode && (
              <span onClick={handleEditMode}>
                Agenda {currentDate.getMonth() + 1}/{currentDate.getFullYear()}
              </span>
            )}
            {editDateMode && (
              <input
                className="form-control"
                onChange={handleDateChange}
                type="date"
              />
            )}
            <button
              className="btn"
              type="button"
              onClick={() => setCurrentDate((current) => addMonths(current, 1))}
            >
              <ArrowRightIcon />
            </button>
          </div>
          <ul className="nav nav-tabs gap-1">
            <li className="nav-item">
              <button
                type="button"
                className={`btn btn-light${daily ? ' active' : ''}`}
                onClick={() => setCurrentView('DAILY')}
              >
                Diária
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className={`btn btn-light${weekly ? ' active' : ''}`}
                onClick={() => setCurrentView('WEEKLY')}
              >
                Semanal
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className={`btn btn-light${monthly ? ' active' : ''}`}
                onClick={() => setCurrentView('MONTHLY')}
              >
                Mensal
              </button>
            </li>
          </ul>
        </div>
        <div className="d-flex flex-column w-100 rounded overflow-auto">
          {daily && <SchedulesComp date={currentDate} />}
          {monthly &&
            getDaysOfTheMonth(currentDate).map((d) => (
              <SchedulesComp date={d} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Schedules;
