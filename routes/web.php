<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::get('/', function () {
    if (Auth::check()) {
        return redirect()->route('jadwal_view');
    }
    return redirect()->route('login');
})->name('login_redirect');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard', [
            'user' => [
                'name' => Auth::user()->nama,
                'email' => Auth::user()->email,
            ],
        ]);
    })->name('dashboard');

    Route::get('/jadwal', function () {
        return Inertia::render('jadwal');
    })->name('jadwal_view');

    Route::get('/aset', function () {
        return Inertia::render('aset');
    })->name('aset_view');

    Route::get('/aset-add', function () {
        return Inertia::render('TambahAssetPage');
    })->name('aset-add');

    Route::get('/aset/{id}/edit', fn() => Inertia::render('EditAssetPage'))
        ->name('aset-edit');
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
