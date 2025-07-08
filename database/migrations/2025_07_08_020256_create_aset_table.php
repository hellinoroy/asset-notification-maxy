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
        Schema::create('aset', function (Blueprint $table) {
            $table->id('aset_id');
            $table->string('aset_nomor')->unique();
            $table->string('aset_nama');
            $table->string('aset_tahun_beli');
            $table->string('aset_keterangan')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('aset');
    }
};
