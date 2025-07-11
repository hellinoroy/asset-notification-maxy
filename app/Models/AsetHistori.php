<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AsetHistori extends Model
{
    protected $table = 'aset_histori';
    protected $primaryKey = 'aset_histori_id';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = false;

    protected $fillable = [
        'aset_id',
        'histori_id',
    ];

    public function histori()
    {
        return $this->belongsTo(Histori::class, 'histori_id', 'histori_id');
    }

    public function aset()
    {
        return $this->belongsTo(Aset::class, 'aset_id', 'aset_id');
    }

    public function latestHistori()
    {
        return $this->hasOne(Histori::class, 'histori_id')
            ->latestOfMany('histori_tanggal');
    }
}
