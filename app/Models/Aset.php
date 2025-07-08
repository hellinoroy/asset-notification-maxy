<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Aset extends Model
{
    protected $table = 'aset';
    protected $primaryKey = 'aset_id';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = false;

    protected $fillable = [
        'aset_nomor',
        'aset_nama',
        'aset_tahun_beli',
        'aset_keterangan',
    ];

    public function aset()
    {
        return $this->hasMany(Jadwal::class, 'aset_id', 'aset_id');
    }

    public function asetHistori()
    {
        return $this->hasMany(AsetHistori::class, 'aset_id', 'aset_id');
    }
}
