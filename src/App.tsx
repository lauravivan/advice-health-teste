import { Route, Routes, BrowserRouter } from 'react-router';
import Aside from './components/Aside';
import Footer from './components/Footer';
import Header from './components/Header';
import Dashboard from './pages/home/Dashboard';
import Schedules from './pages/schedule/Schedules';
import Professionals from './pages/professional/Professionals';
import AddEditProfessional from './pages/professional/AddEditProfessional';
import navigation from './navigation';
import useProfessionalStore, { getStoredPros } from './store/professionalStore';
import { useEffect } from 'react';
import useScheduleStore, { getStoredSchedules } from './store/scheduleStore';
import professionals from '@/db/professionals.json';
import schedules from '@/db/schedules.json';

function App() {
  const { setProfessionals } = useProfessionalStore();
  const { setSchedules } = useScheduleStore();

  useEffect(() => {
    const pros = getStoredPros();
    const existingIds = new Set(pros.map((pro) => pro.id));

    setProfessionals([
      ...pros,
      ...professionals.filter((pro) => !existingIds.has(pro.id)),
    ]);
  }, []);

  useEffect(() => {
    const schs = getStoredSchedules();
    const existingIds = new Set(schs.map((pro) => pro.id));

    setSchedules([
      ...schs,
      ...schedules.filter((pro) => !existingIds.has(pro.id)),
    ]);
  }, []);

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
              <Route
                path={navigation.navigateToProfessionals.register().pathname}
                element={<AddEditProfessional />}
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;
