<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAsetJadwalTable extends Migration
{
    public function up(): void
    {
        Schema::create('aset_jadwal', function (Blueprint $table) {
            $table->id('id');
            $table->unsignedBigInteger('aset_id');
            $table->unsignedBigInteger('jadwal_id');
            $table->timestamps();

            // Foreign key ke tabel aset
            $table->foreign('aset_id')
                  ->references('aset_id')
                  ->on('aset')
                  ->onDelete('cascade');

            // Foreign key ke tabel jadwal
            $table->foreign('jadwal_id')
                  ->references('jadwal_id')
                  ->on('jadwal')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('aset_jadwal');
    }
}
