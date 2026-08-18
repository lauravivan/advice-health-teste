import { getSafeDate } from "@/helpers/date";
import useProfessionalStore from "@/store/professionalStore";
import useScheduleStore from "@/store/scheduleStore";

const Dates = ({ date }: { date: Date }) => {
  const { getSchedulesByDate } = useScheduleStore();
  const { getProfessional } = useProfessionalStore();

  const dates = getSchedulesByDate(getSafeDate(date));

  return (
    <div>
      {dates.length === 0 && (
        <div className="d-flex align-items-center p-3">
          <span>Agendamentos do dia aparecerão aqui</span>
        </div>
      )}
      {dates.length > 0 &&
        dates.map((s) => (
          <div
            className="d-flex flex-column bg-secondary rounded text-light p-2"
            key={s.id}
          >
            <div className="d-flex gap-2 align-items-center">
              <span className="fs-6">Paciente</span>
              <span className="fw-bold">{s.patient.fullName}</span>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <span className="fs-6">Profissional</span>
              <span className="fw-bold">
                {getProfessional(s.professional)?.fullName}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Dates;
