
import { router } from '@inertiajs/react';
import axios from 'axios';
import React, { useState } from 'react';
import InputField from './InputField';
import PrimaryButton from './PrimaryButton';

export default function AddAssetForm() {
  const [nomor,       setNomor]       = useState('');
  const [nama,        setNama]        = useState('');
  const [tahunBeli,   setTahunBeli]   = useState<number | ''>('');
  const [keterangan,  setKeterangan]  = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      aset_nomor      : nomor,
      aset_nama       : nama,
      aset_tahun_beli : tahunBeli,
      aset_keterangan : keterangan,
    };

    /* simple required‑field guard */
    if (!nomor || !nama || !tahunBeli) {
      alert('Nomor, nama, dan tahun beli wajib diisi.');
      return;
    }

    try {
      await axios.post('/api/aset', payload);    
      router.visit('/aset');      
    } catch (err: any) {
      console.error(err);
      const msg = err?.response?.data?.message ?? 'Gagal menyimpan aset.';
      alert(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="overflow-hidden rounded-lg border border-gray-300">
        <div className="flex bg-purple-100 px-4 py-3 text-sm font-semibold text-gray-700">
          <div className="flex-1 text-left">Nomor Aset</div>
          <div className="flex-1 text-left">Nama Aset</div>
          <div className="flex-1 text-left">Tahun Beli</div>
          <div className="flex-1 text-left">Keterangan</div>
        </div>

        <div className="flex items-center space-x-2 bg-purple-50 px-4 py-3">

          <div className="flex-1">
            <InputField
              id="aset-nomor"
              type="text"
              placeholder="AST001"
              value={nomor}
              onChange={(e: any) => setNomor(e.target.value)}
              className="border-none bg-transparent px-0 py-0 focus:ring-0"
            />
          </div>


          <div className="flex-1">
            <InputField
              id="aset-nama"
              type="text"
              placeholder="Laptop Asus"
              value={nama}
              onChange={(e: any) => setNama(e.target.value)}
              className="border-none bg-transparent px-0 py-0 focus:ring-0"
            />
          </div>


          <div className="flex-1">
            <InputField
              id="aset-tahun-beli"
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              placeholder="2024"
              value={tahunBeli}
              onChange={(e: any) => setTahunBeli(e.target.value)}
              className="border-none bg-transparent px-0 py-0 focus:ring-0"
            />
          </div>

          <div className="flex-1">
            <InputField
              id="aset-keterangan"
              type="text"
              placeholder="Catatan…"
              value={keterangan}
              onChange={(e: any) => setKeterangan(e.target.value)}
              className="border-none bg-transparent px-0 py-0 focus:ring-0"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <PrimaryButton type="submit" className="px-8 py-3">
          Simpan Aset
        </PrimaryButton>
      </div>
    </form>
  );
}
