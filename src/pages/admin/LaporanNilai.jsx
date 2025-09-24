import { useState } from 'react';
import ContentWrapper from '../../components/ui/ContentWrapper';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import DataTable from '../../components/ui/DataTable';
import FilterDropdown from '../../components/ui/FilterDropdown';
import { FaFileArrowDown, FaPrint, FaRegFilePdf } from 'react-icons/fa6';

export default function LaporanNilai() {
    // === State untuk Filter ===
    const [selectedTahun, setSelectedTahun] = useState('2025/2026');
    const [selectedKelas, setSelectedKelas] = useState('4A');
    const [selectedSemester, setSelectedSemester] = useState('ganjil');

    // === Data Dummy ===
    const tahunAjaranOptions = [
        { value: '2025/2026', label: 'T.A 2025/2026' },
        { value: '2024/2025', label: 'T.A 2024/2025' },
    ];

    const kelasOptions = [
        { value: '4A', label: 'Kelas 4A' },
        { value: '4B', label: 'Kelas 4B' },
        { value: '5A', label: 'Kelas 5A' },
    ];
    
    const semesterOptions = [
        { value: 'ganjil', label: 'Semester Ganjil' },
        { value: 'genap', label: 'Semester Genap' },
    ];

    const nilaiSiswa = [
        { id: 1, nama: 'Ahmad Fauzi', tugas1: 85, tugas2: 90, uts: 88, uas: 87, rataRata: 87.5 },
        { id: 2, nama: 'Budi Santoso', tugas1: 80, tugas2: 85, uts: 82, uas: 88, rataRata: 83.75 },
        { id: 3, nama: 'Citra Lestari', tugas1: 90, tugas2: 92, uts: 91, uas: 95, rataRata: 92 },
        { id: 4, nama: 'Dewi Anggraini', tugas1: 78, tugas2: 80, uts: 75, uas: 82, rataRata: 78.75 },
    ];

    const columns = [
        { key: 'no', label: 'No' },
        { key: 'nama', label: 'Nama Siswa' },
        { key: 'tugas1', label: 'Tugas 1' },
        { key: 'tugas2', label: 'Tugas 2' },
        { key: 'uts', label: 'UTS' },
        { key: 'uas', label: 'UAS' },
        { key: 'rataRata', label: 'Rata-rata' },
    ];

    const tableData = nilaiSiswa.map((siswa, index) => ({
        ...siswa,
        no: index + 1
    }));

    return (
        <div className="space-y-6">
            <PageHeader
                icon={<FaFileArrowDown />}
                title="Laporan Nilai"
                description="Hasilkan laporan nilai akhir siswa per kelas dan per semester."
            />

            {/* Panel Opsi Laporan */}
            <ContentWrapper>
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    {/* Filter */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-slate-700">Tahun Ajaran</label>
                            <FilterDropdown
                                value={selectedTahun}
                                onChange={(e) => setSelectedTahun(e.target.value)}
                                options={tahunAjaranOptions}
                                className="md:w-48"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-slate-700">Kelas</label>
                            <FilterDropdown
                                value={selectedKelas}
                                onChange={(e) => setSelectedKelas(e.target.value)}
                                options={kelasOptions}
                                className="md:w-48"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-slate-700">Semester</label>
                            <FilterDropdown
                                value={selectedSemester}
                                onChange={(e) => setSelectedSemester(e.target.value)}
                                options={semesterOptions}
                                className="md:w-48"
                            />
                        </div>
                    </div>
                    <div className="flex-grow"></div>
                    {/* Tombol Aksi */}
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
            
            {/* Pratinjau Laporan */}
            <ContentWrapper>
                <h3 className="text-lg font-bold text-slate-800 mb-4">
                    Pratinjau Laporan Nilai
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                    Menampilkan data untuk: **{tahunAjaranOptions.find(opt => opt.value === selectedTahun)?.label}** - **{kelasOptions.find(opt => opt.value === selectedKelas)?.label}** - **{semesterOptions.find(opt => opt.value === selectedSemester)?.label}**
                </p>
                <DataTable columns={columns} data={tableData} />
            </ContentWrapper>
        </div>
    );
}