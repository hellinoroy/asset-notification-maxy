<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Aset extends Model
{
    protected $table = 'aset';
    protected $primaryKey = 'aset_id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'aset_nama',
        'aset_tahun_beli',
        'aset_keterangan',
    ];

    public function asetJadwal()
    {
        return $this->hasMany(AsetJadwal::class, 'aset_id', 'aset_id');
    }

    public function asetHistori()
    {
        return $this->hasMany(AsetHistori::class, 'aset_id', 'aset_id');
    }
}
