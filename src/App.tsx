import { useOutlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";

const App = () => {
  const location = useLocation();
  const Outlet = useOutlet();
  return (
    <>
      <ScrollToTop />
      <Header />
      {/* --- Main Content --- */}
      <main className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location?.pathname}
            initial={{
              y: "100%",
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            transition={{
              duration: .5,
              ease: "easeInOut",
            }}
            layout
          >
            {Outlet}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
};

export default App;
