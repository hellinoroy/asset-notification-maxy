<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function index(Request $request): Response
    {
        // DATA DUMMY (gantilah dengan query database asli)
        $reports = collect([
            ['id' => 'MBL01', 'nama_aset' => 'Mobil Honda HRV', 'harga_maintenance' => 389000, 'next_maintenance' => 'Kam, 25 Apr 2025', 'keterangan' => 'Ganti oli', 'pic' => 'Budi', 'status' => 'Pending'],
            ['id' => 'MBL01', 'nama_aset' => 'Printer Epson L3250', 'harga_maintenance' => 389000, 'next_maintenance' => 'Sab, 25 Mar 2025', 'keterangan' => 'Ganti oli', 'pic' => 'Doni', 'status' => 'Pending'],
            ['id' => 'MBL01', 'nama_aset' => 'AC Split Panasonic 1PK', 'harga_maintenance' => 389000, 'next_maintenance' => 'Sel, 27 Des 2024', 'keterangan' => 'Ganti oli', 'pic' => 'Nina', 'status' => 'Terlambat'],
            ['id' => 'MBL01', 'nama_aset' => 'Genset 5000 Watt', 'harga_maintenance' => 389000, 'next_maintenance' => 'Rabu, 12 Jul 2024', 'keterangan' => 'Ganti oli', 'pic' => 'Riko', 'status' => 'Pending'],
            ['id' => 'MBL01', 'nama_aset' => 'Truk Pengangkut', 'harga_maintenance' => 389000, 'next_maintenance' => 'Sab, 25 Jul 2025', 'keterangan' => 'Ganti oli', 'pic' => 'Budi', 'status' => 'Pending'],
            ['id' => 'MBL01', 'nama_aset' => 'Proyektor Epson X123', 'harga_maintenance' => 389000, 'next_maintenance' => 'Kam, 08 Mei 2024', 'keterangan' => 'Ganti oli', 'pic' => 'Agus', 'status' => 'Selesai'],
            ['id' => 'MBL01', 'nama_aset' => 'CCTV Indoor Hikvision', 'harga_maintenance' => 389000, 'next_maintenance' => 'Kam, 23 Jul 2024', 'keterangan' => 'Ganti oli', 'pic' => 'Sinta', 'status' => 'Aman'],
            ['id' => 'MBL01', 'nama_aset' => 'Kamera Canon EOS M50', 'harga_maintenance' => 389000, 'next_maintenance' => 'Sab, 03 Jul 2024', 'keterangan' => 'Ganti oli', 'pic' => 'Doni', 'status' => 'Aman'],
        ]);

        return Inertia::render('Laporan/Index', [
            'stats' => [
                'totalMaintenance' => 25,
                'menungguLaporan' => 5,
            ],
            // Data untuk donut chart
            'chartData' => [
                'labels' => ['Aman', 'Selesai', 'Pending', 'Terlambat'],
                'datasets' => [
                    'data' => [18, 2, 4, 1],
                    'backgroundColor' => ['#4CAF50', '#2196F3', '#FFC107', '#F44336'],
                ],
            ],
            // Data untuk tabel, bisa ditambahkan paginasi dan filter
            'reports' => $reports,
            'filters' => $request->only(['search']),
        ]);
    }
}