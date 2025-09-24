import { useState } from 'react';
import ContentWrapper from '../../components/ui/ContentWrapper';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import DataTable from '../../components/ui/DataTable';
import FilterDropdown from '../../components/ui/FilterDropdown';
import { FaFileArrowDown, FaPrint, FaRegFilePdf } from 'react-icons/fa6';

export default function LaporanAnak() {
    // === State ===
    const [selectedTahun, setSelectedTahun] = useState('2025/2026');
    const [selectedSemester, setSelectedSemester] = useState('ganjil');

    // === Data Dummy ===
    const tahunAjaranOptions = [
        { value: '2025/2026', label: 'T.A 2025/2026' },
        { value: '2024/2025', label: 'T.A 2024/2025' },
    ];
    
    const semesterOptions = [
        { value: 'ganjil', label: 'Semester Ganjil' },
        { value: 'genap', label: 'Semester Genap' },
    ];

    const dataLaporan = {
        '2025/2026': {
            ganjil: [
                { id: 1, mapel: 'Matematika', nilaiAkhir: 78, predikat: 'C', deskripsi: 'Perlu meningkatkan pemahaman konsep dasar.' },
                { id: 2, mapel: 'B. Indonesia', nilaiAkhir: 88, predikat: 'A', deskripsi: 'Sangat baik dalam pemahaman teks.' },
                { id: 3, mapel: 'IPA', nilaiAkhir: 87, predikat: 'A', deskripsi: 'Memiliki rasa ingin tahu yang tinggi.' },
                { id: 4, mapel: 'IPS', nilaiAkhir: 88, predikat: 'A', deskripsi: 'Aktif dalam diskusi kelompok.' },
                { id: 5, mapel: 'PKN', nilaiAkhir: 95, predikat: 'A', deskripsi: 'Sangat baik dalam memahami nilai-nilai Pancasila.' },
            ],
            genap: [
                { id: 1, mapel: 'Matematika', nilaiAkhir: 89, predikat: 'A', deskripsi: 'Menunjukkan peningkatan yang signifikan.' },
            ]
        },
        '2024/2025': {
            ganjil: [
                { id: 1, mapel: 'Matematika', nilaiAkhir: 84, predikat: 'B', deskripsi: 'Cukup baik, perlu lebih banyak latihan.' },
            ],
            genap: [
                { id: 1, mapel: 'B. Indonesia', nilaiAkhir: 88, predikat: 'A', deskripsi: 'Sangat baik dalam menulis karangan.' },
            ]
        }
    };
    
    const dataTampil = dataLaporan[selectedTahun]?.[selectedSemester] || [];

    const columns = [
        { key: 'mapel', label: 'Mata Pelajaran' },
        { key: 'nilaiAkhir', label: 'Nilai Akhir' },
        { key: 'predikat', label: 'Predikat' },
        { key: 'deskripsi', label: 'Deskripsi / Catatan Guru' },
    ];

    return (
        <div className="space-y-6">
            <PageHeader
                icon={<FaFileArrowDown />}
                title="Laporan Akademik Anak"
                description="Unduh atau cetak laporan hasil belajar (rapor) anak Anda."
            />

            <ContentWrapper>
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-slate-700">Pilih Tahun Ajaran</label>
                            <FilterDropdown
                                value={selectedTahun}
                                onChange={(e) => setSelectedTahun(e.target.value)}
                                options={tahunAjaranOptions}
                                className="md:w-56"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-slate-700">Pilih Semester</label>
                            <FilterDropdown
                                value={selectedSemester}
                                onChange={(e) => setSelectedSemester(e.target.value)}
                                options={semesterOptions}
                                className="md:w-56"
                            />
                        </div>
                    </div>
                    <div className="flex-grow"></div>
                    <div className="flex gap-3 self-end">
                        <Button variant="primary" icon={<FaRegFilePdf />}>
                            Unduh PDF
                        </Button>
                        <Button variant="secondary" icon={<FaPrint />}>
                            Cetak
                        </Button>
                    </div>
                </div>
            </ContentWrapper>

            <ContentWrapper>
                <h3 className="text-lg font-bold text-slate-800 mb-4">
                    Pratinjau Laporan Hasil Belajar
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                    Menampilkan laporan untuk **{tahunAjaranOptions.find(opt => opt.value === selectedTahun)?.label}** - **{semesterOptions.find(opt => opt.value === selectedSemester)?.label}**
                </p>
                <DataTable columns={columns} data={dataTampil} />
            </ContentWrapper>
        </div>
    );
}