<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AsetController;
use App\Http\Controllers\JadwalController;
use App\Http\Controllers\HistoriController;
use Illuminate\Support\Facades\Log;


use Illuminate\Support\Facades\Auth;
use App\Models\Jadwal;
use App\Models\User;
use App\Models\Aset;
use App\Notifications\JadwalReminder;
use Carbon\Carbon;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth')->group(function () {
    Route::get('/notification', function () {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Not authenticated'], 401);
        }

        $notifications = $user->unreadNotifications()
            ->where('type', \App\Notifications\JadwalReminder::class)
            ->get();

        return response()->json([
            'message' => 'Jadwal notifications fetched successfully.',
            'notifications' => $notifications,
        ]);
    });

    Route::Get('/stat-card', function () {
        $totalSelesai = Jadwal::where('jadwal_status', 'Selesai')
            ->count();
        $totalTerlambat = Jadwal::where('jadwal_status', 'Terlambat')
            ->count();

        $upcoming = Jadwal::whereBetween(
                 'jadwal_tanggal',
                 [now(), now()->addDays(3)]
             )->count();

        return response()->json([
            'message' => 'Stat card fetched successfully.',
            'stat_card'    => [
                'totalSelesai'   => $totalSelesai,
                'totalTerlambat' => $totalTerlambat,
                'totalTerdekat'  => $upcoming,
            ],
        ]);
    });



    Route::post('/notification/{id}/read', function ($id) {
        $notification = Auth::user()->unreadNotifications()->find($id);

        if ($notification) {
            $notification->markAsRead();
            return response()->json(['message' => 'Notification marked as read.']);
        }

        return response()->json(['message' => 'Notification not found or already read.'], 404);
    });

    Route::put('/jadwal-selesai/{id}', [JadwalController::class, 'updateStatus']);
});

Route::middleware(['role:Admin'])->group(function () {
    Route::get('/all-user', function () {

        $users = User::select(['id', 'name', 'email'])->get();
        // Log::info($users);
        return response()->json([
            'message' => 'Users fetched successfully.',
            'users' => $users,
        ]);
    });

    Route::get('/all-aset', function () {
        $aset = Aset::select(['aset_id', 'aset_nama', 'aset_nomor'])->get();
        // Log::info($users);
        return response()->json([
            'message' => 'Asets fetched successfully.',
            'asets' => $aset,
        ]);
    });

    Route::post('/jadwal', [JadwalController::class, 'store']);
});

Route::controller(AsetController::class)->group(function () {
    // GET /api/aset
    Route::get('/aset', 'index');

    // POST /api/aset
    Route::post('/aset', 'store');

    // PUT /api/aset/{id}
    Route::put('/aset/{id}', 'update');

    // DELETE /api/aset/{id}
    Route::delete('/aset/{id}', 'destroy');
});

Route::controller(JadwalController::class)->group(function () {
    // GET /api/jadwal
    Route::get('/jadwal', 'index');

    // POST /api/jadwal
    Route::post('/jadwal', 'store');

    // PUT /api/jadwal/{id}
    Route::put('/jadwal/{id}', 'update');

    // DELETE /api/aset/{id}
    Route::delete('/jadwal/{id}', 'destroy');
});

Route::controller(HistoriController::class)->group(function () {
    // GET /api/histori
    Route::get('/histori', 'index');

    // POST /api/histori
    Route::post('/histori', 'store');

    // PUT /api/histori
    Route::put('/histori/{id}', 'update');

    // Delete /api/histori
    Route::delete('/histori/{id}', 'destroy');
});



// Route::get('/ping', function () {
//     Log::info('Ping route was hit.');
//     return ['message' => 'pong'];
// });
