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
        Schema::create('histori', function (Blueprint $table) {
            $table->id('histori_id');
            $table->foreignId('id')
                ->nullable()
                ->constrained('users')
                ->onDelete('set null');
            $table->date('histori_tanggal');
            $table->string('histori_keterangan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('histori');
    }
};
