<?php

namespace App\Http\Controllers;

use App\Models\Histori;
use App\Models\AsetHistori;

use Carbon\Carbon;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class HistoriController extends Controller
{
    // GET /histori
    public function index()
    {
        try {
            $query = Histori::with(['asetHistori' => function ($q) {
                $q->with(['aset']);
            }])
                ->get();
            return response()->json(['data' => $query], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mengambil histori.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // POST /histori
    public function store(Request $request)
    {
        try {
            // Log::info($request);
            $validated = $request->validate([
                'aset_id'                       => 'required|exists:aset,aset_id',
                'id'                            => 'required|exists:users,id',
                'histori_tanggal'               => 'required|date',
                'histori_keterangan'            => 'string',
            ]);
            // Log::info($validated);

            $date = Carbon::today();
            $jadwalDate = Carbon::parse($validated['histori_tanggal']);

            if ($date->lt($jadwalDate)) {
                return response()->json(['message' => 'Tanggal histori tidak boleh lebih dari hari ini'], 400);
            }

            DB::beginTransaction();

            $histori = Histori::create([
                'id'                            => $validated['id'],
                'histori_tanggal'               => $validated['histori_tanggal'],
                'histori_keterangan'            => $validated['histori_keterangan'],
            ]);

            $asetHistori = AsetHistori::create([
                'histori_id'                     => $histori['histori_id'],
                'aset_id'                        => $validated['aset_id'],
            ]);


            DB::commit();
            return response()->json([
                'message'   => 'Histori berhasil dibuat.',
                'data1'     => $histori,
                'data2'     => $asetHistori,
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Gagal membuat histori.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // PUT /histori/{id}
    public function update(Request $request, $id)
    {
        try {
            $histori = Histori::find($id);
            if (!$histori) {
                return response()->json(['message' => 'Histori tidak ditemukan'], 404);
            }
            $validated = $request->validate([
                'histori_tanggal'               => 'required|date',
                'histori_keterangan'            => 'string',
            ]);

            $date = Carbon::today();
            $jadwalDate = Carbon::parse($validated['histori_tanggal']);

            if ($date->lt($jadwalDate)) {
                return response()->json(['message' => 'Tanggal histori tidak boleh lebih dari hari ini'], 400);
            }

            $histori->update($validated);
            return response()->json([
                'message' => 'Histori berhasil diupdate',
                'data' => $histori
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal update histori.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // DELETE /jadwal/{id}
    public function destroy($id)
    {
        try {
            $histori = Histori::find($id);

            if (!$histori) {
                return response()->json(['message' => 'Histori tidak ditemukan'], 404);
            }

            $histori->delete();
            return response()->json(['message' => 'Histori berhasil dihapus'], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mengahapus histori.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
