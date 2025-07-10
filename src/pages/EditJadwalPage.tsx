import React, { useState, useEffect } from 'react'; // ✅ Import useEffect
import { useNavigate } from 'react-router-dom';
import EditableScheduleTable from '../components/EditableScheduleTable';
import ActionButton from '../components/ActionButton';
import { Search, Save, X } from 'lucide-react';
import Pagination from '../components/Pagination';

// Menerima scheduleData dan setScheduleData dari props
const EditJadwalPage = ({ scheduleData, setScheduleData }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // State untuk halaman saat ini
  const itemsPerPage = 5; // Jumlah baris per halaman
  
  // ✅ Inisialisasi localScheduleData dengan scheduleData.
  //    Menambahkan pengecekan Array.isArray() untuk memastikan selalu array.
  const [localScheduleData, setLocalScheduleData] = useState(Array.isArray(scheduleData) ? scheduleData : []); 

  // ✅ Gunakan useEffect untuk memperbarui localScheduleData jika prop scheduleData berubah.
  //    Ini penting jika scheduleData dapat berubah setelah komponen di-mount.
  useEffect(() => {
    if (Array.isArray(scheduleData)) {
      setLocalScheduleData(scheduleData);
    } else {
      // Log peringatan jika scheduleData bukan array, dan set ke array kosong sebagai fallback
      console.warn("EditJadwalPage: scheduleData prop is not an array, defaulting to empty array.", scheduleData);
      setLocalScheduleData([]);
    }
  }, [scheduleData]); // Bergantung pada scheduleData prop

  // Debugging logs untuk membantu melacak nilai dan tipe data
  console.log('EditJadwalPage Render - scheduleData prop:', scheduleData, 'Is Array:', Array.isArray(scheduleData));
  console.log('EditJadwalPage Render - localScheduleData state:', localScheduleData, 'Is Array:', Array.isArray(localScheduleData));


  // Filter data berdasarkan search term HANYA pada namaAset, sesuai dengan JadwalPage
  // ✅ Pengecekan defensif: pastikan localScheduleData adalah array sebelum memanggil filter
  const dataToFilter = Array.isArray(localScheduleData) ? localScheduleData : [];
  const filteredData = dataToFilter.filter(item =>
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

  const handleSave = () => {
    // Logika untuk menyimpan perubahan ke backend
    console.log('Changes saved!', localScheduleData); // Menggunakan localScheduleData terbaru
    setScheduleData(localScheduleData); // Memperbarui state global di App.jsx dengan data yang sudah diedit
    alert('Perubahan disimpan!');
    navigate('/admin/schedule'); // Kembali ke halaman jadwal setelah menyimpan
  };

  const handleCancel = () => {
    // Logika untuk membatalkan perubahan dan kembali
    alert('Perubahan Anda mungkin tidak tersimpan. Lanjutkan? (Logika batal akan diproses)');
    navigate('/admin/schedule'); // Kembali ke halaman jadwal tanpa menyimpan
  };

  // Fungsi untuk memperbarui data jadwal dari EditableScheduleTable
  // Menerima 'actionType' (misal: 'delete', 'update') dan argumen lainnya
  const handleScheduleDataChange = (actionType, id, field, newValue) => {
    if (actionType === 'delete') {
      setLocalScheduleData(prevData => {
        // Pastikan prevData adalah array sebelum memfilter
        const dataBeforeDelete = Array.isArray(prevData) ? prevData : [];
        const updatedData = dataBeforeDelete.filter(item => item.id !== id);
        console.log('handleScheduleDataChange - After delete, updatedData:', updatedData);
        // Jika halaman saat ini menjadi kosong setelah penghapusan dan bukan halaman pertama,
        // kembali ke halaman sebelumnya.
        if (updatedData.length > 0 && updatedData.length % itemsPerPage === 0 && currentPage > 1) {
          setCurrentPage(prevPage => prevPage - 1);
        }
        return updatedData;
      });
    } else if (actionType === 'update') {
      setLocalScheduleData(prevData => {
        // Pastikan prevData adalah array sebelum memetakan
        const dataBeforeUpdate = Array.isArray(prevData) ? prevData : [];
        const updatedData = dataBeforeUpdate.map(item =>
          item.id === id ? { ...item, [field]: newValue } : item
        );
        console.log('handleScheduleDataChange - After update, updatedData:', updatedData);
        return updatedData;
      });
    }
  };

  return (
    <div className="space-y-8 bg-white p-6 rounded-lg shadow-md">
      {/* Judul Halaman Edit */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Jadwal</h1>

      {/* Kontainer untuk Search Bar dan Tombol Aksi */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        {/* Search Bar */}
        <div className="relative w-full sm:w-1/2 lg:w-1/3">
          <input
            type="text"
            placeholder="Cari..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400 bg-purple-50 bg-opacity-30"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none h-full w-5 text-gray-400" />
        </div>

        {/* Tombol Aksi (Simpan dan Batal) */}
        <div className="flex space-x-4 w-full sm:w-auto justify-end">
          {/* Tombol Simpan */}
          <ActionButton
            onClick={handleSave}
            icon={Save} // Ikon Simpan
            className="bg-[#0600d4] text-white hover:bg-[#0500a0] focus:ring-[#0600d4] focus:ring-opacity-50"
          >
            Simpan
          </ActionButton>
          
          {/* Tombol Batal */}
          <ActionButton
            onClick={handleCancel}
            icon={X} // Ikon Batal
            className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-200"
          >
            Batal
          </ActionButton>
        </div>
      </div>

      {/* Tabel Jadwal yang Dapat Diedit */}
      <div>
        <EditableScheduleTable
          searchTerm={searchTerm}
          data={currentItems} // Meneruskan data yang sudah dipaginasi
          onDataChange={handleScheduleDataChange} // Meneruskan fungsi untuk memperbarui state lokal
        />
      </div>

      {/* Meneruskan props paginasi ke Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default EditJadwalPage;
