import React, { useState } from 'react';
import ScheduleTable from '../components/ScheduleTable';
import AddScheduleForm from '../components/AddScheduleForm';
import Pagination from '../components/Pagination';
import { SquarePen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ActionButton from '../components/ActionButton';
import SearchBar from '../components/SearchBar';
// import INITIAL_SCHEDULE_DATA from '../data/scheduleData'; // Hapus import ini, data dari props

// Menerima scheduleData dan setScheduleData dari props (dari App.jsx)
const JadwalPage = ({ scheduleData, setScheduleData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  // Filter data berdasarkan search term HANYA pada namaAset
  // Gunakan scheduleData dari props
  const filteredData = scheduleData.filter(item =>
    item.namaAset?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Logika Paginasi
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditClick = () => {
    navigate('/admin/schedule/edit');
  };

  // ✅ Fungsi untuk menambahkan atau mengedit jadwal baru
  const handleAddSchedule = (newSchedule) => {
    setScheduleData(prevData => {
      const existingItemIndex = prevData.findIndex(item => item.id === newSchedule.id);

      if (existingItemIndex > -1) {
        // Jika ID sudah ada, perbarui item yang ada
        const existingItem = prevData[existingItemIndex];
        const updatedItem = {
          ...existingItem, // Mulai dengan data yang sudah ada
          ...newSchedule, // Timpa dengan data baru dari formulir
          // Pertahankan lastMaintenance dari data yang sudah ada
          // jika newSchedule.lastMaintenance adalah placeholder default ('-')
          lastMaintenance: newSchedule.lastMaintenance === '-'
            ? existingItem.lastMaintenance
            : newSchedule.lastMaintenance,
        };

        const updatedData = prevData.map((item, index) =>
          index === existingItemIndex ? updatedItem : item
        );
        alert('Jadwal berhasil diperbarui!');
        return updatedData;
      } else {
        // Jika ID belum ada, tambahkan item baru
        alert('Jadwal baru berhasil ditambahkan!');
        return [...prevData, newSchedule];
      }
    });
    // Setelah menambahkan/memperbarui data, kembali ke halaman pertama paginasi
    setCurrentPage(1);
  };

  // Fungsi untuk mengubah status 'yn' pada item jadwal (jika masih digunakan)
  const handleToggleYn = (id, newYnStatus) => {
    console.log(`Mengubah status Y/N untuk ID: ${id} menjadi: ${newYnStatus}`);
    setScheduleData(prevData => {
      const updatedData = prevData.map(item =>
        item.id === id ? { ...item, yn: newYnStatus } : item
      );
      console.log('Data setelah update Y/N:', updatedData);
      return updatedData;
    });
  };

  return (
    <div className="space-y-8">
      {/* Judul Halaman */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Jadwal Admin</h1>

      {/* Bagian Tabel Jadwal */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Daftar Jadwal Maintenance</h2>
        
        {/* Search Bar (menggunakan komponen SearchBar) dan Tombol Edit */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Menggunakan komponen SearchBar yang sudah diimpor */}
          <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
          
          {/* Tombol Edit: Menggunakan ActionButton */}
          <ActionButton
            onClick={handleEditClick}
            icon={SquarePen}
            className="bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 focus:ring-gray-200"
          >
            Edit
          </ActionButton>
        </div>

        {/* Meneruskan currentItems dan handleToggleYn ke ScheduleTable */}
        <ScheduleTable currentItems={currentItems} onToggleYn={handleToggleYn} />

        {/* Meneruskan props paginasi ke Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Bagian Tambah Jadwal Aset */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Tambahkan Jadwal Aset</h2>
        {/* Meneruskan fungsi handleAddSchedule ke AddScheduleForm */}
        <AddScheduleForm onAddSchedule={handleAddSchedule} />
      </div>
    </div>
  );
};

export default JadwalPage;
