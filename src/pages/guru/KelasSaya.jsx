import ContentWrapper from "../../components/ui/ContentWrapper";
import DataTable from "../../components/ui/DataTable";
import PageHeader from "../../components/ui/PageHeader";
import { FaUsers } from "react-icons/fa6";

export default function KelasSaya() {
  // === Data Dummy ===
  const kelasGuru = {
    namaKelas: "4A",
    jabatan: "Wali Kelas",
    siswa: [
      { id: 1, nisn: "001", nama: "Ahmad Fauzi", namaOrtu: "Bapak Abdullah" },
      { id: 2, nisn: "002", nama: "Budi Santoso", namaOrtu: "Bapak Santoso" },
      { id: 3, nisn: "003", nama: "Citra Lestari", namaOrtu: "Ibu Wulandari" },
      { id: 4, nisn: "004", nama: "Dewi Anggraini", namaOrtu: "Ibu Anggraini" },
      { id: 5, nisn: "005", nama: "Eka Prasetyo", namaOrtu: "Bapak Prasetyo" },
      { id: 6, nisn: "006", nama: "Fitriani", namaOrtu: "Ibu Fitri" },
    ],
  };

  // Kolom 'Aksi' dihilangkan
  const columns = [
    { key: 'no', label: 'No' },
    { key: 'nisn', label: 'NISN' },
    { key: 'nama', label: 'Nama Siswa' },
    { key: 'namaOrtu', label: 'Nama Orang Tua' },
  ];
  
  // Properti 'actions' dihilangkan dari data tabel
  const tableData = kelasGuru.siswa.map((siswa, index) => ({
    ...siswa,
    no: index + 1,
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<FaUsers />}
        title="Kelas Saya"
        description={`Daftar siswa dari kelas yang Anda ampu.`}
      />

      <ContentWrapper>
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-100 rounded-lg">
                <FaUsers className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">
              Daftar Siswa Kelas {kelasGuru.namaKelas}
            </h3>
        </div>
        
        <DataTable columns={columns} data={tableData} />
      </ContentWrapper>
    </div>
  );
}