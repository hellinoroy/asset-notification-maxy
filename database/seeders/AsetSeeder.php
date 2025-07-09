<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AsetSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('aset')->insert([
            ['aset_nomor' => 'AST001', 'aset_nama' => 'Laptop Asus', 'aset_tahun_beli' => '2022', 'aset_keterangan' => 'Bagus'],
            ['aset_nomor' => 'AST002', 'aset_nama' => 'Printer Canon', 'aset_tahun_beli' => '2021', 'aset_keterangan' => 'Sering error'],
            ['aset_nomor' => 'AST003', 'aset_nama' => 'Proyektor BenQ', 'aset_tahun_beli' => '2023', 'aset_keterangan' => 'Baru'],
            ['aset_nomor' => 'AST004', 'aset_nama' => 'AC LG', 'aset_tahun_beli' => '2020', 'aset_keterangan' => 'Butuh servis'],
            ['aset_nomor' => 'AST005', 'aset_nama' => 'Kamera DSLR', 'aset_tahun_beli' => '2022', 'aset_keterangan' => 'Masih bagus'],
            ['aset_nomor' => 'AST006', 'aset_nama' => 'Monitor Samsung', 'aset_tahun_beli' => '2021', 'aset_keterangan' => 'Rusak ringan'],
            ['aset_nomor' => 'AST007', 'aset_nama' => 'Keyboard Mechanical', 'aset_tahun_beli' => '2023', 'aset_keterangan' => 'Normal'],
            ['aset_nomor' => 'AST008', 'aset_nama' => 'Scanner', 'aset_tahun_beli' => '2019', 'aset_keterangan' => 'Lambat'],
            ['aset_nomor' => 'AST009', 'aset_nama' => 'Speaker Bluetooth', 'aset_tahun_beli' => '2020', 'aset_keterangan' => 'Bass bagus'],
            ['aset_nomor' => 'AST010', 'aset_nama' => 'Laptop Lenovo', 'aset_tahun_beli' => '2022', 'aset_keterangan' => 'Untuk desain'],
            ['aset_nomor' => 'AST011', 'aset_nama' => 'Mouse Wireless', 'aset_tahun_beli' => '2021', 'aset_keterangan' => null],
            ['aset_nomor' => 'AST012', 'aset_nama' => 'Webcam Logitech', 'aset_tahun_beli' => '2020', 'aset_keterangan' => 'HD'],
            ['aset_nomor' => 'AST013', 'aset_nama' => 'TV Ruang Meeting', 'aset_tahun_beli' => '2018', 'aset_keterangan' => 'Ukuran besar'],
            ['aset_nomor' => 'AST014', 'aset_nama' => 'Tablet Samsung', 'aset_tahun_beli' => '2022', 'aset_keterangan' => 'Untuk notulensi'],
            ['aset_nomor' => 'AST015', 'aset_nama' => 'Modem Indihome', 'aset_tahun_beli' => '2021', 'aset_keterangan' => 'Wifi aktif'],
        ]);
    }
}