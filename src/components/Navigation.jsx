import { Link, useLocation } from "react-router-dom";
import "../styles/Navigation.css";

const Navigation = () => {
  const location = useLocation();
  const isActive =
    location.pathname === "/posts" || location.pathname.includes("/posts/");
  return (
    <nav className="navigation">
      <Link to="post" className={isActive ? "active" : ""}>Home</Link>
    </nav>
  );
};

export default Navigation;
