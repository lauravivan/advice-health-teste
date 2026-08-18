import { Link } from "react-router";

const Header = () => {
  return (
    <header className="d-flex bg-light w-100">
      <nav className="d-flex justify-content-between w-100">
        <ul className="d-flex mb-0 list-unstyled">
          <li>
            <Link to="/">
              <img src="/logo.png" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
