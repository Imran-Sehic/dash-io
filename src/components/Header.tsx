import {
  ArrowUturnLeftIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context-providers/UserContextProvider";
import Button from "../util-components/Button";

export const Header: React.FC = () => {
  const { username, setUsername } = useUser();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex relative justify-between items-center bg-white sticky top-0 p-2 px-5 border-b shadow border-b-blue-300 z-10">
      <div className="flex gap-4 items-end justify-center">
        <Link className="text-2xl font-custom text-blue-400" to="/">
          Dash.io
        </Link>
        <Link
          to="/about-us"
          className="text-blue-300 underline transition hover:text-blue-400"
        >
          About
        </Link>
      </div>

      <UserCircleIcon
        className="w-6 text-blue-400 cursor-pointer"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className="absolute flex flex-col justify-center items-center gap-2 right-1 bg-white border-2 top-[100%] mt-1 p-2 rounded">
          <p className="flex items-center justify-center gap-1 text-xl">
            <UserIcon className="w-4 text-blue-400" />
            <span>{username}</span>
          </p>
          <div className="border w-full" />
          <Button
            icon={<ArrowUturnLeftIcon className="w-4" />}
            className="flex bg-blue-300 text-xl transition hover:bg-blue-400 text-white items-center justify-center border w-full gap-1"
            onClick={() => {
              setUsername("");
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};
