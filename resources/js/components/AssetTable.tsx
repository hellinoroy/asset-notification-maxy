import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface AssetItem {
  id: string;
  namaAset: string;
  tanggalBeli: string;
  keterangan: string;
  lastMaintenance: string;
  nextMaintenance: string;
  pic: string;
  user?: { id: number }; // include if needed for matching
}

interface User {
  id: number;
  name: string;
  role: string;
}

interface AssetTableProps {
  data: AssetItem[];
  handleUpdate: (id: string) => void;
  handleDelete: (id: string) => void;
}

const AssetTable: React.FC<AssetTableProps> = ({ data, handleUpdate, handleDelete }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get('/api/user', { withCredentials: true });
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    }

    fetchUser();
  }, []);

  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow-lg">
      <table className="min-w-full border border-gray-300 text-left text-lg sm:text-xl">
        <thead>
          <tr className="bg-indigo-100 text-gray-800">
            <th className="border px-6 py-4">ID</th>
            <th className="border px-6 py-4">Nama Aset</th>
            <th className="border px-6 py-4">Tanggal Beli</th>
            <th className="border px-6 py-4">Keterangan</th>
            <th className="border px-6 py-4">Last Maintenance</th>
            <th className="border px-6 py-4">Next Maintenance</th>
            <th className="border px-6 py-4">Next PIC</th>
            {user?.role === 'Admin' && <th className="border px-6 py-4 text-center">Opsi</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="border px-6 py-4">{item.id}</td>
              <td className="border px-6 py-4">{item.namaAset}</td>
              <td className="border px-6 py-4">{item.tanggalBeli}</td>
              <td className="border px-6 py-4">{item.keterangan}</td>
              <td className="border px-6 py-4">{item.lastMaintenance}</td>
              <td className="border px-6 py-4">{item.nextMaintenance}</td>
              <td className="border px-6 py-4">{item.pic}</td>
              {user?.role === 'Admin' && (
                <td className="flex flex-row justify-center px-6 py-4 text-sm whitespace-nowrap flex-row justify-center items-center">
                  <button
                    onClick={() => handleUpdate(item.id)}
                    className="mr-2 rounded bg-green-500 px-3 py-1 text-xs text-white hover:bg-green-600"
                  >
                    Selesai
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="rounded bg-red-600 px-3 py-1 text-xs text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetTable;
