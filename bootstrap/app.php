<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\RoleMiddleware;
use App\Http\Middleware\TrustProxies;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Support\Facades\Log;


use Carbon\Carbon;
use App\Models\Jadwal;
use App\Models\User;
use App\Mail\Notification;
use Illuminate\Support\Facades\Mail;


return Application::configure(basePath: dirname(__DIR__))

    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->append([
            TrustProxies::class,
        ]);
        $middleware->alias([
            'role' => RoleMiddleware::class,
        ]);
        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
        $middleware->api(prepend: [
            \Illuminate\Cookie\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ]);
    })
    ->withSchedule(function (Schedule $schedule) {

        $schedule->call(function () {
            Jadwal::statusUpdate();
            Log::info("status updated");
        })->daily()
            ->name('jadwal_status_update');

        $schedule->call(function () {
            $today = Carbon::today();
            $threeDaysLater = $today->copy()->addDays(3);

            // Notify Staff about their own jadwals
            $jadwals = Jadwal::with('user')
                ->whereIn('jadwal_status', ['Pending', 'Terlambat'])
                ->whereDate('jadwal_tanggal', '<=', $threeDaysLater)
                ->get();

            foreach ($jadwals as $jadwal) {
                if ($jadwal->user) {
                    $jadwal->user->notify(new \App\Notifications\JadwalReminder($jadwal));
                }
            }

            // Notify Admins - You can customize what kind of notification to send
            $admins = User::where('role', 'Admin')->get();

            foreach ($admins as $admin) {

                foreach ($jadwals as $jadwal) {
                    $admin->notify(new \App\Notifications\JadwalReminder($jadwal));
                }
            }
        })->everyTwoSeconds()->name('jadwal_reminder_schedule')->withoutOverlapping();


        // $schedule->call(function () {
        //     $admins = User::adminList();
        //     $data = Jadwal::notification();
        //     // Log::info($data);
        //     // Log::info($admins);

        //     $tableAdmin = $data->map(function ($jadwal) {
        //         return [
        //             'aset' => [
        //                 'aset_nomor' => $jadwal->aset->aset_nomor ?? '-',
        //                 'aset_nama' => $jadwal->aset->aset_nama ?? '-',
        //                 'aset_keterangan' => $jadwal->aset->aset_keterangan ?? '-',
        //             ],
        //             'jadwal_keterangan' => $jadwal->jadwal_keterangan,
        //             'jadwal_tanggal' => $jadwal->jadwal_tanggal,
        //             'jadwal_status' => $jadwal->jadwal_status,
        //             'user' => [
        //                 'name' => $jadwal->user->name ?? '-',
        //                 'email' => $jadwal->user->email ?? '-',
        //             ],
        //         ];
        //     })->toArray();

        //     foreach ($admins as $admin) {
        //         Mail::to($admin->email)->queue(new Notification($tableAdmin));
        //     }
        //     $grouped = $data->groupBy(function ($item) {
        //         return $item->user->email;
        //     });
        //     Log::info($grouped);
        //     foreach ($grouped as $email => $items) {
        //         Log::info("To: $email\n");
        //         foreach ($items as $jadwal) {
        //             Log::info("- {$jadwal->aset->aset_nama} ({$jadwal->jadwal_status})\n");
        //         }
        //         Mail::to($email)->queue(new Notification($items));
        //     }

        //     Log::info("notifikasi send");
        // })->daily()
        //     ->name('jadwal_notifikasi_email');
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
