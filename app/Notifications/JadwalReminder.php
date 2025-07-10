<?php

namespace App\Notifications;

use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

use Illuminate\Notifications\Notification;

class JadwalReminder extends Notification
{
    use Queueable;

    public $jadwal_id;
    public $aset_id;
    public $aset_nama;
    public $user_id;
    public $user_name;
    public $jadwal_keterangan;
    public $jadwal_status;
    public $tanggal;
    public $message;

    public function __construct($jadwal)
    {
        $this->jadwal_id = $jadwal->id;
        $this->aset_id = $jadwal->aset_id;
        $this->aset_nama = optional($jadwal->aset)->aset_nama ?? 'N/A';
        $this->user_id = optional($jadwal->user)->id ?? null;
        $this->user_name = optional($jadwal->user)->name ?? 'N/A';
        $this->jadwal_keterangan = $jadwal->jadwal_keterangan;
        $this->jadwal_status = $jadwal->jadwal_status;
        $this->tanggal = Carbon::parse($jadwal->jadwal_tanggal)->toDateString();
        $this->message = "Reminder: Jadwal untuk aset '{$this->aset_nama}' pada {$this->tanggal}.";
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toDatabase($notifiable)
    {
        return [
            'notified_user_id' => $notifiable->id,
            'jadwal_id' => $this->jadwal_id,
            'aset_id' => $this->aset_id,
            'aset_nama' => $this->aset_nama,
            'user_name' => $this->user_name,
            'jadwal_keterangan' => $this->jadwal_keterangan,
            'jadwal_status' => $this->jadwal_status,
            'tanggal' => $this->tanggal,
            'message' => $this->message,
        ];
    }
}
