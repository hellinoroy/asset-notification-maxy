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
        'id',
        'aset_id',
        'jadwal_tanggal',
        'jadwal_status',
        'jadwal_keterangan',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id', 'id');
    }

    public function aset()
    {
        return $this->belongsTo(Aset::class, 'aset_id', 'aset_id');
    }
}
