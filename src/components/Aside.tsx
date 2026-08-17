import { Link } from "react-router";
import CalendarIcon from "./icons/Calendar";
import PersonIcon from "./icons/Person";
import HomeIcon from "./icons/Home";

const AsideIconItem = ({ children }: { children: React.ReactNode }) => {
  return <li className="bg-secondary:hover">{children}</li>;
};

const Aside = () => {
  return (
    <aside className="d-flex bg-primary w-[50px] p-3">
      <ul className="list-unstyled d-flex flex-column gap-3">
        <AsideIconItem>
          <Link to="/">
            <HomeIcon />
          </Link>
        </AsideIconItem>
        <AsideIconItem>
          <Link to="/profissionais">
            <PersonIcon />
          </Link>
        </AsideIconItem>
        <AsideIconItem>
          <Link to="/schedules">
            <CalendarIcon />
          </Link>
        </AsideIconItem>
      </ul>
    </aside>
  );
};

export default Aside;
