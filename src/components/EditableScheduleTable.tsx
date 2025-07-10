import React from 'react';
import { Trash2 } from 'lucide-react';

// Tipe untuk satu item jadwal
interface ScheduleItem {
  id: number | string;
  namaAset: string;
  lastMaintenance: string;
  nextMaintenance: string;
  keterangan: string;
  pic: string;
  status: string;
}

// Tipe aksi update atau delete
type ActionType = 'update' | 'delete';

// Tipe fungsi onDataChange
type OnDataChange = (
  action: ActionType,
  id: ScheduleItem['id'],
  field?: keyof ScheduleItem,
  value?: string
) => void;

// Props komponen
interface EditableScheduleTableProps {
  searchTerm: string;
  data: ScheduleItem[];
  onDataChange: OnDataChange;
}

// Fungsi bantu untuk format tanggal ke YYYY-MM-DD
const formatDateForInput = (dateString: string): string => {
  if (!dateString || dateString === '-') return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Komponen utama
const EditableScheduleTable: React.FC<EditableScheduleTableProps> = ({
  searchTerm,
  data,
  onDataChange
}) => {
  const STATUS_OPTIONS = ['Aman', 'Maintenance', 'Pending', 'Selesai', 'Terlambat'];

  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: ScheduleItem['id'],
    field: keyof ScheduleItem
  ) => {
    const newValue = e.target.value;
    onDataChange('update', id, field, newValue);
  };

  const handleDeleteRow = (id: ScheduleItem['id']) => {
    alert('Apakah Anda yakin ingin menghapus baris ini? (Baris akan dihapus)');
    onDataChange('delete', id);
  };

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Terlambat':
        return 'bg-red-100 text-red-800';
      case 'Selesai':
        return 'bg-green-100 text-green-800';
      case 'Aman':
        return 'bg-gray-100 text-gray-800';
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Aset</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Maintenance</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Next Maintenance</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Keterangan</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PIC</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hapus</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
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
                <span className={`inline-flex items-center justify-center w-full rounded-full px-2 py-1 ${getStatusClasses(item.status)}`}>
                  <select
                    value={item.status}
                    onChange={(e) => handleInputChange(e, item.id, 'status')}
                    className="w-full bg-transparent border-none focus:ring-0 appearance-none cursor-pointer text-current"
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
