<?
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
// Ganti dengan model User Anda
use App\Models\User; 

class ProfileController extends Controller
{
    /**
     * Menampilkan halaman edit profil.
     */
    public function edit(Request $request): Response
    {
        // Di aplikasi nyata, data ini diambil dari Auth::user()
        return Inertia::render('Profile/edit', [
            'user' => [
                'nama_depan' => 'Budi',
                'nama_belakang' => 'Handoko',
                'email' => 'budihan02@gmail.com',
                'nomor_hp' => '0889********',
                'role' => 'Staff',
                'email_notifikasi' => true,
                'avatar' => 'https://i.pravatar.cc/150?u=devan'
            ]
        ]);
    }

    /**
     * Memperbarui informasi profil pengguna.
     */
    public function update(Request $request)
    {
        // Validasi data yang masuk
        $request->validate([
            'nama_depan' => 'required|string|max:255',
            'nama_belakang' => 'nullable|string|max:255',
            'email_notifikasi' => 'required|boolean',
            // Tambahkan validasi untuk avatar jika ada
            // 'avatar' => 'nullable|image|mimes:jpg,jpeg,png|max:1024',
        ]);

        // Logika untuk update data user
        // auth()->user()->update($request->all());

        return Redirect::route('profile.edit')->with('success', 'Profil berhasil diperbarui.');
    }
}