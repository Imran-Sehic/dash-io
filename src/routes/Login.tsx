import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context-providers/UserContextProvider";

const Login: React.FC = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const navigate = useNavigate();
  const { setUsername } = useUser();

  return (
    <div className="flex h-[100vh] justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="flex flex-col mb-20 text-center items-center">
          <h1 className="text-5xl mb-2 font-custom text-blue-400">Dash.io</h1>
          <p className="text-xs text-slate-400">Welcome to Dash.io.</p>
          <p className="text-xs text-slate-400">
            Please login below to access the table and it's data
          </p>
        </div>

        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            setUsername(usernameInput);
            navigate("/");
          }}
        >
          <input
            className="border-b outline-none focus:border-b-blue-300 transition"
            type="text"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            placeholder="username"
          />
          <input
            type="submit"
            value="Login"
            className="rounded px-2 bg-blue-300 text-white cursor-pointer transition border border-blue-300 hover:bg-white hover:text-blue-300"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
