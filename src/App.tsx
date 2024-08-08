import { Outlet } from "react-router-dom";
import Header from "./components/header";

function App() {
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
