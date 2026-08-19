import DoctorsImg from "@/assets/undraw_medicine_hqqg.svg";
import Dates from "@/components/Dates";
import { formatDateToString } from "@/helpers/date";
import useScheduleStore from "@/store/scheduleStore";

const DashboardCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-light d-flex align-items-center justify-content-center rounded p-3">
      <div className="text-center">
        <h3 className="fs-6"> {title}</h3>
        <div className="fs-1">{children}</div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { getDailyTotalSchedules } = useScheduleStore();
  const currentDate = new Date();

  return (
    <div className="d-flex flex-column w-100 h-100 gap-3">
      <div className="d-flex gap-3">
        <div className="w-25 d-flex align-items-end h-100">
          <img className="img-fluid h-auto" src={DoctorsImg} />
        </div>
        <div className="d-flex gap-3">
          <DashboardCard title="Número de agendamentos do dia">
            <span>{getDailyTotalSchedules()}</span>
          </DashboardCard>
          <DashboardCard title="Número de pacientes atendidos no dia">
            <span>0</span>
          </DashboardCard>
          <DashboardCard title="Faturamento do dia">
            <span>0</span>
          </DashboardCard>
        </div>
      </div>
      <div className="flex-fill">
        <h2>Agenda do dia {formatDateToString(currentDate).day}</h2>
        <div className="bg-light p-1 rounded d-flex flex-column gap-2 overflow-auto">
          <Dates date={currentDate} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
