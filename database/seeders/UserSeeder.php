<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insert([
            ['name' => 'Jennifer Wilson', 'email' => 'davisrandy@hotmail.com', 'password' => Hash::make('password123'), 'role' => 'Staff'],
            ['name' => 'Tiffany Bowman', 'email' => 'margaretcraig@butler-roberts.com', 'password' => Hash::make('password123'), 'role' => 'Staff'],
            ['name' => 'Kayla Kennedy', 'email' => 'zroy@gmail.com', 'password' => Hash::make('password123'), 'role' => 'Admin'],
            ['name' => 'Jason Carroll', 'email' => 'rrodriguez@harper.com', 'password' => Hash::make('password123'), 'role' => 'Admin'],
            ['name' => 'Cynthia Lynch', 'email' => 'katherinehoover@harper.com', 'password' => Hash::make('password123'), 'role' => 'Staff'],
        ]);
    }
}