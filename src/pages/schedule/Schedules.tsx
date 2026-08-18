import ArrowLeftIcon from "@/components/icons/ArrowLeft";
import ArrowRightIcon from "@/components/icons/ArrowRight";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  startOfMonth,
  subDays,
  subMonths,
} from "date-fns";
import { useState } from "react";
import { createPortal } from "react-dom";
import AddEditSchedule from "./AddEditSchedule";
import { getSafeDate } from "@/helpers/date";
import Dates from "@/components/Dates";

const getDaysOfTheMonth = (date: Date): Date[] => {
  const firstDay = startOfMonth(date);

  const calendarStart = subDays(firstDay, firstDay.getDay());

  const calendarEnd = addDays(calendarStart, 41);

  return eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });
};

enum SchedulesView {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
}

const Schedules = () => {

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [currentDate, setCurrentDate] = useState<Date>(getSafeDate(new Date()));
  const [editDateMode, setEditDateMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<SchedulesView>(
    SchedulesView.MONTHLY,
  );

  const handleEditMode = () => {
    setEditDateMode((prev) => !prev);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.currentTarget.value;
    setCurrentDate(getSafeDate(new Date(date)));
    setEditDateMode(false);
  };

  return (
    <>
      <div className="d-flex flex-column w-100 h-100">
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
                className={`btn btn-light${currentView === SchedulesView.DAILY ? " active" : ""}`}
                onClick={() => setCurrentView(SchedulesView.DAILY)}
              >
                Diária
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className={`btn btn-light${currentView === SchedulesView.WEEKLY ? " active" : ""}`}
                onClick={() => setCurrentView(SchedulesView.WEEKLY)}
              >
                Semanal
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className={`btn btn-light${currentView === SchedulesView.MONTHLY ? " active" : ""}`}
                onClick={() => setCurrentView(SchedulesView.MONTHLY)}
              >
                Mensal
              </button>
            </li>
          </ul>
        </div>
        <div className="d-flex flex-column w-100 h-100 rounded overflow-auto">
          {currentView === SchedulesView.DAILY && (
            <div
              onClick={() => {
                setModalOpen(true);
                setSelectedDate(currentDate);
              }}
              className="bg-light h-100 p-3 m-1 rounded"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              {currentDate.getDate()}/{currentDate.getMonth() + 1}
              <Dates date={currentDate} />
            </div>
          )}
          {currentView === SchedulesView.MONTHLY &&
            getDaysOfTheMonth(currentDate).map((d) => (
              <div
                onClick={() => {
                  setModalOpen(true);
                  setSelectedDate(d);
                }}
                className="bg-light p-3 m-1 rounded"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                {d.getDate()}/{d.getMonth() + 1}
                <Dates date={d} />
              </div>
            ))}
        </div>
      </div>
      {modalOpen &&
        createPortal(
          <AddEditSchedule
            handleModalOpen={setModalOpen}
            selectedDate={selectedDate}
          />,
          document.getElementById("root")!,
        )}
    </>
  );
};

export default Schedules;
