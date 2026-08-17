import useProfessionalStore from "@/store/professionalStore";
import { Link } from "react-router";

const Header = () => {
  const { professional } = useProfessionalStore();

  return (
    <header className="d-flex bg-light w-100">
      <nav className="d-flex justify-content-between w-100">
        <ul className="d-flex mb-0 list-unstyled">
          <li>
            <Link to="/">
              <img src="./logo.png" />
            </Link>
          </li>
        </ul>
        {professional && (
          <ul className="list-unstyled mb-0 pe-2 fw-bold d-flex align-items-center">
            <li>
              <span>Agenda {professional.name}</span>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
