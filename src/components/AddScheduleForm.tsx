import React, { useState } from 'react';
import InputField from './InputField';
import PrimaryButton from './PrimaryButton';

// Tipe data untuk satu item jadwal
export interface ScheduleItem {
  id: string;
  namaAset: string;
  lastMaintenance: string;
  nextMaintenance: string;
  keterangan: string;
  pic: string;
  status: string;
  yn: boolean;
}

// Props untuk komponen ini
interface AddScheduleFormProps {
  onAddSchedule: (newSchedule: ScheduleItem) => void;
}

const AddScheduleForm: React.FC<AddScheduleFormProps> = ({ onAddSchedule }) => {
  const [id, setId] = useState<string>('');
  const [assetName, setAssetName] = useState<string>('');
  const [nextMaintenanceDate, setNextMaintenanceDate] = useState<string>('');
  const [keterangan, setKeterangan] = useState<string>('');
  const [pic, setPic] = useState<string>('');

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id || !assetName || !nextMaintenanceDate || !keterangan || !pic) {
      alert('Mohon lengkapi semua kolom untuk menambahkan jadwal.');
      return;
    }

    const newSchedule: ScheduleItem = {
      id,
      namaAset: assetName,
      lastMaintenance: '-',
      nextMaintenance: nextMaintenanceDate,
      keterangan,
      pic,
      status: 'Pending',
      yn: false,
    };

    onAddSchedule(newSchedule);

    alert('Jadwal baru berhasil ditambahkan!');
    setId('');
    setAssetName('');
    setNextMaintenanceDate('');
    setKeterangan('');
    setPic('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="flex bg-purple-100 text-gray-700 font-semibold text-sm py-3 px-4">
          <div className="flex-1 text-left">ID</div>
          <div className="flex-1 text-left">Nama Aset</div>
          <div className="flex-1 text-left">Next Maintenance</div>
          <div className="flex-1 text-left">Keterangan</div>
          <div className="flex-1 text-left">PIC</div>
        </div>

        <div className="flex bg-purple-50 py-3 px-4 items-center space-x-2">
          <div className="flex-1">
            <InputField
              id="schedule-id"
              type="text"
              placeholder="ID..."
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="bg-transparent border-none focus:ring-0 px-0 py-0"
            />
          </div>

          <div className="flex-1">
            <select
              id="asset-name"
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              className="w-full bg-transparent border-none focus:ring-0 text-gray-700 text-base px-0 py-0"
            >
              {DUMMY_ASSET_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <InputField
              id="next-maintenance-date"
              type="date"
              value={nextMaintenanceDate}
              onChange={(e) => setNextMaintenanceDate(e.target.value)}
              className="bg-transparent border-none focus:ring-0 px-0 py-0"
            />
          </div>

          <div className="flex-1">
            <InputField
              id="keterangan"
              type="text"
              placeholder="Keterangan..."
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              className="bg-transparent border-none focus:ring-0 px-0 py-0"
            />
          </div>

          <div className="flex-1">
            <select
              id="pic"
              value={pic}
              onChange={(e) => setPic(e.target.value)}
              className="w-full bg-transparent border-none focus:ring-0 text-gray-700 text-base px-0 py-0"
            >
              {DUMMY_PIC_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <PrimaryButton type="submit" className="px-8 py-3">
          Kirim
        </PrimaryButton>
      </div>
    </form>
  );
};

export default AddScheduleForm;
