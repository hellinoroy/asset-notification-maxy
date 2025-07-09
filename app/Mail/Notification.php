<?php

namespace App\Mail;

use App\Models\Jadwal;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class notification extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $list;

    public function __construct($list)
    {
        $this->list = $list;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Notification',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mails.notification',
        );
    }


    public function attachments(): array
    {
        return [];
    }
}
