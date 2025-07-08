<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('jadwal', function (Blueprint $table) {
            $table->id('jadwal_id');
            $table->unsignedBigInteger('aset_id');
            $table->foreignId('id')
                ->constrained('users')
                ->onDelete('cascade');
            $table->date('jadwal_tanggal');
            $table->string('jadwal_keterangan')->nullable();
            $table->string('jadwal_status');
            $table->timestamps();

            $table->foreign('aset_id')
                ->references('aset_id')
                ->on('aset')
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
};
