import ContentWrapper from "../../components/ui/ContentWrapper";
import Card from "../../components/ui/Card";
import PageHeader from "../../components/ui/PageHeader";
import DataTable from "../../components/ui/DataTable";
import FilterDropdown from "../../components/ui/FilterDropdown";
import { useState } from "react";
import { FaBook, FaTrophy, FaArrowUp, FaArrowDown } from "react-icons/fa6";

export default function NilaiAnak() {
  // === State ===
  const [selectedTahun, setSelectedTahun] = useState("2025/2026");
  const [selectedSemester, setSelectedSemester] = useState("ganjil");

  // === Data Dummy dengan Riwayat ===
  const tahunAjaranOptions = [
    { value: "2025/2026", label: "T.A 2025/2026" },
    { value: "2024/2025", label: "T.A 2024/2025" },
  ];

  const semesterOptions = [
    { value: "ganjil", label: "Semester Ganjil" },

    { value: "genap", label: "Semester Genap" },
  ];

  const dataNilaiHistory = {
    "2025/2026": {
      ganjil: {
        rataRata: 87,
        peringkat: 3,
        nilaiTertinggi: { mapel: "PKN", nilai: 95 },
        nilaiTerendah: { mapel: "Matematika", nilai: 78 },
        nilaiPerMapel: [
          {
            id: 1,
            mapel: "Matematika",
            tgs1: 80,
            tgs2: 75,
            uts: 82,
            uas: 75,
            akhir: 78,
          },
          {
            id: 2,
            mapel: "B. Indonesia",
            tgs1: 90,
            tgs2: 88,
            uts: 85,
            uas: 90,
            akhir: 88,
          },
          {
            id: 3,
            mapel: "IPA",
            tgs1: 88,
            tgs2: 85,
            uts: 90,
            uas: 86,
            akhir: 87,
          },
          {
            id: 4,
            mapel: "IPS",
            tgs1: 85,
            tgs2: 90,
            uts: 88,
            uas: 89,
            akhir: 88,
          },
          {
            id: 5,
            mapel: "PKN",
            tgs1: 92,
            tgs2: 95,
            uts: 94,
            uas: 95,
            akhir: 95,
          },
        ],
      },
      genap: {
        rataRata: 89,
        peringkat: 2,
        nilaiTertinggi: { mapel: "IPA", nilai: 96 },
        nilaiTerendah: { mapel: "B. Indonesia", nilai: 82 },
        nilaiPerMapel: [
          {
            id: 1,
            mapel: "Matematika",
            tgs1: 85,
            tgs2: 88,
            uts: 90,
            uas: 92,
            akhir: 89,
          },
          {
            id: 2,
            mapel: "B. Indonesia",
            tgs1: 80,
            tgs2: 82,
            uts: 85,
            uas: 81,
            akhir: 82,
          },
          {
            id: 3,
            mapel: "IPA",
            tgs1: 95,
            tgs2: 96,
            uts: 95,
            uas: 97,
            akhir: 96,
          },
        ],
      },
    },
    "2024/2025": {
      ganjil: {
        rataRata: 85,
        peringkat: 25,
        nilaiTertinggi: { mapel: "IPS", nilai: 92 },
        nilaiTerendah: { mapel: "IPA", nilai: 75 },
        nilaiPerMapel: [
          {
            id: 1,
            mapel: "Matematika",
            tgs1: 82,
            tgs2: 80,
            uts: 85,
            uas: 88,
            akhir: 84,
          },
          {
            id: 2,
            mapel: "B. Indonesia",
            tgs1: 88,
            tgs2: 85,
            uts: 86,
            uas: 87,
            akhir: 87,
          },
          {
            id: 3,
            mapel: "IPA",
            tgs1: 75,
            tgs2: 78,
            uts: 76,
            uas: 77,
            akhir: 76,
          },
        ],
      },
      genap: {
        rataRata: 86,
        peringkat: 4,
        nilaiTertinggi: { mapel: "PKN", nilai: 94 },
        nilaiTerendah: { mapel: "IPA", nilai: 78 },
        nilaiPerMapel: [
          {
            id: 1,
            mapel: "Matematika",
            tgs1: 85,
            tgs2: 84,
            uts: 88,
            uas: 86,
            akhir: 86,
          },
          {
            id: 2,
            mapel: "B. Indonesia",
            tgs1: 90,
            tgs2: 88,
            uts: 85,
            uas: 89,
            akhir: 88,
          },
        ],
      },
    },
  };

  const dataTampil = dataNilaiHistory[selectedTahun]?.[selectedSemester] || {
    nilaiPerMapel: [],
    nilaiTertinggi: {},
    nilaiTerendah: {},
  };

  const columns = [
    { key: "mapel", label: "Mata Pelajaran" },
    { key: "tgs1", label: "Tugas 1" },
    { key: "tgs2", label: "Tugas 2" },
    { key: "uts", label: "UTS" },
    { key: "uas", label: "UAS" },
    { key: "akhir", label: "Nilai Akhir" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<FaBook />}
        title="Rincian Nilai Anak"
        description="Lihat detail dan riwayat nilai akademik anak Anda."
      />

      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            icon={<FaTrophy />}
            title="Nilai Rata-rata"
            value={dataTampil.rataRata || "-"}
            allowMultiLine={true}
          />
          <Card
            icon={<FaArrowUp />}
            title="Nilai Tertinggi"
            value={dataTampil.nilaiTertinggi.nilai || "-"}
            allowMultiLine={true}
          />
          <Card
            icon={<FaArrowDown />}
            title="Nilai Terendah"
            value={dataTampil.nilaiTerendah.nilai || "-"}
            allowMultiLine={true}
          />
          <Card
            icon={<FaTrophy />}
            title="Peringkat di Kelas"
            value={dataTampil.peringkat ? `#${dataTampil.peringkat}` : "-"}
            allowMultiLine={true}
          />
        </div>
      </ContentWrapper>

      <ContentWrapper>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h3 className="text-lg font-bold text-slate-800">
            Detail Nilai per Mata Pelajaran
          </h3>
          <div className="flex gap-3">
            {/* Filter Tahun Ajaran */}
            <FilterDropdown
              options={tahunAjaranOptions}
              value={selectedTahun}
              onChange={(e) => setSelectedTahun(e.target.value)}
              className="w-full sm:w-40"
            />
            {/* Filter Semester */}
            <FilterDropdown
              options={semesterOptions}
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full sm:w-48"
            />
          </div>
        </div>
        <DataTable columns={columns} data={dataTampil.nilaiPerMapel} />
      </ContentWrapper>
    </div>
  );
}
