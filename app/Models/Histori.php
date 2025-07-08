<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Histori extends Model
{
    protected $table = 'histori';
    protected $primaryKey = 'histori_id';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'id',
        'histori_tanggal',
        'histori_keterangan',
    ];

    public function asetHistori()
    {
        return $this->hasMany(AsetHistori::class, 'histori_id', 'histori_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id', 'id');
    }
}
