<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AssetController;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/about', function () {
    return Inertia::render('About');
});

Route::get('/asset/create', [AssetController::class, 'create'])
    ->middleware(['auth', 'verified'])
    ->name('assets.create');

Route::post('/assets', [AssetController::class, 'store'])
    ->middleware(['auth', 'verified'])
    ->name('assets.store');

Route::get('/laporan', [ReportController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('laporan.index');

Route::get('/dashboard', /* ... */)->name('dashboard');




Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard', [
            'user' => [
                'name' => Auth::user()->nama,
                'email' => Auth::user()->email,
            ],
        ]);
    })->name('dashboard');
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
