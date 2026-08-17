import { Route, Routes, BrowserRouter } from "react-router";
import Aside from "./components/Aside";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Dashboard from "./pages/home/Dashboard";
import Schedules from "./pages/schedule/Schedules";
import Professionals from "./pages/professional/Professionals";

function App() {
  return (
    <BrowserRouter>
      <main className="d-flex w-100 h-100">
        <Aside />
        <div className="d-flex flex-column w-100 h-100">
          <Header />
          <div className="d-flex p-3 w-100 h-100">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profissionais" element={<Professionals />} />
              <Route path="/schedules" element={<Schedules />} />
            </Routes>
          </div>
          <Footer />  
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;
