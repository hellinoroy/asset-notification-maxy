<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Jadwal extends Model
{
    protected $table = 'jadwal';
    protected $primaryKey = 'jadwal_id';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'jadwal_id',
        'id',
        'aset_tahun_beli',
        'aset_keterangan',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id', 'id');
    }

    public function asetJadwal()
    {
        return $this->hasMany(AsetJadwal::class, 'jadwal_id', 'jadwal_id');
    }
}
