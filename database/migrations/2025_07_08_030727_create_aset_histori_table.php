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
        Schema::create('aset_histori', function (Blueprint $table) {
            $table->id('aset_histori_id');
            $table->unsignedBigInteger('histori_id');
            $table->string('aset_id');

            $table->foreign('histori_id')
                ->references('histori_id')
                ->on('histori')
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
        Schema::dropIfExists('aset_histori');
    }
};
