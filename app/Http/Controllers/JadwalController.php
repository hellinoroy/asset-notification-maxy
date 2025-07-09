<?php

namespace App\Http\Controllers;

use App\Models\Jadwal;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class JadwalController extends Controller
{
    // GET /jadwal
    public function index()
    {
        try {
            $query = Jadwal::with(['aset'])
                ->get();
            return response()->json(['data' => $query], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mengambil aset.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // POST /jadwal
    public function store(Request $request)
    {
        try {
            // Log::info($request);
            $validated = $request->validate([
                'aset_id'                   => 'required|exists:aset,aset_id',
                'id'                        => 'required|exists:users,id',
                'jadwal_tanggal'            => 'required|date',
                'jadwal_keterangan'         => 'string',
            ]);
            // Log::info($validated);

            $date = Carbon::today();
            $jadwalDate = Carbon::parse($validated['jadwal_tanggal']);

            if ($jadwalDate->lt($date)) {
                return response()->json(['message' => 'Jadwal tidak boleh kurang dari hari ini'], 400);
            }
            
            if ($date == $jadwalDate) {
                $validated['jadwal_status'] = 'Pending';
            } else {
                $validated['jadwal_status'] = 'Aman';
            }

            $jadwal = Jadwal::create($validated);


            return response()->json([
                'message' => 'Jadwal berhasil dibuat.',
                'data' => $jadwal,
            ], 201);
        } catch (\Exception $e) {


            return response()->json([
                'message' => 'Gagal membuat jadwal.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // PUT /jadwal/{id}
    public function update(Request $request, $id)
    {
        try {
            $jadwal = Jadwal::find($id);
            if (!$jadwal) {
                return response()->json(['message' => 'Jadwal tidak ditemukan'], 404);
            }

            $validated = $request->validate([
                'jadwal_tanggal'       => 'required|date',
                'jadwal_keterangan'    => 'string',
                'jadwal_status'        => 'string'
            ]);

            $date = Carbon::today();
            $jadwalDate = Carbon::parse($validated['jadwal_tanggal']);

            if ($jadwalDate->lt($date)) {
                return response()->json(['message' => 'Jadwal tidak boleh kurang dari hari ini'], 400);
            }

            $jadwal->update($validated);
            return response()->json([
                'message' => 'Jadwal berhasil diupdate',
                'data' => $jadwal
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal update jadwal.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // DELETE /jadwal/{id}
    public function destroy($id)
    {
        try {
            $jadwal = Jadwal::find($id);

            if (!$jadwal) {
                return response()->json(['message' => 'Jadwal tidak ditemukan'], 404);
            }

            $jadwal->delete();
            return response()->json(['message' => 'Jadwal berhasil dihapus'], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mengahpus jadwal.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
