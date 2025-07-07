<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route::post('/register', function (Request $request) {
//     try {
//         DB::beginTransaction();
//         $validated = $request->validate([
//             'name'     => ['required', 'string', 'max:255'],
//             'email'    => ['required', 'string', 'email', 'max:255', 'unique:users'],
//             'password' => ['required', 'confirmed', Password::defaults()],
//         ]);

//         $user = User::create([
//             'name'              => $validated['name'],
//             'email'             => $validated['email'],
//             'password'          => $validated['password'],
//         ]);

//         event(new Registered($user));

//         DB::commit();
//         return response()->json([
//             'message' => 'Registration successful. Check your email for a verification link.'
//         ], 201);
//     } catch (\Throwable $th) {
//         DB::rollBack();
//         return response()->json([
//             'message' => 'Registration failed.',
//             'error' => $th->getMessage()
//         ], 500);
//     }
// });

