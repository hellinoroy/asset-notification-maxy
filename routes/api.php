<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AsetController;
use App\Http\Controllers\JadwalController;
use App\Http\Controllers\HistoriController;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

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

        $upcoming = Jadwal::where('jadwal_status', 'Aman')
            ->whereBetween(
                'jadwal_tanggal',
                [now(), now()->addDays(3)]
            )
            ->count();
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

    Route::delete('/jadwal/{id}',  [JadwalController::class, 'destroy']);

    Route::post('/aset', [AsetController::class, 'store']);

    Route::put('/aset/{id}', [AsetController::class, 'update']);

    Route::delete('/aset/{id}', [AsetController::class, 'destroy']);

    Route::get('/aset/{id}', function ($id) {
        $aset = Aset::find($id);
        if (!$aset) {
            return response()->json(['message' => 'Aset tidak ditemukan.'], 404);
        }
        return response()->json($aset);
    });

    Route::put('{id}', function (Request $request, $id) {
        $aset = Aset::find($id);

        if (!$aset) {
            return response()->json(['message' => 'Aset tidak ditemukan.'], 404);
        }

        $validated = $request->validate([
            'aset_nomor'      => [
                'required',
                'string',
                Rule::unique('aset', 'aset_nomor')->ignore($aset->aset_id, 'aset_id'),
            ],
            'aset_nama'       => 'required|string',
            'aset_tahun_beli' => 'required|integer',
            'aset_keterangan' => 'nullable|string',
        ]);

        $aset->update($validated);

        return response()->json([
            'message' => 'Aset berhasil diperbarui.',
            'data'    => $aset,
        ]);
    });
});

Route::controller(AsetController::class)->group(function () {

    Route::get('/aset', 'index');
});

Route::controller(JadwalController::class)->group(function () {

    Route::get('/jadwal', 'index');
});

Route::controller(HistoriController::class)->group(function () {

    Route::get('/histori', 'index');

    Route::post('/histori', 'store');

    Route::put('/histori/{id}', 'update');

    Route::delete('/histori/{id}', 'destroy');
});



// Route::get('/ping', function () {
//     Log::info('Ping route was hit.');
//     return ['message' => 'pong'];
// });
