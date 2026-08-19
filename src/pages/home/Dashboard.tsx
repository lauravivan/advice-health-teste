import DoctorsImg from '@/assets/undraw_medicine_hqqg.svg';
import Schedules from '@/components/Schedules';
import { ScheduleStatus } from '@/constants/schedule';
import { formatDateToString } from '@/helpers/date';
import useScheduleStore from '@/store/scheduleStore';
import { isSameDay } from 'date-fns';

const DashboardCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-light d-flex flex-fill align-items-center justify-content-center rounded p-3">
      <div className="text-center">
        <h3 className="fs-6"> {title}</h3>
        <div className="fs-1">{children}</div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { schedules } = useScheduleStore();
  const currentDate = new Date();

  const getDailyTotalSchedules = () => {
    const date = new Date();
    const schs = schedules.filter((schedule) =>
      isSameDay(new Date(schedule.date), date)
    );
    return schs.length;
  };

  const getDailyTotalAttendedSchedules = () => {
    const date = new Date();
    const schs = schedules.filter((schedule) =>
      isSameDay(new Date(schedule.date), date)
    );
    const schedulesAttended = schs.filter(
      (s) => s.status === ScheduleStatus.ATTENDED
    );
    return schedulesAttended.length;
  };

  const getDailyBilling = () => {
    const date = new Date();
    const schs = schedules.filter((schedule) =>
      isSameDay(new Date(schedule.date), date)
    );
    const schedulesAttended = schs.filter(
      (s) => s.status === ScheduleStatus.ATTENDED
    );
    return schedulesAttended.reduce((acc, current) => {
      return acc + parseInt(current.price);
    }, 0);
  };

  return (
    <div className="d-flex flex-column w-100 h-100 gap-3">
      <div className="d-flex gap-3">
        <div className="w-25 d-flex align-items-end h-100">
          <img className="img-fluid h-auto" src={DoctorsImg} />
        </div>
        <div className="d-flex flex-fill gap-3">
          <DashboardCard title="Número de agendamentos do dia">
            <span>{getDailyTotalSchedules()}</span>
          </DashboardCard>
          <DashboardCard title="Número de pacientes atendidos no dia">
            <span>{getDailyTotalAttendedSchedules()}</span>
          </DashboardCard>
          <DashboardCard title="Faturamento do dia">
            <span>R$ {getDailyBilling()}</span>
          </DashboardCard>
        </div>
      </div>
      <div className="flex-fill">
        <h2>Agenda do dia {formatDateToString(currentDate).normalizedDay}</h2>
        <div className="bg-light p-1 rounded d-flex flex-column gap-2 overflow-auto">
          <Schedules date={currentDate} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
