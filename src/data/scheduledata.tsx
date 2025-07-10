// src/data/scheduleData.ts

export interface ScheduleItem {
  id: string;
  namaAset: string;
  lastMaintenance: string;
  nextMaintenance: string;
  keterangan: string;
  pic: string;
  status: 'Pending' | 'Terlambat' | 'Selesai' | 'Aman' | string;
  yn: boolean;
}

const INITIAL_SCHEDULE_DATA: ScheduleItem[] = [
  { id: 'MBL01', namaAset: 'Mobil Honda HRV', lastMaintenance: '2024-11-23', nextMaintenance: '2025-04-25', keterangan: 'Ganti oli', pic: 'Budi', status: 'Pending', yn: true },
  { id: 'PRN01', namaAset: 'Printer Epson L3250', lastMaintenance: '-', nextMaintenance: '2025-11-25', keterangan: 'Servis mesin', pic: 'Doni', status: 'Pending', yn: false },
  { id: 'AC01', namaAset: 'AC Split Panasonic 1PK', lastMaintenance: '2024-06-01', nextMaintenance: '2024-12-27', keterangan: 'Pending serv...', pic: 'Nina', status: 'Terlambat', yn: true },
  { id: 'GEN01', namaAset: 'Genset 5000 Watt', lastMaintenance: '2025-07-12', nextMaintenance: '2025-07-12', keterangan: 'Maintenance b...', pic: 'Riko', status: 'Pending', yn: false },
  { id: 'TRK01', namaAset: 'Truk Pengangkut', lastMaintenance: '2024-01-12', nextMaintenance: '2024-07-25', keterangan: 'Ganti ban dan...', pic: 'Budi', status: 'Selesai', yn: true },
  { id: 'PRJ01', namaAset: 'Proyektor Epson X122', lastMaintenance: '-', nextMaintenance: '2024-05-08', keterangan: 'Ganti kabel', pic: 'Agus', status: 'Aman', yn: true },
  { id: 'CMR01', namaAset: 'CCTV Indoor Hikvision', lastMaintenance: '2024-07-23', nextMaintenance: '2024-07-23', keterangan: 'Perbaikan ker...', pic: 'Sinta', status: 'Aman', yn: true },
  { id: 'KMR01', namaAset: 'Kamera Canon EOS M50', lastMaintenance: '-', nextMaintenance: '2024-07-03', keterangan: 'Ganti lensa b...', pic: 'Doni', status: 'Aman', yn: true },
  { id: 'LMP01', namaAset: 'Lampu Emergency LED', lastMaintenance: '2024-11-23', nextMaintenance: '2025-02-06', keterangan: 'Cadangan mati...', pic: 'Budi', status: 'Pending', yn: false },
  { id: 'MTR01', namaAset: 'Mesin Absensi Sidik Jari', lastMaintenance: '2024-11-23', nextMaintenance: '-', keterangan: 'Servis mesin', pic: '-', status: 'Selesai', yn: true },
  { id: 'FAN01', namaAset: 'Kipas Angin Industri', lastMaintenance: '2024-01-01', nextMaintenance: '2025-01-01', keterangan: 'Pembersihan', pic: 'Andi', status: 'Pending', yn: false },
  { id: 'KUL01', namaAset: 'Kulkas Samsung', lastMaintenance: '2024-02-15', nextMaintenance: '2025-02-15', keterangan: 'Pengecekan freon', pic: 'Santi', status: 'Aman', yn: true },
  { id: 'TV01', namaAset: 'TV LED LG', lastMaintenance: '2024-03-10', nextMaintenance: '2025-03-10', keterangan: 'Perbaikan layar', pic: 'Budi', status: 'Terlambat', yn: false },
  { id: 'MES01', namaAset: 'Mesin Cuci Otomatis', lastMaintenance: '2024-04-20', nextMaintenance: '2025-04-20', keterangan: 'Penggantian sparepart', pic: 'Doni', status: 'Selesai', yn: true },
  { id: 'KOM01', namaAset: 'Komputer Desktop', lastMaintenance: '2024-05-05', nextMaintenance: '2025-05-05', keterangan: 'Upgrade RAM', pic: 'Nina', status: 'Pending', yn: false },
  { id: 'POM01', namaAset: 'Pompa Air', lastMaintenance: '2024-06-15', nextMaintenance: '2025-06-15', keterangan: 'Perbaikan motor', pic: 'Riko', status: 'Aman', yn: true },
  { id: 'TAB01', namaAset: 'Tabung Gas', lastMaintenance: '2024-07-25', nextMaintenance: '2025-07-25', keterangan: 'Pengisian ulang', pic: 'Agus', status: 'Pending', yn: false },
  { id: 'GRD01', namaAset: 'Gerinda Tangan', lastMaintenance: '2024-08-01', nextMaintenance: '2025-08-01', keterangan: 'Penggantian mata pisau', pic: 'Sinta', status: 'Selesai', yn: true },
  { id: 'BOR01', namaAset: 'Bor Listrik', lastMaintenance: '2024-09-10', nextMaintenance: '2025-09-10', keterangan: 'Perbaikan kabel', pic: 'Doni', status: 'Aman', yn: true },
  { id: 'LAS01', namaAset: 'Mesin Las', lastMaintenance: '2024-10-20', nextMaintenance: '2025-10-20', keterangan: 'Pembersihan', pic: 'Budi', status: 'Pending', yn: false },
];

export default INITIAL_SCHEDULE_DATA;
