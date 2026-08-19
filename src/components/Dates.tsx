import { formatDateToString, getSafeDate } from "@/helpers/date";
import useProfessionalStore from "@/store/professionalStore";
import useScheduleStore from "@/store/scheduleStore";
import CheckIcon from "./icons/Check";
import CloseIcon from "./icons/Close";
import TransferIcon from "./icons/Transfer";
import { useState } from "react";
import { createPortal } from "react-dom";
import AddEditSchedule from "@/pages/schedule/AddEditSchedule";
import type { Schedule } from "@/types/Schedule";
import AddIcon from "./icons/Add";

const Dates = ({ date }: { date: Date }) => {
  const { getSchedulesByDate } = useScheduleStore();
  const { getProfessional } = useProfessionalStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule>();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [editMode, setEditMode] = useState(false);

  const dates = getSchedulesByDate(getSafeDate(date));

  return (
    <div>
      <div className="bg-light p-3 m-1 rounded">
        <div className="d-flex gap-3 align-items-center">
          <div className="d-flex flex-column mb-auto">
            <span className="fw-bold fs-4">
              {date.getDate()}/{date.getMonth() + 1}
            </span>

            <button
              type="button"
              className="btn"
              onClick={() => {
                setModalOpen(true);
                setSelectedDate(date);
                setEditMode(false);
              }}
            >
              <AddIcon />
            </button>
          </div>

          <div className="d-flex flex-column flex-fill gap-2">
            {dates.length > 0 &&
              dates.map((s) => (
                <div
                  className="d-flex flex-wrap gap-2 flex-fill justify-content-between rounded bg-secondary text-light p-2"
                  key={s.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSchedule(s);
                    setModalOpen(true);
                    setEditMode(true);
                  }}
                >
                  <div className="d-flex flex-column">
                    <div className="d-flex gap-2">
                      <span className="fs-6">Paciente</span>
                      <span className="fw-bold">{s.patient.fullName}</span>
                    </div>
                    <div className="d-flex gap-2">
                      <span className="fs-6">Profissional</span>
                      <span className="fw-bold">
                        {getProfessional(s.professional)?.fullName}
                      </span>
                    </div>
                    <div className="d-flex gap-2">
                      <span className="fs-6">Hora da consulta</span>
                      <span className="fw-bold">
                        {formatDateToString(new Date(s.date)).time}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex gap-1">
                    <button
                      type="button"
                      className="btn bg-light m-auto"
                      title="Atendido"
                      aria-label="Alterar para atendido"
                    >
                      <CheckIcon />
                    </button>
                    <button
                      type="button"
                      className="btn bg-light m-auto"
                      title="Cancelado"
                      aria-label="Alterar para cancelado"
                    >
                      <CloseIcon />
                    </button>
                    <button
                      type="button"
                      className="btn bg-light m-auto"
                      title="Transferir"
                      aria-label="Transferir agendamento"
                    >
                      <TransferIcon />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {dates.length === 0 && (
        <div className="d-flex align-items-center p-3">
          <span>Agendamentos do dia aparecerão aqui</span>
        </div>
      )}
      {modalOpen &&
        createPortal(
          <AddEditSchedule
            handleModalOpen={setModalOpen}
            schedule={selectedSchedule}
            selectedDate={selectedDate}
            editMode={editMode}
          />,
          document.getElementById("root")!,
        )}
    </div>
  );
};

export default Dates;
