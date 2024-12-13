import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { UserProvider, useUser } from "./context-providers/UserContextProvider";
import About from "./routes/About";
import Login from "./routes/Login";
import Main from "./routes/Main";

const App: React.FC = () => {
  const { username } = useUser();

  return (
    <Router>
      <Routes>
        {!username ? (
          <Route path="*" element={<Navigate to="/login" />} />
        ) : (
          <>
            <Route path="/" element={<Main />} />
            <Route path="/about-us" element={<About />} />
          </>
        )}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default function AppWrapper() {
  return (
    <UserProvider>
      <App />
      <ToastContainer />
    </UserProvider>
  );
}
