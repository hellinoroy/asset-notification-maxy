<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJadwalTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('jadwal', function (Blueprint $table) {
            $table->id('jadwal_id');

            $table->unsignedBigInteger('aset_id');
            $table->unsignedBigInteger('user_id'); // foreign key ke tabel users

            $table->date('jadwal_tanggal');
            $table->string('jadwal_keterangan')->nullable();
            $table->string('jadwal_status');
            $table->timestamps();

            // Relasi ke tabel aset
            $table->foreign('aset_id')
                ->references('aset_id')
                ->on('aset')
                ->onDelete('cascade');

            // Relasi ke tabel users
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jadwal');
    }
}
