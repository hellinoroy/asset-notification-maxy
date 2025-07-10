import React, { useState } from 'react';
import { History, Bell, User } from 'lucide-react'; // Menggunakan ikon dari Lucide React

const Topbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  // Data dummy untuk notifikasi
  const notifications = [
    {
      id: 1,
      type: 'status_update',
      title: 'Pembaruan Status',
      message: 'Budi menandai aset MBL01 – Mobil HRV sebagai Selesai pada 26 November 2025',
      date: '26 November 2025',
      read: false,
    },
    {
      id: 2,
      type: 'upcoming_maintenance',
      title: 'Besok Maintenance!',
      message: 'Sari mengubah status aset GEN03 – Genset Gudang menjadi Pending. Jadwal berikutnya: 5 Desember 2025',
      date: '5 Desember 2025',
      read: false,
    },
    {
      id: 3,
      type: 'overdue_maintenance',
      title: 'Maintenance Terlambat!',
      message: 'Aset MBL01 – Mobil Honda HRV belum menjalani maintenance sejak 25 November 2025.',
      date: '25 November 2025',
      read: false,
    },
    // Anda bisa menambahkan lebih banyak notifikasi di sini
  ];

  const unreadNotificationsCount = notifications.filter(notif => !notif.read).length;

  const toggleNotifications = () => {
    setShowNotifications(prev => !prev);
  };

  return (
    <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-end border-b border-gray-200">
      <div className="flex items-center space-x-6">
        {/* History Icon */}
        <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                onClick={() => console.log('History clicked')}>
          <History className="w-6 h-6" />
        </button>

        {/* Notification Icon dengan Dropdown */}
        <div className="relative">
          <button
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            onClick={toggleNotifications}
          >
            <Bell className="w-6 h-6" />
            {/* Notification Dot (example) - hanya tampil jika ada notifikasi belum dibaca */}
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            )}
          </button>

          {/* Notifikasi Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
              <div className="py-2 px-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Notifikasi ({unreadNotificationsCount} Baru)</h3>
              </div>
              <div className="max-h-80 overflow-y-auto"> {/* Batasi tinggi dan buat bisa di-scroll */}
                {notifications.length > 0 ? (
                  notifications.map(notif => (
                    <div
                      key={notif.id}
                      className={`p-4 border-b border-gray-100 last:border-b-0 cursor-pointer
                                  ${notif.read ? 'bg-gray-50 text-gray-600' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
                      onClick={() => console.log(`Notifikasi ${notif.id} diklik`)} // Ganti dengan logika penanganan notifikasi
                    >
                      <p className="font-semibold text-sm mb-1">{notif.title}</p>
                      <p className="text-xs text-gray-700">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notif.date}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm">Tidak ada notifikasi baru.</div>
                )}
              </div>
              {notifications.length > 0 && (
                <div className="py-2 px-4 border-t border-gray-200 text-center">
                  <button className="text-blue-600 text-sm hover:underline"
                          onClick={() => console.log('Lihat semua notifikasi')}>
                    Lihat Semua Notifikasi
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            {/* Ganti dengan gambar profil pengguna */}
            <User className="w-5 h-5 text-gray-500" /> 
            {/* Atau jika ada gambar: <img src="/path/to/profile.jpg" alt="Profile" className="w-full h-full object-cover" /> */}
          </div>
          <div>
            <p className="font-semibold text-gray-800">Nama</p> {/* Ganti dengan nama pengguna */}
            <p className="text-sm text-gray-500">Staff</p> {/* Ganti dengan peran pengguna (Admin/Staff) */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
