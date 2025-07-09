<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notification Mail</title>
</head>

<body>

    <table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse; margin-bottom: 30px;">
        <thead>
            <tr>
                <th>ID</th> {{-- aset_nomor --}}
                <th>Nama Aset</th> {{-- aset_nama --}}
                <th>Keterangan Aset</th> {{-- aset_keterangan --}}
                <th>Keterangan Jadwal</th> {{-- jadwal_keterangan --}}
                <th>Tanggal</th> {{-- jadwal_tanggal --}}
                <th>PIC</th> {{-- user.name --}}
                <th>Status</th> {{-- jadwal_status --}}
            </tr>
        </thead>
        <tbody>
            @foreach ($list as $jadwal)
            <tr>
                <td>{{ $jadwal['aset']['aset_nomor'] }}</td>
                <td>{{ $jadwal['aset']['aset_nama'] }}</td>
                <td>{{ $jadwal['aset']['aset_keterangan'] }}</td>
                <td>{{ $jadwal['jadwal_keterangan'] ?? '-' }}</td>
                <td>{{ $jadwal['jadwal_tanggal'] }}</td>
                <td>{{ $jadwal['user']['name'] ?? '-' }}</td>
                <td>{{ $jadwal['jadwal_status'] }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

</body>

</html>