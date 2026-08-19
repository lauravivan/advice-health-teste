import { formatDateToString } from '@/helpers/date';
import useProfessionalStore from '@/store/professionalStore';
import useScheduleStore from '@/store/scheduleStore';
import CheckIcon from './icons/Check';
import CloseIcon from './icons/Close';
import TransferIcon from './icons/Transfer';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import AddEditSchedule from '@/pages/schedule/AddEditSchedule';
import type { Schedule } from '@/types/Schedule';
import AddIcon from './icons/Add';
import { ScheduleStatus } from '@/constants/schedule';
import { isSameDay } from 'date-fns';
import { useForm } from 'react-hook-form';
import {
  patchScheduleSchema,
  type PatchScheduleSchema,
} from '@/schemas/schedule.schema';
import { zodResolver } from '@hookform/resolvers/zod';

const Schedules = ({ date }: { date: Date }) => {
  const { updateSchedule, schedules, patchSchedule } = useScheduleStore();
  const { getProfessional, getPaginatedProfessionals } = useProfessionalStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [professionalModalOpen, setProfessionalModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule>();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [editMode, setEditMode] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatchScheduleSchema>({
    resolver: zodResolver(patchScheduleSchema),
  });
  const [scheduleId, setScheduleId] = useState('');

  const schedulesByDate = schedules.filter((schedule) =>
    isSameDay(new Date(schedule.date), date)
  );

  const updateScheduleStatus = (id: string, s: Schedule) => {
    updateSchedule(id, s);
  };

  const onSubmit = (data: PatchScheduleSchema) => {
    patchSchedule(scheduleId, {
      professional: data.professional,
    });

    setTimeout(() => {
      setProfessionalModalOpen(false);
    }, 500);
  };

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
            {schedulesByDate.length > 0 &&
              schedulesByDate.map((s) => {
                let bgColor = 'bg-secondary';

                if (s.status === ScheduleStatus.ATTENDED)
                  bgColor = 'bg-success';
                if (s.status === ScheduleStatus.CANCELED) bgColor = 'bg-danger';

                return (
                  <div
                    className={`d-flex flex-wrap gap-2 flex-fill justify-content-between rounded text-light p-2 ${bgColor}`}
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
                          {formatDateToString(new Date(s.date)).normalizedTime}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex gap-1">
                      <button
                        type="button"
                        className="btn bg-light m-auto"
                        title="Atendido"
                        aria-label="Alterar para atendido"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateScheduleStatus(s.id, {
                            ...s,
                            status: ScheduleStatus.ATTENDED,
                          });
                        }}
                        disabled={s.status !== ScheduleStatus.SCHEDULED}
                      >
                        <CheckIcon />
                      </button>
                      <button
                        type="button"
                        className="btn bg-light m-auto"
                        title="Cancelado"
                        aria-label="Alterar para cancelado"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateScheduleStatus(s.id, {
                            ...s,
                            status: ScheduleStatus.CANCELED,
                          });
                        }}
                        disabled={s.status !== ScheduleStatus.SCHEDULED}
                      >
                        <CloseIcon />
                      </button>
                      <button
                        type="button"
                        className="btn bg-light m-auto"
                        title="Transferir"
                        aria-label="Transferir agendamento"
                        onClick={(e) => {
                          e.stopPropagation();
                          setScheduleId(s.id);
                          setProfessionalModalOpen(true);
                        }}
                        disabled={s.status !== ScheduleStatus.SCHEDULED}
                      >
                        <TransferIcon />
                      </button>
                    </div>
                  </div>
                );
              })}
            {schedulesByDate.length === 0 && (
              <div className="d-flex align-items-center p-3">
                <span>Agendamentos do dia aparecerão aqui</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {modalOpen &&
        createPortal(
          <AddEditSchedule
            handleModalOpen={setModalOpen}
            schedule={selectedSchedule}
            selectedDate={selectedDate}
            editMode={editMode}
          />,
          document.getElementById('root')!
        )}
      {professionalModalOpen &&
        createPortal(
          <div className="modal fade show d-block" tabIndex={-1} role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5>Transferir agendamento</h5>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setProfessionalModalOpen(false)}
                  />
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <select
                      aria-label="Selecionar profissional"
                      id="professional"
                      className={`form-control ${errors.professional ? 'is-invalid' : ''}`}
                      {...register('professional')}
                    >
                      <option value="" selected>
                        Selecione uma pessoa profissional
                      </option>
                      {getPaginatedProfessionals().map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.fullName} - {p.crm}{' '}
                        </option>
                      ))}
                    </select>
                    <div className="d-flex gap-2 mt-3">
                      <button type="submit" className="btn btn-success">
                        Confirmar
                      </button>
                      <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => setProfessionalModalOpen(false)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>,
          document.getElementById('root')!
        )}
    </div>
  );
};

export default Schedules;
