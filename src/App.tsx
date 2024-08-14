import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/header";
import { useContext, useEffect, useState } from "react";
import { authContext, User } from "./context/auth-context";

function App() {
  const [mount, setMount] = useState(false);
  const { Login } = useContext(authContext);
  const navigate = useNavigate();
  useEffect(() => {
    setMount(true);
    // I am just accessing the userdata from localstorage
    const userData = localStorage.getItem("user") as string;
    if (userData) {
      const user = JSON.parse(userData) as User;
      Login(user);
      return navigate("/");
    }

    () => {
      if (!mount) return null;
      navigate("/signin");
    };
  }, []);

  return (
    <main className=" bg-left-bottom from-blue-400 to-gre-500 bg-gray-100 w-full min-h-screen">
      <Header />
      <section className="pt-28 flex items-center justify-center">
        <Outlet />
      </section>
    </main>
  );
}

export default App;
