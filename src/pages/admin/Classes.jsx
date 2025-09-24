import ContentWrapper from "../../components/ui/ContentWrapper";
import PageHeader from "../../components/ui/PageHeader";
import SearchBar from "../../components/ui/SearchBar";
import Button from "../../components/ui/Button";
import DataTable from "../../components/ui/DataTable";
import Pagination from "../../components/ui/Pagination";
import { FaTrash, FaCog  } from "react-icons/fa";
import { IoSettings} from "react-icons/io5";
import { MdOutlineClass } from "react-icons/md";
import { useState } from "react";

export default function Classes() {
    // State untuk search dan filter
    const [filter, setFilter] = useState("");
    const [secondFilter, setSecondFilter] = useState("");
    
    // // State untuk pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Filter options untuk role
    const tahunAjaranFilters = [
          { value: "", label: "Semua Tahun Ajaran" },
          { value: "Tahun Ajaran 2024/2025", label: "Tahun Ajaran 2024/2025" },
          { value: "Tahun Ajaran 2025/2026", label: "Tahun Ajaran 2025/2026" },
          { value: "Tahun Ajaran 2026/2027", label: "Tahun Ajaran 2026/2027" },
          { value: "Tahun Ajaran 2027/2028", label: "Tahun Ajaran 2027/2028" },
          { value: "Tahun Ajaran 2028/2029", label: "Tahun Ajaran 2028/2029" },
          { value: "Tahun Ajaran 2029/2030", label: "Tahun Ajaran 2029/2030" },
          { value: "Tahun Ajaran 2030/2031", label: "Tahun Ajaran 2030/2031" },
        ];

    // Filter options untuk status
    const semesterFilters = [
        { value: "", label: "Semua Semester" },
        { value: "Ganjil", label: "Ganjil" },
        { value: "Genap", label: "Genap" }
    ];

    // // Sample data untuk akun pengguna
    const sampleUsers = [
        { id: 1, name: "Tahun Ajaran 2024/2025", email: "admin@sekolah.com", role: "admin", status: "aktif", lastLogin: "2024-01-15" },
        { id: 2, name: "Tahun Ajaran 2025/2026", email: "guru.math@sekolah.com", role: "guru", status: "aktif", lastLogin: "2024-01-14" },
        { id: 3, name: "Tahun Ajaran 2025/2026", email: "ortu.ahmad@email.com", role: "orangtua", status: "aktif", lastLogin: "2024-01-13" },
        { id: 4, name: "Tahun Ajaran 2026/2027", email: "guru.bahasa@sekolah.com", role: "guru", status: "tidak-aktif", lastLogin: "2024-01-10" },
        { id: 5, name: "Tahun Ajaran 2027/2028", email: "admin.sistem@sekolah.com", role: "admin", status: "aktif", lastLogin: "2024-01-15" },
        { id: 6, name: "Orangtua Siti", email: "ortu.siti@email.com", role: "orangtua", status: "aktif", lastLogin: "2024-01-12" },
        { id: 7, name: "Guru IPA", email: "guru.ipa@sekolah.com", role: "guru", status: "aktif", lastLogin: "2024-01-14" },
        { id: 8, name: "Orangtua Budi", email: "ortu.budi@email.com", role: "orangtua", status: "tidak-aktif", lastLogin: "2024-01-08" }
    ];

    // Filter data berdasarkan search dan filter
    const filteredUsers = sampleUsers.filter(user => {
        const matchesRole = !filter || user.role === filter;
        const matchesStatus = !secondFilter || user.status === secondFilter;
        
        return  matchesRole && matchesStatus;
    });

    // // Pagination logic
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    // // Table columns
    const columns = [
        { key: 'no', label: 'No', sortable: false },
        { key: 'nama_kelas', label: 'Nama Kelas', sortable: true }, 
        { key: 'wali_kelas', label: 'Wali Kelas', sortable: true },
        { key: 'jumlah_mapel', label: 'Jumlah Mapel', sortable: true },
        { key: 'actions', label: 'Aksi', sortable: false }
    ];

    // // Table data dengan actions
    const tableData = currentUsers.map((user, index) => ({
        ...user,
        no: startIndex + index + 1,
        actions: (
            <div className="flex gap-2">
                <Button
                    variant="info"
                    size="sm"
                    icon={<IoSettings />}
                    ariaLabel="Kelola"
                >
                    Kelola
                </Button>
                <Button
                    variant="primary"
                    size="sm"
                    icon={<FaCog  />}
                    ariaLabel="Edit"
                >
                    Edit
                </Button>
                <Button
                    variant="danger"
                    size="sm"
                    icon={<FaTrash />}
                    ariaLabel="Hapus"
                >
                    Hapus
                </Button>
            </div>
        )
    }));

    return (
        <>
        <ContentWrapper>
        <div className="space-y-6">
          {/* Judul Halaman */}
          <PageHeader
            icon={<MdOutlineClass  />}
            title="Manajemen Kelas"
            description="Kelola kelas, mata pelajaran dan guru pengampu"
          />
        </div>
      </ContentWrapper>


{/* Search Section */}
      <div className="mt-6 sm:mt-8">
  <div className="space-y-3 sm:space-y-4">
    
    <SearchBar
      filter={filter}
      setFilter={setFilter}
      filters={tahunAjaranFilters}
      secondFilter={secondFilter}
      setSecondFilter={setSecondFilter}
      secondFilters={semesterFilters}
      filterPlaceholder="Tahun Ajaran"
      secondFilterPlaceholder="Semester"
      hideSearch={true}
      showFilter={true}
      showSecondFilter={true}
      showAddButton={true}
      addButtonText="Tambah Kelas"
      onAddClick={() => console.log('Add account clicked')}
    />
  </div>
</div>

{/* Data Table Section */}
<div className="mt-6 sm:mt-8">
<ContentWrapper>
  <div className="space-y-4 sm:space-y-6">
           {/* Table Header - Responsive */}
           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
               <div className="flex items-center gap-2 sm:gap-3">
                 <div className="p-1.5 sm:p-2 bg-emerald-100 rounded-lg flex-shrink-0">
                   <MdOutlineClass className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                 </div>
                 <div className="min-w-0 flex-1">
                   <h3 className="text-base sm:text-lg font-semibold text-slate-800 truncate">Daftar Kelas</h3>
                   <div className="flex items-center gap-2 mt-1">
                     <p className="text-xs sm:text-sm text-slate-600 truncate">
                       Menampilkan {currentUsers.length} dari {filteredUsers.length} kelas
                     </p>
                   </div>
                 </div>
               </div>
           </div>

    {/* Data Table */}
    <DataTable
      columns={columns}
      data={tableData}
      className="mt-6"
    />

    {/* Pagination Controls - Responsive */}
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-end">
      {/* Per halaman - Bawah Kiri */}
      <div className="flex items-center gap-2">
        <span className="text-xs sm:text-sm text-slate-600 whitespace-nowrap">Per halaman:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="px-2 sm:px-3 py-1.5 sm:py-2 border border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white min-w-0"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* Pagination - Bawah Kanan */}
      {totalPages > 1 && (
        <div className="flex justify-center sm:justify-end">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            className="scale-90 sm:scale-100"
          />
        </div>
      )}
    </div>
  </div>
</ContentWrapper>
</div>
      
      </>
    );
  }
  