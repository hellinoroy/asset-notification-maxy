<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AsetJadwalSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('aset_jadwal')->insert([
            ['aset_id' => 1, 'jadwal_id' => 1],
            ['aset_id' => 2, 'jadwal_id' => 2],
            ['aset_id' => 3, 'jadwal_id' => 3],
            ['aset_id' => 4, 'jadwal_id' => 4],
            ['aset_id' => 5, 'jadwal_id' => 5],
        ]);
    }
}