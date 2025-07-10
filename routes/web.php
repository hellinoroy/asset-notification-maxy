<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use App\Http\Controllers\AssetController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ProfileController;


// Halaman utama
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Halaman About
Route::get('/pages/about', function () {
    return Inertia::render('about');
});

// Halaman Dashboard (hanya untuk user yang login dan terverifikasi)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard', [
            'user' => [
                'name' => Auth::user()->nama,
                'email' => Auth::user()->email,
            ],
        ]);
    })->name('dashboard');

    // Aset - halaman laporan
    Route::get('/Laporan', [ReportController::class, 'index'])->name('laporan.index');

    // Aset - route resource (hanya beberapa)
    Route::resource('Aset', AssetController::class)
        ->only(['index', 'create', 'store', 'destroy', 'show'])
        ->names([
            'index' => 'assets.index',
            'create' => 'assets.create',
            'store' => 'assets.store',
            'destroy' => 'assets.destroy',
            'show' => 'assets.show',
        ]);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
});

// Rute tambahan (dummy / placeholder)
Route::get('/ganti-password', function () {
    // halaman ganti password
})->name('password.edit');

Route::get('/role-management', function () {
    // halaman role management
})->name('roles.index');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
