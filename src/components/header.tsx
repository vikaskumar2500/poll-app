import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { authContext } from "@/context/auth-context";

const Links = [
  {
    id: 1,
    href: "/",
    label: "View Polls",
  },
  {
    id: 2,
    href: "/create-poll",
    label: "Create Poll",
  },
  {
    id: 3,
    href: "/view-results",
    label: "View Resutls",
  },
];

const Header: React.FC = () => {
  const { Logout } = useContext(authContext);

  const navigate = useNavigate();
  const handleLogout = () => {
    Logout();
    navigate("/signin");
  };
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md fixed w-full">
      <nav className="container w-full">
        <ul className="flex space-x-4 text-center justify-center">
          <>
            {Links.map((link) => (
              <li id={link.id + ""} key={link.id}>
                <Link
                  to={link.href}
                  className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </>
          <Button
            variant="velocity"
            className="hover:text-green-500"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
