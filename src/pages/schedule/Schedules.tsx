import { findAddress } from "@/api/cep";
import ArrowLeftIcon from "@/components/icons/ArrowLeft";
import ArrowRightIcon from "@/components/icons/ArrowRight";
import { formatDateToString } from "@/helpers/date";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  getDay,
  startOfMonth,
  subMonths,
} from "date-fns";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";

const getDaysOfTheMonth = (date: Date): Date[] => {
  const firstDay = startOfMonth(date);
  const endDay = endOfMonth(date);
  const dayOfTheWeekMonthStarts = getDay(firstDay);
  const dayOfTheWeekMonthEnds = getDay(endDay);
  const qntDaysOfNextMonth = 6 - dayOfTheWeekMonthEnds;

  const previousMonth = eachDayOfInterval({
    start: startOfMonth(subMonths(date, 1)),
    end: endOfMonth(subMonths(date, 1)),
  });

  const currentMonth = eachDayOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  });

  const nextMonth = eachDayOfInterval({
    start: startOfMonth(addMonths(date, 1)),
    end: endOfMonth(addMonths(date, 1)),
  });

  const daysOfPreviousMonth = previousMonth.slice(
    previousMonth.length - dayOfTheWeekMonthStarts,
    previousMonth.length,
  );

  const daysOfNextMonth = nextMonth.slice(0, qntDaysOfNextMonth);

  return daysOfPreviousMonth.concat(currentMonth).concat(daysOfNextMonth);
};

enum SchedulesView {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
}

const Schedules = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [editDateMode, setEditDateMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<SchedulesView>(
    SchedulesView.MONTHLY,
  );
  const [selectedDate, setSelectedDate] = useState<Date>();
  const street = useRef<HTMLInputElement>(null);
  const neighborhood = useRef<HTMLInputElement>(null);
  const additionalInfo = useRef<HTMLInputElement>(null);
  const city = useRef<HTMLInputElement>(null);

  const handleEditMode = () => {
    setEditDateMode((prev) => !prev);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.currentTarget.value;
    setCurrentDate(new Date(date));
    setEditDateMode(false);
  };

  const handleCEP = async (CEP: string) => {
    const res = await findAddress(CEP);

    if (res.logradouro && street.current) street.current.value = res.logradouro;
    if (res.bairro && neighborhood.current)
      neighborhood.current.value = res.bairro;
    if (res.localidade && city.current) city.current.value = res.localidade;
    if (res.complemento && additionalInfo.current)
      additionalInfo.current.value = res.complemento;
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
                Agenda {currentDate.getMonth()}/{currentDate.getFullYear()}
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
              {currentDate.getDate()}
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
                {d.getDate()}
              </div>
            ))}
        </div>
      </div>
      {modalOpen &&
        createPortal(
          <>
            <div
              className="modal-backdrop fade show"
              onClick={() => setModalOpen(false)}
            />
            <div
              className="modal fade show d-block"
              tabIndex={-1}
              role="dialog"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      Agendar para dia {formatDateToString(selectedDate)}
                    </h5>

                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setModalOpen(false)}
                    />
                  </div>

                  <div className="modal-body">
                    <form className="d-flex flex-column gap-2">
                      <div className="d-flex flex-column gap-2">
                        <h5>Dados do paciente</h5>
                        <input
                          className="form-control"
                          placeholder="Nome completo"
                        ></input>
                        <input
                          className="form-control"
                          placeholder="CPF"
                          maxLength={11}
                        ></input>
                        <input className="form-control" type="date"></input>
                        <div className="d-flex flex-column gap-2">
                          <input
                            className="form-control"
                            placeholder="CEP"
                            maxLength={8}
                            onBlur={(e) => handleCEP(e.currentTarget.value)}
                          />
                          <div className="d-flex gap-2">
                            <input
                              className="form-control flex-fill"
                              placeholder="Rua"
                              ref={street}
                            />
                            <input
                              className="form-control"
                              placeholder="Número"
                              type="number"
                            />
                          </div>
                          <input
                            className="form-control"
                            placeholder="Complemento"
                            ref={additionalInfo}
                          />
                          <div className="d-flex gap-2">
                            <input
                              className="form-control"
                              placeholder="Bairro"
                              ref={neighborhood}
                            />
                            <input
                              className="form-control"
                              placeholder="Cidade"
                              ref={city}
                            />
                          </div>
                        </div>
                        <textarea
                          className="form-control"
                          placeholder="Queixa do paciente"
                        ></textarea>
                      </div>
                      <div className="d-flex flex-column gap-2">
                        <h5>Dados da pessoa profissional</h5>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>Open this select menu</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                      <div className="d-flex flex-column gap-2">
                        <h5>Dados do pagamento</h5>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>Escolha forma de pagamento</option>
                          <option value="1">Cartão de crédito</option>
                          <option value="2">Pix</option>
                          <option value="3">Dinheiro</option>
                        </select>
                      </div>
                      <button className="btn btn-light" type="submit">
                        Agendar
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>,
          document.getElementById("root")!,
        )}
    </>
  );
};

export default Schedules;
