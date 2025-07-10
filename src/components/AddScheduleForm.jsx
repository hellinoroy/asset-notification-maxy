import React, { useState } from 'react';
import InputField from './InputField';
import PrimaryButton from './PrimaryButton';

// Menerima prop 'onAddSchedule' dari parent
const AddScheduleForm = ({ onAddSchedule }) => {
  const [id, setId] = useState('');
  const [assetName, setAssetName] = useState('');
  const [nextMaintenanceDate, setNextMaintenanceDate] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [pic, setPic] = useState('');

  const DUMMY_ASSET_OPTIONS = [
    { value: '', label: 'Pilih Nama Aset' },
    { value: 'MBL01', label: 'Mobil Honda HRV' },
    { value: 'PRN01', label: 'Printer Epson L3250' },
    { value: 'AC01', label: 'AC Split Panasonic 1PK' },
    { value: 'GEN01', label: 'Genset 5000 Watt' },
    { value: 'TRK01', label: 'Truk Pengangkut' },
  ];

  const DUMMY_PIC_OPTIONS = [
    { value: '', label: 'Pilih PIC' },
    { value: 'Budi', label: 'Budi' },
    { value: 'Doni', label: 'Doni' },
    { value: 'Nina', label: 'Nina' },
    { value: 'Riko', label: 'Riko' },
    { value: 'Agus', label: 'Agus' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (!id || !assetName || !nextMaintenanceDate || !keterangan || !pic) {
      alert('Mohon lengkapi semua kolom untuk menambahkan jadwal.');
      return;
    }

    const newSchedule = {
      id,
      namaAset: assetName, // Sesuaikan dengan nama properti di scheduleData
      lastMaintenance: '-', // Default untuk data baru
      nextMaintenance: nextMaintenanceDate,
      keterangan,
      pic,
      status: 'Pending', // Default status untuk jadwal baru
      yn: false, // Default yn untuk jadwal baru
    };

    // Panggil fungsi onAddSchedule yang diterima dari parent
    if (onAddSchedule) {
      onAddSchedule(newSchedule);
      alert('Jadwal baru berhasil ditambahkan!');
      // Reset form setelah submit berhasil
      setId('');
      setAssetName('');
      setNextMaintenanceDate('');
      setKeterangan('');
      setPic('');
    } else {
      console.error("onAddSchedule prop is not provided to AddScheduleForm.");
      alert('Terjadi kesalahan saat menambahkan jadwal. Mohon coba lagi.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      

      {/* Kontainer utama untuk header dan input fields, menyerupai tabel */}
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {/* Header Row */}
        <div className="flex bg-purple-100 text-gray-700 font-semibold text-sm py-3 px-4">
          <div className="flex-1 text-left">ID</div>
          <div className="flex-1 text-left">Nama Aset</div>
          <div className="flex-1 text-left">Next Maintenance</div>
          <div className="flex-1 text-left">Keterangan</div>
          <div className="flex-1 text-left">PIC</div>
        </div>

        {/* Input Row */}
        <div className="flex bg-purple-50 py-3 px-4 items-center space-x-2"> {/* Menambahkan space-x-2 untuk jarak antar kolom */}
          {/* ID */}
          <div className="flex-1">
            <InputField
              id="schedule-id"
              type="text"
              placeholder="ID..."
              value={id}
              onChange={(e) => setId(e.target.value)}
              // Override styling InputField agar transparan dan tanpa border
              className="bg-transparent border-none focus:ring-0 px-0 py-0" // px-0 py-0 untuk padding minimal
            />
          </div>

          {/* Nama Aset (Dropdown) */}
          <div className="flex-1">
            <select
              id="asset-name"
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              // Override styling select agar transparan dan tanpa border
              className="w-full bg-transparent border-none focus:ring-0 text-gray-700 text-base px-0 py-0" // px-0 py-0 untuk padding minimal
            >
              {DUMMY_ASSET_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          {/* Next Maintenance (Date Picker) */}
          <div className="flex-1">
            <InputField
              id="next-maintenance-date"
              type="date"
              value={nextMaintenanceDate}
              onChange={(e) => setNextMaintenanceDate(e.target.value)}
              // Override styling InputField agar transparan dan tanpa border
              className="bg-transparent border-none focus:ring-0 px-0 py-0" // px-0 py-0 untuk padding minimal
            />
          </div>

          {/* Keterangan (InputField type="text") */}
          <div className="flex-1">
            <InputField
              id="keterangan"
              type="text" // Mengubah dari textarea menjadi input type="text"
              placeholder="Keterangan..."
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              // Override styling InputField agar transparan dan tanpa border
              className="bg-transparent border-none focus:ring-0 px-0 py-0" // px-0 py-0 untuk padding minimal
            />
          </div>

          {/* PIC (Dropdown) */}
          <div className="flex-1">
            <select
              id="pic"
              value={pic}
              onChange={(e) => setPic(e.target.value)}
              // Override styling select agar transparan dan tanpa border
              className="w-full bg-transparent border-none focus:ring-0 text-gray-700 text-base px-0 py-0" // px-0 py-0 untuk padding minimal
            >
              {DUMMY_PIC_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tombol Kirim */}
      <div className="flex justify-end mt-6">
        <PrimaryButton type="submit" className="px-8 py-3">
          Kirim
        </PrimaryButton>
      </div>
    </form>
  );
};

export default AddScheduleForm;
