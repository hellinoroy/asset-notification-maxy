import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditableScheduleTable from '../components/EditableScheduleTable';
import ActionButton from '../components/ActionButton';
import { Search, Save, X } from 'lucide-react';
import Pagination from '../components/Pagination';

// Tipe data untuk satu entri jadwal
interface ScheduleItem {
  id: string;
  namaAset: string;
  lastMaintenance: string;
  nextMaintenance: string;
  keterangan: string;
  pic: string;
  status: string;
  yn: boolean;
}

// Tipe props untuk komponen
interface EditJadwalPageProps {
  scheduleData: ScheduleItem[];
  setScheduleData: (data: ScheduleItem[]) => void;
}

const EditJadwalPage: React.FC<EditJadwalPageProps> = ({ scheduleData, setScheduleData }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [localScheduleData, setLocalScheduleData] = useState<ScheduleItem[]>(
    Array.isArray(scheduleData) ? scheduleData : []
  );

  useEffect(() => {
    if (Array.isArray(scheduleData)) {
      setLocalScheduleData(scheduleData);
    } else {
      console.warn("EditJadwalPage: scheduleData prop is not an array, defaulting to empty array.", scheduleData);
      setLocalScheduleData([]);
    }
  }, [scheduleData]);

  const filteredData = localScheduleData.filter((item) =>
    item.namaAset?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSave = () => {
    setScheduleData(localScheduleData);
    alert('Perubahan disimpan!');
    navigate('/admin/schedule');
  };

  const handleCancel = () => {
    alert('Perubahan Anda mungkin tidak tersimpan. Lanjutkan?');
    navigate('/admin/schedule');
  };

  const handleScheduleDataChange = (
  actionType: 'delete' | 'update',
  id: string | number, // <-- ini yang diubah
  field?: keyof ScheduleItem,
  newValue?: any
) => {

    if (actionType === 'delete') {
      setLocalScheduleData((prevData) => {
        const updatedData = prevData.filter((item) => item.id !== id);
        if (updatedData.length > 0 && updatedData.length % itemsPerPage === 0 && currentPage > 1) {
          setCurrentPage((prevPage) => prevPage - 1);
        }
        return updatedData;
      });
    } else if (actionType === 'update' && field) {
      setLocalScheduleData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, [field]: newValue } : item
        )
      );
    }
  };

  return (
    <div className="space-y-8 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Jadwal</h1>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
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

        <div className="flex space-x-4 w-full sm:w-auto justify-end">
          <ActionButton
            onClick={handleSave}
            icon={Save}
            className="bg-[#0600d4] text-white hover:bg-[#0500a0] focus:ring-[#0600d4] focus:ring-opacity-50"
          >
            Simpan
          </ActionButton>

          <ActionButton
            onClick={handleCancel}
            icon={X}
            className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-200"
          >
            Batal
          </ActionButton>
        </div>
      </div>

      <div>
        <EditableScheduleTable
          searchTerm={searchTerm}
          data={currentItems}
          onDataChange={handleScheduleDataChange}
        />
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default EditJadwalPage;
