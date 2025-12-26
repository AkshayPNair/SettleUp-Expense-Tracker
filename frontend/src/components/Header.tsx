import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? "nav-active" : "";

  return (
    <header className="app-header">
      <div className="header-inner">
        {/* Logo */}
        <div className="logo" onClick={() => navigate("/")}>
          SettleUp
        </div>

        {/* Center Navigation */}
        <nav className="nav-center">
          <button
            className={isActive("/") ? "nav-btn nav-active" : "nav-btn"}
            onClick={() => navigate("/")}
          >
            Dashboard
          </button>

          <button
            className={isActive("/groups") ? "nav-btn nav-active" : "nav-btn"}
            onClick={() => navigate("/groups")}
          >
            Groups
          </button>

          <button
            className={isActive("/reports") ? "nav-btn nav-active" : "nav-btn"}
            onClick={() => navigate("/reports")}
          >
            Reports
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header;
