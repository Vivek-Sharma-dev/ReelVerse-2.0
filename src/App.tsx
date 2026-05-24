import { Outlet } from "react-router-dom";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";

const App = () => {
  return (
    <>
    <ScrollToTop />
      <Header />
      {/* --- Main Content --- */}
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
