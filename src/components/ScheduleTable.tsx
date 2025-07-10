import React from 'react';

interface ScheduleItem {
  id: string | number;
  namaAset: string;
  lastMaintenance: string;
  nextMaintenance: string;
  keterangan: string;
  pic: string;
  status: 'Pending' | 'Terlambat' | 'Selesai' | 'Aman' | string; // string tambahan untuk fleksibilitas
}

interface ScheduleTableProps {
  currentItems: ScheduleItem[];
}

const ScheduleTable: React.FC<ScheduleTableProps> = ({ currentItems = [] }) => {
  const getStatusClasses = (status: string): string => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Terlambat':
        return 'bg-red-100 text-red-800';
      case 'Selesai':
        return 'bg-green-100 text-green-800';
      case 'Aman':
        return 'bg-blue-100 text-blue-800';
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
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.namaAset}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.lastMaintenance}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.nextMaintenance}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.keterangan}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.pic}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(item.status)}`}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
