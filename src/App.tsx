import { Outlet } from "react-router-dom";
import Header from "./components/layout/header/Header";

const App = () => {
  return (
    <>
      <Header />
      {/* --- Main Content --- */}
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </>
  );
};

export default App;
