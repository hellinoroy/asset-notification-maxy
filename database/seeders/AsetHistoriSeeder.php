<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AsetHistoriSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('aset_histori')->insert([
            ['aset_id' => 1, 'histori_id' => 1],
            ['aset_id' => 2, 'histori_id' => 2],
            ['aset_id' => 3, 'histori_id' => 3],
            ['aset_id' => 4, 'histori_id' => 4],
            ['aset_id' => 5, 'histori_id' => 5],
        ]);
    }
}