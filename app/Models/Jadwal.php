<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

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

    public static function notification()
    {
        return self::with([
            'aset',
            'user' => function ($q) {
                $q->select(['id', 'name', 'email']);
            }
        ])
            ->whereIn('jadwal_status', ['Pending', 'Terlambat'])
            ->get();
    }

    public static function statusUpdate()
    {
        $date = Carbon::today();
        self::where('jadwal_tanggal', $date)
            ->update(['jadwal_status' => 'Pending']);
        self::where('jadwal_tanggal', '<', $date)
            ->where('jadwal_status', '!=', 'Selesai')
            ->update(['jadwal_status' => 'Terlambat']);
       
    }


}
