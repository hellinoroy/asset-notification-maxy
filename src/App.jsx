import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import JadwalPage from './pages/JadwalPage';
import EditJadwalPage from './pages/EditJadwalPage';
import AdminLayout from './layouts/AdminLayout';
// Import data dummy jadwal dari file terpisah
import INITIAL_SCHEDULE_DATA from './data/scheduleData'; // <--- Tambahan import ini

function App() {
  const [scheduleData, setScheduleData] = useState(INITIAL_SCHEDULE_DATA); // State untuk data jadwal global

  return (
    // Hapus <BrowserRouter> dari sini, karena sudah ada di main.jsx
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Rute untuk halaman admin menggunakan AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Default child route, redirect ke /admin/schedule */}
          <Route index element={<Navigate to="schedule" replace />} />
          {/* Meneruskan scheduleData dan setScheduleData ke JadwalPage */}
          <Route
            path="schedule"
            element={
              <JadwalPage
                scheduleData={scheduleData}
                setScheduleData={setScheduleData} // ✅ Tambahkan ini
              />
            }
          />
          {/* Meneruskan scheduleData dan setScheduleData ke EditJadwalPage */}
          <Route
            path="schedule/edit"
            element={
              <EditJadwalPage
                scheduleData={scheduleData}
                setScheduleData={setScheduleData}
              />
            }
          />
          {/* Di sini Anda bisa menambahkan rute lain seperti /admin/assets, /admin/reports */}
          {/* <Route path="assets" element={<AssetsPage />} /> */}
          {/* <Route path="reports" element={<ReportsPage />} */}
        </Route>
        
        {/* Redirect default ke halaman login jika tidak ada rute yang cocok atau sebagai halaman landing */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
