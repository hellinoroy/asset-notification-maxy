<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class HistoriSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('histori')->insert([
            ['id' => 1, 'histori_tanggal' => Carbon::now()->subDays(5), 'histori_keterangan' => 'Service rutin laptop'],
            ['id' => 2, 'histori_tanggal' => Carbon::now()->subDays(4), 'histori_keterangan' => 'Service printer canon'],
            ['id' => 3, 'histori_tanggal' => Carbon::now()->subDays(3), 'histori_keterangan' => 'Kalibrasi proyektor'],
            ['id' => 4, 'histori_tanggal' => Carbon::now()->subDays(2), 'histori_keterangan' => 'Perbaikan AC ruang meeting'],
            ['id' => 5, 'histori_tanggal' => Carbon::now()->subDays(1), 'histori_keterangan' => 'Pembersihan kamera'],
        ]);
    }
}