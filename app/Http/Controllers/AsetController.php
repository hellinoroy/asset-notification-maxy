<?php

namespace App\Http\Controllers;

use App\Models\Aset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AsetController extends Controller
{
    // GET /api/aset
    public function index()
    {
        try {
            // Log::info('aset/index');
            $query = Aset::all();
            return response()->json(['data' => $query], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mengambil aset.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // POST /api/aset
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'aset_nomor' => 'required|string|unique:aset,aset_nomor',
                'aset_nama' => 'required|string',
                'aset_tahun_beli' => 'required|integer',
                'aset_keterangan' => 'nullable|string',
            ]);
            $aset = Aset::create($validated);
            return response()->json([
                'message' => 'Aset berhasil dibuat',
                'data' => $aset
            ], 201);
        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Gagal membuat aset.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Ini nanti
    // GET /api/aset/{id}
    // public function show($id)
    // {
    //     $aset = Aset::find($id);

    //     if (!$aset) {
    //         return response()->json(['message' => 'Aset not found'], 404);
    //     }

    //     return response()->json($aset);
    // }

    // PUT /api/aset/{id}
    public function update(Request $request, $id)
    {
        try {
            // Log::info('aset/update');
            $aset = Aset::find($id);
            // Log::info($aset);
            if (!$aset) {
                return response()->json(['message' => 'Aset tidak ditemukan'], 404);
            }
            $validated = $request->validate([
                'aset_nomor' => 'required|string',
                'aset_nama' => 'required|string',
                'aset_tahun_beli' => 'required|integer',
                'aset_keterangan' => 'nullable|string',
            ]);

            // Log::info('Validated data:', $validated);
            $aset->update($validated);
            // Log::info('Updated Aset:', $aset->toArray());
            return response()->json([
                'message' => 'Aset berhasil diupdate',
                'data' => $aset
            ], 200);
        } catch (\Exception  $e) {
            Log::error('Update failed: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to update aset.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // DELETE /api/aset/{id}
    public function destroy($id)
    {
        try {
            $aset = Aset::find($id);
            if (!$aset) {
                return response()->json(['message' => 'Aset tidak ditemukan'], 404);
            }
            $aset->delete();
            return response()->json(['message' => 'Aset berhasil dihapus'], 200);
        } catch (\Exception  $e) {
            Log::error('Update failed: ' . $e->getMessage());
            return response()->json([
                'message' => 'Gagal menghapus aset.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    
}
