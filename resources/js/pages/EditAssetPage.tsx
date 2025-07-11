import AdminLayout from '@/layouts/AdminLayout';
import { usePage, router } from '@inertiajs/react';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import InputField from '../components/InputField';

/* optional: adjust if your API returns different keys */
interface AsetDTO {
  aset_id:          number;
  aset_nomor:       string;
  aset_nama:        string;
  aset_tahun_beli:  number;
  aset_keterangan?: string;
}

const EditAssetPage: React.FC = () => {
  /* ── get the id from current URL (e.g. /aset/123/edit) ─────────────── */
  const id = window.location.pathname.split('/').filter(Boolean).slice(-2, -1)[0]; // "123"

  /* ── local state ───────────────────────────────────────────────────── */
  const [loading, setLoading]     = useState(true);
  const [nomor, setNomor]         = useState('');
  const [nama, setNama]           = useState('');
  const [tahunBeli, setTahunBeli] = useState<number | ''>('');
  const [keterangan, setKeterangan] = useState('');

  /* ── fetch asset once on mount ─────────────────────────────────────── */
  useEffect(() => {
    (async () => {
      try {
        const res   = await axios.get<AsetDTO>(`/api/aset/${id}`);
        const aset  = res.data;

        setNomor(aset.aset_nomor);
        setNama(aset.aset_nama);
        setTahunBeli(aset.aset_tahun_beli);
        setKeterangan(aset.aset_keterangan ?? '');
      } catch (err: any) {
        alert(err?.response?.data?.message ?? 'Gagal memuat data aset.');
        router.visit('/aset'); // fallback to list
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  /* ── submit PUT /api/aset/{id} ──────────────────────────────────────── */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nomor || !nama || !tahunBeli) {
      alert('Nomor, nama, dan tahun beli wajib diisi.');
      return;
    }

    const payload = {
      aset_nomor:       nomor,
      aset_nama:        nama,
      aset_tahun_beli:  tahunBeli,
      aset_keterangan:  keterangan,
    };

    try {
      await axios.put(`/api/aset/${id}`, payload);
      router.visit('/aset');               // back to list
    } catch (err: any) {
      const serverErr = err?.response?.data?.error;
      const serverMsg = err?.response?.data?.message;
      alert(serverErr ?? serverMsg ?? 'Gagal memperbarui aset.');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8 text-center text-gray-600">
          Memuat data aset…
        </div>
      </AdminLayout>
    );
  }

  /* ── UI ─────────────────────────────────────────────────────────────── */
  return (
    <AdminLayout>
      <div className="p-4 sm:p-8">
        <div className="mx-auto max-w-3xl space-y-6 rounded-2xl bg-white p-6 shadow-md sm:p-10">
          {/* header + back */}
          <div className="flex items-center gap-3">
            <button onClick={() => window.history.back()}>
              <ArrowLeft className="h-6 w-6 text-gray-700" />
            </button>
            <h2 className="text-2xl font-semibold text-gray-800 sm:text-3xl">
              Edit Aset
            </h2>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Nomor Aset
              </label>
              <InputField
                id="nomor"
                type="text"
                value={nomor}
                onChange={(e: any) => setNomor(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Nama Aset
              </label>
              <InputField
                id="nama"
                type="text"
                value={nama}
                onChange={(e: any) => setNama(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Tahun Beli
              </label>
              <InputField
                id="tahunBeli"
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                value={tahunBeli}
                onChange={(e: any) => setTahunBeli(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Keterangan
              </label>
              <InputField
                id="keterangan"
                type="text"
                value={keterangan}
                onChange={(e: any) => setKeterangan(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Simpan Perubahan
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditAssetPage;
