import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import JadwalPage from './pages/JadwalPage';
import EditJadwalPage from './pages/EditJadwalPage';
import AdminLayout from './layouts/AdminLayout';
import INITIAL_SCHEDULE_DATA from './data/scheduledata';

// Tipe untuk satu entri jadwal
export interface ScheduleItem {
  id: string;
  namaAset: string;
  lastMaintenance: string;
  nextMaintenance: string;
  keterangan: string;
  pic: string;
  status: string;
  yn: boolean;
}

const App: React.FC = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleItem[]>(INITIAL_SCHEDULE_DATA);

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="schedule" replace />} />

          <Route
            path="schedule"
            element={
              <JadwalPage
                scheduleData={scheduleData}
                setScheduleData={setScheduleData}
              />
            }
          />
          <Route
            path="schedule/edit"
            element={
              <EditJadwalPage
                scheduleData={scheduleData}
                setScheduleData={setScheduleData}
              />
            }
          />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
};

export default App;
