import { useAuth } from "../hooks/useAuth";
import "../styles/navbar.css";

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav>
      {isAuthenticated ? (
        <>
          <nav className="navbar">
            <div className="navbar-left">
              <span className="navbar-logo">Auth Context Project</span>
            </div>

            <div className="navbar-right">
              <span className="navbar-user">{user?.name}</span>
              <button className="navbar-logout" onClick={logout}>
                Logout
              </button>
            </div>
          </nav>
        </>
      ) : (
        <span>Not logged in</span>
      )}
    </nav>
  );
}
