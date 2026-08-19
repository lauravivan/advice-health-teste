import { Link } from 'react-router';
import CalendarIcon from './icons/Calendar';
import PersonIcon from './icons/Person';
import HomeIcon from './icons/Home';
import navigation from '@/navigation';

const AsideIconItem = ({ children }: { children: React.ReactNode }) => {
  return <li className="bg-secondary:hover p-1">{children}</li>;
};

const Aside = () => {
  return (
    <aside className="d-flex bg-primary h-md-100 pt-3 p-md-3 z-3">
      <ul className="list-unstyled d-flex flex-md-column gap-3">
        <AsideIconItem>
          <Link title="Página inicial" to="/">
            <HomeIcon />
          </Link>
        </AsideIconItem>
        <AsideIconItem>
          <Link
            title="Profissionais"
            to={navigation.navigateToProfessionals.home()}
          >
            <PersonIcon />
          </Link>
        </AsideIconItem>
        <AsideIconItem>
          <Link title="Agendamentos" to={navigation.navigateToSchedules.home()}>
            <CalendarIcon />
          </Link>
        </AsideIconItem>
      </ul>
    </aside>
  );
};

export default Aside;
