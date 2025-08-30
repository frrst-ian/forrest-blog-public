import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import Navigation from "../src/components/Navigation";
import "./styles/App.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="header">
          <Navigation />
        </header>
        <main className="main">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
};

export { App };
