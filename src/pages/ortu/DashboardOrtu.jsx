import ContentWrapper from "../../components/ui/ContentWrapper";
import Card from "../../components/ui/Card";
import DataTable from "../../components/ui/DataTable";
import BarChartComponent from "../../components/charts/BarChartComponent";
import { FaClipboardCheck, FaCommentDots, FaBookOpen } from "react-icons/fa6";

// Komponen kartu profil anak yang disempurnakan
const ProfileAnakCard = ({ anak }) => (
  <div className="p-6 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl shadow-lg text-white">
    <h2 className="text-2xl font-bold">{anak.nama}</h2>
    <p className="text-slate-300 mt-1">Kelas: {anak.kelas}</p>
    <p className="text-sm text-slate-400">NISN: {anak.nisn}</p>
  </div>
);

export default function DashboardOrtu() {
  // Data Dummy
  const dataAnak = {
    nama: "Ahmad Fauzi",
    nisn: "001",
    kelas: "4A",
    absensiHariIni: "Hadir",
    nilaiRataRata: 87.5,
    catatanTerbaru: [
      { id: 1, guru: "Bu Tika", mapel: "Matematika", catatan: "Ahmad sangat aktif dalam diskusi kelompok hari ini." },
      { id: 2, guru: "Pak Budi", mapel: "B. Indonesia", catatan: "Mohon bantuannya untuk mengingatkan ananda mengerjakan PR." },
      { id: 3, guru: "Bu Tika", mapel: "Matematika", catatan: "Nilai ulangan harian ananda sangat baik, mendapat 95." },
    ],
    nilaiPerMapel: [
      { mapel: "MTK", nilai: 78 },
      { mapel: "B. Indo", nilai: 88 },
      { mapel: "IPA", nilai: 87 },
      { mapel: "IPS", nilai: 88 },
      { mapel: "PKN", nilai: 95 },
    ].sort((a, b) => a.nilai - b.nilai),
  };

  const columns = [
    { key: 'guru', label: 'Dari Guru' },
    { key: 'catatan', label: 'Isi Catatan' },
  ];
  
  const tableData = dataAnak.catatanTerbaru.map(item => ({
      ...item,
      guru: (
        <div>
            <div className="font-semibold text-slate-800">{item.guru}</div>
            <div className="text-xs text-slate-500">{item.mapel}</div>
        </div>
      )
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Kiri: Profil & Ringkasan */}
        <div className="lg:col-span-1 space-y-6">
          <ProfileAnakCard anak={dataAnak} />
          <Card 
            icon={<FaClipboardCheck />} 
            title="Absensi Hari Ini" 
            value={dataAnak.absensiHariIni}
            label={new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            allowMultiLine = {true}
          />
          <Card 
            icon={<FaBookOpen />} 
            title="Nilai Rata-rata" 
            value={dataAnak.nilaiRataRata}
            label="Semester Ganjil"
          />
        </div>

        {/* Kolom Kanan: Catatan & Chart Nilai */}
        <div className="lg:col-span-2 space-y-6">
          <ContentWrapper>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-100 rounded-lg">
                  <FaCommentDots className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">Catatan Terbaru dari Guru</h3>
            </div>
            <DataTable columns={columns} data={tableData} />
          </ContentWrapper>

          {/* BARU: Chart Perbandingan Nilai */}
          <BarChartComponent 
            data={dataAnak.nilaiPerMapel}
            title="Perbandingan Nilai per Mata Pelajaran"
            label="Nilai Akhir"
            horizontal={true}
            dataKey="mapel"
            valueKey="nilai"
            backgroundColor={["#3B82F6", "#60A5FA"]}
            chartHeight="200px"
          />
        </div>
      </div>
    </div>
  );
}