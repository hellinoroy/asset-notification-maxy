<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AsetJadwal extends Model
{
    protected $table = 'aset_jadwal';
    protected $primaryKey = 'aset_jadwal_id';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = false;

    protected $fillable = [
        'aset_id',
        'jadwal_id',
        'aset_jadwal_status',
        'aset_jadwal_keterangan',
    ];

    public function jadwal()
    {
        return $this->belongsTo(Jadwal::class, 'jadwal_id', 'jadwal_id');
    }

    public function aset()
    {
        return $this->belongsTo(Aset::class, 'aset_id', 'aset_id');
    }
}
