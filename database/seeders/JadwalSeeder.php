<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class JadwalSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('jadwal')->insert([
            ['aset_id' => 1, 'id' => 1, 'jadwal_tanggal' => Carbon::now()->addDays(1), 'jadwal_keterangan' => 'Pemeriksaan rutin', 'jadwal_status' => 'Aman'],
            ['aset_id' => 2, 'id' => 2, 'jadwal_tanggal' => Carbon::now()->addDays(2), 'jadwal_keterangan' => 'Servis berkala', 'jadwal_status' => 'Aman'],
            ['aset_id' => 3, 'id' => 3, 'jadwal_tanggal' => Carbon::now()->addDays(3), 'jadwal_keterangan' => 'Kalibrasi alat', 'jadwal_status' => 'Aman'],
            ['aset_id' => 4, 'id' => 4, 'jadwal_tanggal' => Carbon::now()->addDays(4), 'jadwal_keterangan' => 'Pembersihan AC', 'jadwal_status' => 'Aman'],
            ['aset_id' => 5, 'id' => 5, 'jadwal_tanggal' => Carbon::now()->addDays(5), 'jadwal_keterangan' => 'Pengecekan kamera', 'jadwal_status' => 'Aman'],
        ]);
    }
}