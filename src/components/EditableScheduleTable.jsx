import React from 'react';
import { Trash2 } from 'lucide-react'; // Impor ikon Trash2 untuk tombol hapus

// Helper function to format date string to YYYY-MM-DD for input type="date"
const formatDateForInput = (dateString) => {
  if (!dateString || dateString === '-') return ''; // Handle empty or '-' dates

  // Attempt to parse common date formats.
  // For "Sab, 23 Nov 2024", new Date() should generally work.
  const date = new Date(dateString);

  // Check if the date is valid after parsing
  if (isNaN(date.getTime())) {
    return ''; // Return empty string if the date string is not a valid date
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Definisi komponen EditableScheduleTable
// 'onDataChange' sekarang akan menerima ID item yang dihapus
const EditableScheduleTable = ({ searchTerm, data, onDataChange }) => {
  // Opsi untuk dropdown Status
  const STATUS_OPTIONS = ['Aman', 'Maintenance', 'Pending', 'Selesai', 'Terlambat'];

  // Filter data berdasarkan search term
  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleInputChange = (e, id, field) => {
    const newValue = e.target.value;
    const updatedData = filteredData.map(item => // Gunakan filteredData di sini
      item.id === id ? { ...item, [field]: newValue } : item
    );
    // Ketika input berubah, kita perlu menggabungkan kembali perubahan ini ke data penuh
    // Ini akan ditangani di EditJadwalPage melalui onDataChange
    onDataChange('update', id, field, newValue); // ✅ Mengirimkan tipe aksi, ID, field, dan nilai baru
  };

  const handleDeleteRow = (id) => {
    alert('Apakah Anda yakin ingin menghapus baris ini? (Baris akan dihapus)');
    onDataChange('delete', id); // ✅ Hanya mengirimkan tipe aksi dan ID item yang akan dihapus
  };

  // Helper function for status classes
  const getStatusClasses = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Terlambat':
        return 'bg-red-100 text-red-800';
      case 'Selesai':
        return 'bg-green-100 text-green-800';
      case 'Aman':
        return 'bg-gray-100 text-gray-800'; // Mengubah Aman menjadi abu-abu
      case 'Maintenance':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Aset</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Maintenance</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Maintenance</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keterangan</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PIC</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hapus</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                <input
                  type="text"
                  value={item.namaAset}
                  onChange={(e) => handleInputChange(e, item.id, 'namaAset')}
                  className="w-full bg-transparent border-none focus:ring-0"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                <input
                  type="date"
                  value={formatDateForInput(item.lastMaintenance)}
                  onChange={(e) => handleInputChange(e, item.id, 'lastMaintenance')}
                  className="w-full bg-transparent border-none focus:ring-0"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                <input
                  type="date"
                  value={formatDateForInput(item.nextMaintenance)}
                  onChange={(e) => handleInputChange(e, item.id, 'nextMaintenance')}
                  className="w-full bg-transparent border-none focus:ring-0"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                <input
                  type="text"
                  value={item.keterangan}
                  onChange={(e) => handleInputChange(e, item.id, 'keterangan')}
                  className="w-full bg-transparent border-none focus:ring-0"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                <input
                  type="text"
                  value={item.pic}
                  onChange={(e) => handleInputChange(e, item.id, 'pic')}
                  className="w-full bg-transparent border-none focus:ring-0"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {/* Membungkus select dengan span untuk styling background */}
                <span className={`inline-flex items-center justify-center w-full rounded-full px-2 py-1 text-center ${getStatusClasses(item.status)}`}>
                  <select
                    value={item.status}
                    onChange={(e) => handleInputChange(e, item.id, 'status')}
                    className={`w-full bg-transparent border-none focus:ring-0 appearance-none cursor-pointer text-current`}
                  >
                    {STATUS_OPTIONS.map(option => (
                      <option key={option} value={option} className="bg-white text-gray-900">
                        {option}
                      </option>
                    ))}
                  </select>
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                <button
                  onClick={() => handleDeleteRow(item.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditableScheduleTable;
