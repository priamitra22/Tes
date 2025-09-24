import ContentWrapper from "../../components/ui/ContentWrapper";
import Card from "../../components/ui/Card";
import PageHeader from "../../components/ui/PageHeader";
import BarChartComponent from "../../components/charts/BarChartComponent";
import PieChartComponent from "../../components/charts/PieChartComponent";
import DataTable from "../../components/ui/DataTable";
import { useState } from "react";
import {
  FaChartLine,
  FaUsers,
  FaChild,
  FaFemale,
  FaCommentDots,
  FaChevronLeft,
  FaChevronRight,
  FaTrophy,
  FaMedal,
  FaAward,
} from "react-icons/fa";

export default function DashboardGuru() {
  // === State untuk pagination chart ===
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // === State untuk filter mata pelajaran ===
  const [selectedMapel, setSelectedMapel] = useState("all");
  
  // === State untuk pagination chart nilai siswa ===
  const [currentPageNilai, setCurrentPageNilai] = useState(1);
  const itemsPerPageNilai = 10; // Tampilkan 10 siswa per halaman

  // === Reset pagination ketika mata pelajaran berubah ===
  const handleMapelChange = (newMapel) => {
    setSelectedMapel(newMapel);
    setCurrentPageNilai(1); // Reset ke halaman 1
  };

  // === Data Dummy Siswa (20 siswa) ===
  const allSiswaData = [
    { nama: "Ahmad", nilai: 92, kelas: "4A" },
    { nama: "Budi", nilai: 89, kelas: "4A" },
    { nama: "Citra", nilai: 88, kelas: "4A" },
    { nama: "Dewi", nilai: 85, kelas: "4A" },
    { nama: "Eka", nilai: 84, kelas: "4A" },
    { nama: "Fajar", nilai: 83, kelas: "4A" },
    { nama: "Gita", nilai: 82, kelas: "4A" },
    { nama: "Hadi", nilai: 81, kelas: "4A" },
    { nama: "Indra", nilai: 80, kelas: "4A" },
    { nama: "Jihan", nilai: 79, kelas: "4A" },
    { nama: "Kiki", nilai: 78, kelas: "4A" },
    { nama: "Lina", nilai: 77, kelas: "4A" },
    { nama: "Mira", nilai: 76, kelas: "4A" },
    { nama: "Nina", nilai: 75, kelas: "4A" },
    { nama: "Omar", nilai: 74, kelas: "4A" },
    { nama: "Putri", nilai: 73, kelas: "4A" },
    { nama: "Qori", nilai: 72, kelas: "4A" },
    { nama: "Rina", nilai: 71, kelas: "4A" },
    { nama: "Sari", nilai: 70, kelas: "4A" },
    { nama: "Tina", nilai: 69, kelas: "4A" },
  ].sort((a, b) => b.nilai - a.nilai); // Diurutkan dari nilai tertinggi ke terendah

  // === Pagination Logic ===
  const totalPages = Math.ceil(allSiswaData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const peringkatSiswaData = allSiswaData.slice(startIndex, endIndex).map((siswa, index) => ({
    ...siswa,
    nama: `#${startIndex + index + 1} ${siswa.nama}`
  }));

  // === Data Nilai Siswa per Mata Pelajaran ===
  const nilaiSiswaPerMapel = {
    matematika: [
      { nama: "Ahmad", nilai: 95 },
      { nama: "Budi", nilai: 88 },
      { nama: "Citra", nilai: 92 },
      { nama: "Dewi", nilai: 85 },
      { nama: "Eka", nilai: 90 },
      { nama: "Fajar", nilai: 87 },
      { nama: "Gita", nilai: 93 },
      { nama: "Hadi", nilai: 89 },
      { nama: "Indra", nilai: 91 },
      { nama: "Jihan", nilai: 86 },
      { nama: "Kiki", nilai: 86 },
    ],
    bindo: [
      { nama: "Ahmad", nilai: 88 },
      { nama: "Budi", nilai: 92 },
      { nama: "Citra", nilai: 85 },
      { nama: "Dewi", nilai: 90 },
      { nama: "Eka", nilai: 87 },
      { nama: "Fajar", nilai: 94 },
      { nama: "Gita", nilai: 89 },
      { nama: "Hadi", nilai: 91 },
      { nama: "Indra", nilai: 86 },
      { nama: "Jihan", nilai: 93 },
      { nama: "Kiki", nilai: 86 },
    ],
    ipa: [
      { nama: "Ahmad", nilai: 90 },
      { nama: "Budi", nilai: 85 },
      { nama: "Citra", nilai: 88 },
      { nama: "Dewi", nilai: 92 },
      { nama: "Eka", nilai: 87 },
      { nama: "Fajar", nilai: 89 },
      { nama: "Gita", nilai: 91 },
      { nama: "Hadi", nilai: 86 },
      { nama: "Indra", nilai: 94 },
      { nama: "Jihan", nilai: 88 },
      { nama: "Kiki", nilai: 86 },
    ],
    ips: [
      { nama: "Ahmad", nilai: 87 },
      { nama: "Budi", nilai: 91 },
      { nama: "Citra", nilai: 89 },
      { nama: "Dewi", nilai: 85 },
      { nama: "Eka", nilai: 93 },
      { nama: "Fajar", nilai: 88 },
      { nama: "Gita", nilai: 90 },
      { nama: "Hadi", nilai: 92 },
      { nama: "Indra", nilai: 86 },
      { nama: "Jihan", nilai: 89 },
      { nama: "Kiki", nilai: 86 },
    ],
    pkn: [
      { nama: "Ahmad", nilai: 92 },
      { nama: "Budi", nilai: 88 },
      { nama: "Citra", nilai: 90 },
      { nama: "Dewi", nilai: 94 },
      { nama: "Eka", nilai: 87 },
      { nama: "Fajar", nilai: 91 },
      { nama: "Gita", nilai: 85 },
      { nama: "Hadi", nilai: 89 },
      { nama: "Indra", nilai: 93 },
      { nama: "Jihan", nilai: 88 },
      { nama: "Kiki", nilai: 86 },
    ],
    pjok: [
      { nama: "Ahmad", nilai: 89 },
      { nama: "Budi", nilai: 93 },
      { nama: "Citra", nilai: 87 },
      { nama: "Dewi", nilai: 91 },
      { nama: "Eka", nilai: 88 },
      { nama: "Fajar", nilai: 90 },
      { nama: "Gita", nilai: 92 },
      { nama: "Hadi", nilai: 86 },
      { nama: "Indra", nilai: 89 },
      { nama: "Jihan", nilai: 94 },
      { nama: "Kiki", nilai: 86 },
    ],
    seni: [
      { nama: "Ahmad", nilai: 85 },
      { nama: "Budi", nilai: 88 },
      { nama: "Citra", nilai: 92 },
      { nama: "Dewi", nilai: 89 },
      { nama: "Eka", nilai: 91 },
      { nama: "Fajar", nilai: 87 },
      { nama: "Gita", nilai: 94 },
      { nama: "Hadi", nilai: 90 },
      { nama: "Indra", nilai: 86 },
      { nama: "Jihan", nilai: 93 },
      { nama: "Kiki", nilai: 86 },
    ],
    prakarya: [
      { nama: "Ahmad", nilai: 88 },
      { nama: "Budi", nilai: 85 },
      { nama: "Citra", nilai: 91 },
      { nama: "Dewi", nilai: 87 },
      { nama: "Eka", nilai: 89 },
      { nama: "Fajar", nilai: 92 },
      { nama: "Gita", nilai: 86 },
      { nama: "Hadi", nilai: 90 },
      { nama: "Indra", nilai: 88 },
      { nama: "Jihan", nilai: 93 },
      { nama: "Kiki", nilai: 86 },
    ],
  };

  // === Filter data berdasarkan mata pelajaran yang dipilih ===
  const allNilaiSiswaData = selectedMapel === "all" 
    ? [] // Tidak menampilkan data jika "Semua" dipilih
    : nilaiSiswaPerMapel[selectedMapel] || [];

  // === Pagination untuk data nilai siswa ===
  const totalPagesNilai = Math.ceil(allNilaiSiswaData.length / itemsPerPageNilai);
  const startIndexNilai = (currentPageNilai - 1) * itemsPerPageNilai;
  const endIndexNilai = startIndexNilai + itemsPerPageNilai;
  const nilaiSiswaData = allNilaiSiswaData.slice(startIndexNilai, endIndexNilai);

  // === Options untuk dropdown ===
  const mapelOptions = [
    { value: "all", label: "Pilih Mata Pelajaran" },
    { value: "matematika", label: "Matematika" },
    { value: "bindo", label: "B. Indonesia" },
    { value: "ipa", label: "IPA" },
    { value: "ips", label: "IPS" },
    { value: "pkn", label: "PKN" },
    { value: "pjok", label: "PJOK" },
    { value: "seni", label: "Seni Budaya" },
    { value: "prakarya", label: "Prakarya" },
  ];

  const kehadiranData = [
    { name: "Hadir", value: 28 },
    { name: "Sakit", value: 1 },
    { name: "Izin", value: 1 },
    { name: "Alpha", value: 0 },
  ];

  const catatanTerbaru = [
    {
      id: 1,
      nama: "Ahmad",
      kelas: "4A",
      catatan: "Sangat aktif dalam diskusi kelompok.",
      tanggal: "2025-09-20",
    },
    {
      id: 2,
      nama: "Citra",
      kelas: "4A",
      catatan: "Perlu lebih teliti dalam mengerjakan soal esai.",
      tanggal: "2025-09-20",
    },
    {
      id: 3,
      nama: "Budi",
      kelas: "4A",
      catatan: "Menunjukkan peningkatan dalam pelajaran Matematika.",
      tanggal: "2025-09-19",
    },
    {
      id: 4,
      nama: "Dewi",
      kelas: "4A",
      catatan: "Sering membantu teman yang kesulitan.",
      tanggal: "2025-09-18",
    },
    {
      id: 5,
      nama: "Eka",
      kelas: "4A",
      catatan: "Sangat aktif dalam diskusi kelompok.",
      tanggal: "2025-09-18",
    },
    {
      id: 6,
      nama: "Fajar",
      kelas: "4A",
      catatan: "Sangat giat dalam mengerjakan tugas.",
      tanggal: "2025-09-18",
    },
  ];

  // Batasi data catatan maksimal 6 item
  const catatanTampil = catatanTerbaru.slice(0, 6);

  // Kolom untuk tabel catatan
  const columns = [
    { key: "nama", label: "Nama Siswa" },
    { key: "kelas", label: "Kelas" },
    { key: "catatan", label: "Catatan" },
    { key: "tanggal", label: "Tanggal" },
  ];

  return (
    <div className="space-y-8">
      {/* Cards */}
      <ContentWrapper>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            icon={<FaUsers />}
            title="Total Siswa"
            value="30"
            label="Siswa di Kelas 4A"
          />
          <Card
            icon={<FaChild />}
            title="Siswa Laki-laki"
            value="16"
            label="Laki-laki"
          />
          <Card
            icon={<FaFemale />}
            title="Siswa Perempuan"
            value="14"
            label="Perempuan"
          />
        </div>
      </ContentWrapper>

      {/* Sesi Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart Peringkat Siswa dengan Pagination */}
        <ContentWrapper>
          <div className="space-y-4">
             <div className="flex items-center gap-3">
               <div className="p-2 bg-yellow-100 rounded-lg">
                 <FaTrophy className="w-5 h-5 text-yellow-600" />
               </div>
               <h3 className="text-lg font-semibold text-slate-800">
                 Peringkat Siswa Kelas 4A
               </h3>
             </div>
            
            {/* Chart Bar Horizontal */}
            <BarChartComponent
              data={peringkatSiswaData}
              title=""
              label="Nilai Rata-rata"
              horizontal={true}
              dataKey="nama"
              valueKey="nilai"
              backgroundColor="#3B82F6"
            />

             {/* Pagination Controls */}
             <div className="flex items-center justify-between pt-4 border-t border-slate-200">
               <button
                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                 disabled={currentPage === 1}
                 className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
               >
                 <FaChevronLeft className="w-3 h-3" />
                 Previous
               </button>
               
               <button
                 onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                 disabled={currentPage === totalPages}
                 className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
               >
                 Next
                 <FaChevronRight className="w-3 h-3" />
               </button>
             </div>
          </div>
        </ContentWrapper>

        {/* Chart Nilai Siswa per Mata Pelajaran */}
        <ContentWrapper>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FaChartLine className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">
                  {selectedMapel === "all" 
                    ? "Nilai Siswa per Mata Pelajaran" 
                    : `Nilai Siswa - ${mapelOptions.find(opt => opt.value === selectedMapel)?.label || "Mata Pelajaran"}`
                  }
                </h3>
              </div>
              
              {/* Dropdown Filter Mata Pelajaran */}
              <div className="w-48">
                <select
                  value={selectedMapel}
                  onChange={(e) => handleMapelChange(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
                >
                  {mapelOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {selectedMapel === "all" ? (
              <div className="flex items-center justify-center h-64 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
                <div className="text-center">
                  <FaChartLine className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-500 text-lg font-medium">Pilih Mata Pelajaran</p>
                  <p className="text-slate-400 text-sm">untuk melihat nilai siswa</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <BarChartComponent
                  data={nilaiSiswaData}
                  title=""
                  label="Nilai"
                  horizontal={true}
                  dataKey="nama"
                  valueKey="nilai"
                  backgroundColor="#10B981"
                />
                
                {/* Pagination Controls untuk Chart Nilai Siswa */}
                {totalPagesNilai > 1 && (
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <button
                      onClick={() => setCurrentPageNilai(prev => Math.max(prev - 1, 1))}
                      disabled={currentPageNilai === 1}
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <FaChevronLeft className="w-3 h-3" />
                      Previous
                    </button>
                    
                    <button
                      onClick={() => setCurrentPageNilai(prev => Math.min(prev + 1, totalPagesNilai))}
                      disabled={currentPageNilai === totalPagesNilai}
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                      <FaChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </ContentWrapper>
      </div>

      {/* Sesi Kehadiran dan Catatan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart - Kehadiran */}
            <div className="flex">
              <ContentWrapper className="w-full flex flex-col">
                <div className="space-y-4 flex-1 flex flex-col">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FaChartLine className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800">
                        Kehadiran Siswa Hari Ini
                      </h3>
                    </div>
                    <div className="text-sm text-slate-500">
                      {new Date().toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-md">
                  <PieChartComponent
                    data={kehadiranData}
                    title=""
                    chartHeight="280px"
                  />
                </div>
              </div>
            </div>
          </ContentWrapper>
        </div>

        {/* Data Table - Catatan */}
        <div className="flex">
          <ContentWrapper className="w-full flex flex-col">
            <div className="space-y-4 flex-1 flex flex-col">
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-emerald-100 rounded-lg">
                   <FaCommentDots className="w-5 h-5 text-emerald-600" />
                 </div>
                 <h3 className="text-lg font-semibold text-slate-800">
                   Catatan Siswa Terbaru
                 </h3>
               </div>
              <div className="flex-1 overflow-hidden rounded-lg border border-slate-200">
                <DataTable 
                  columns={columns} 
                  data={catatanTampil}
                  className="border-0 h-full"
                />
              </div>
            </div>
          </ContentWrapper>
        </div>
      </div>
    </div>
  );
}
