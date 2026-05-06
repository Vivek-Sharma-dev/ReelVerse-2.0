import { Outlet } from "react-router-dom";
import Header from "./components/layout/header/Header";

const App = () => {
  return (
    <>
      <Header />
      {/* --- Main Content --- */}
      <main className="px-4">
        <Outlet />
      </main>
    </>
  );
};

export default App;
