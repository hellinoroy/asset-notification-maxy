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
        Schema::create('aset_jadwal', function (Blueprint $table) {
            $table->id('aset_jadwal_id');
            $table->unsignedBigInteger('jadwal_id');
            $table->string('aset_id');
            $table->string('aset_jadwal_status');
            $table->string('aset_jadwal_keterangan');

            $table->foreign('jadwal_id')
                ->references('jadwal_id')
                ->on('jadwal')
                ->onDelete('cascade');

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
        Schema::dropIfExists('aset_jadwal');
    }
};
