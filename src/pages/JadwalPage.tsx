import React, { useState } from 'react';
import ScheduleTable from '../components/ScheduleTable';
import AddScheduleForm from '../components/AddScheduleForm';
import Pagination from '../components/Pagination';
import { SquarePen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ActionButton from '../components/ActionButton';
import SearchBar from '../components/SearchBar';

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

interface JadwalPageProps {
  scheduleData: ScheduleItem[];
  setScheduleData: React.Dispatch<React.SetStateAction<ScheduleItem[]>>;
}

const JadwalPage: React.FC<JadwalPageProps> = ({ scheduleData, setScheduleData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const filteredData = scheduleData.filter(item =>
    item.namaAset?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleEditClick = () => {
    navigate('/admin/schedule/edit');
  };

  const handleAddSchedule = (newSchedule: ScheduleItem) => {
    setScheduleData(prevData => {
      const existingItemIndex = prevData.findIndex(item => item.id === newSchedule.id);

      if (existingItemIndex > -1) {
        const existingItem = prevData[existingItemIndex];
        const updatedItem: ScheduleItem = {
          ...existingItem,
          ...newSchedule,
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
        alert('Jadwal baru berhasil ditambahkan!');
        return [...prevData, newSchedule];
      }
    });

    setCurrentPage(1);
  };

  const handleToggleYn = (id: string, newYnStatus: boolean) => {
    setScheduleData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, yn: newYnStatus } : item
      )
    );
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Jadwal Admin</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Daftar Jadwal Maintenance</h2>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
          <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />

          <ActionButton
            onClick={handleEditClick}
            icon={SquarePen}
            className="bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 focus:ring-gray-200"
          >
            Edit
          </ActionButton>
        </div>

        <ScheduleTable currentItems={currentItems}  />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Tambahkan Jadwal Aset</h2>
        <AddScheduleForm onAddSchedule={handleAddSchedule} />
      </div>
    </div>
  );
};

export default JadwalPage;
