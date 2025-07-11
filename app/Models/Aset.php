<?php

namespace App\Models;

use Carbon\Carbon;

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

    public function latestSelesaiJadwal()
    {
        return $this->hasOne(Jadwal::class, 'aset_id')
            ->where('jadwal_status', 'Selesai')
            ->latestOfMany('jadwal_tanggal');
    }

    public function nextJadwal()
    {
        return $this->hasOne(Jadwal::class, 'aset_id')
            ->with('user:id,name')      
            ->where('jadwal_status', '!=', 'Selesai')
            ->whereDate('jadwal_tanggal', '>=', Carbon::today())
            ->orderBy('jadwal_tanggal')
            ->limit(1);                    
    }
}
