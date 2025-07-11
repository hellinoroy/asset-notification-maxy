import React from 'react';

interface AssetItem {
  id: string;
  namaAset: string;
  tanggalBeli: string;
  keterangan: string;
  lastMaintenance: string;
  nextMaintenance: string;
  pic: string;
}

interface AssetTableProps {
  data: AssetItem[];
}

const AssetTable: React.FC<AssetTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
      <table className="min-w-full text-lg sm:text-xl text-left border border-gray-300">
        <thead>
          <tr className="bg-indigo-100 text-gray-800">
            <th className="px-6 py-4 border">ID</th>
            <th className="px-6 py-4 border">Nama Aset</th>
            <th className="px-6 py-4 border">Tanggal Beli</th>
            <th className="px-6 py-4 border">Keterangan</th>
            <th className="px-6 py-4 border">Last Maintenance</th>
            <th className="px-6 py-4 border">Next Maintenance</th>
            <th className="px-6 py-4 border">Next PIC</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="px-6 py-4 border">{item.id}</td>
              <td className="px-6 py-4 border">{item.namaAset}</td>
              <td className="px-6 py-4 border">{item.tanggalBeli}</td>
              <td className="px-6 py-4 border">{item.keterangan}</td>
              <td className="px-6 py-4 border">{item.lastMaintenance}</td>
              <td className="px-6 py-4 border">{item.nextMaintenance}</td>
              <td className="px-6 py-4 border">{item.pic}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetTable;
