import DoctorsImg from "@/assets/undraw_medicine_hqqg.svg";
import Dates from "@/components/Dates";
import { formatDateToString } from "@/helpers/date";

const DashboardCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-light d-flex align-items-center justify-content-center rounded flex-fill p-3">
      <div className="text-center">
        <h3 className="fs-6"> {title}</h3>
        <div className="fs-1">{children}</div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const currentDate = new Date();

  return (
    <div className="d-flex w-100 h-100 gap-3">
      <div className="w-25 d-flex align-items-end h-100">
        <img className="img-fluid h-auto" src={DoctorsImg} />
      </div>
      <div className="d-flex flex-column gap-3 flex-fill h-100">
        <DashboardCard title="Número de agendamentos do dia">
          <span>0</span>
        </DashboardCard>
        <DashboardCard title="Número de pacientes atendidos no dia">
          <span>0</span>
        </DashboardCard>
        <DashboardCard title="Faturamento do dia">
          <span>0</span>
        </DashboardCard>
      </div>
      <div className="flex-fill h-100">
        <h2>Agenda do dia {formatDateToString(currentDate)}</h2>
        <div className="h-100 bg-light rounded">
          <Dates date={currentDate} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
