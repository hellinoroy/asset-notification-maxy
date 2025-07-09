<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            AsetSeeder::class,
            JadwalSeeder::class,
            HistoriSeeder::class,
            AsetJadwalSeeder::class,
            AsetHistoriSeeder::class,
        ]);
    }
}
