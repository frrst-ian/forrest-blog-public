import { Link, useLocation } from "react-router-dom";
import "../styles/Navigation.css";

const Navigation = () => {
  const location = useLocation();
  const isActive =
    location.pathname === "/posts" || location.pathname.includes("/posts/");
  return (
    <nav className="navigation">
      <div className="navigation_home">
        <Link to="posts" className={isActive ? "active" : ""}>
          Home
        </Link>
      </div>
      <div className="navigation_links">
        <a href="#">Link 1</a>
        <a href="#">Link1</a>
      </div>
    </nav>
  );
};

export default Navigation;
