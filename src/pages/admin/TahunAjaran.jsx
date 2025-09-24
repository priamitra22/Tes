import ContentWrapper from "../../components/ui/ContentWrapper";
import PageHeader from "../../components/ui/PageHeader";
import SearchBar from "../../components/ui/SearchBar";
import Button from "../../components/ui/Button";
import DataTable from "../../components/ui/DataTable";
import Pagination from "../../components/ui/Pagination";
import { FaTrash, FaCalendarAlt, FaPlus } from "react-icons/fa";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdOutlineClass } from "react-icons/md";
import { useState } from "react";

  export default function TahunAjaran() {
    // // State untuk pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);


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


    // // Pagination logic
    const totalPages = Math.ceil(sampleUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = sampleUsers.slice(startIndex, endIndex);

    // // Table columns
    const columns = [
        { key: 'no', label: 'No', sortable: false },
        { key: 'nama_tahun_ajaran', label: 'Nama Tahun Ajaran', sortable: true }, 
        { key: 'semester', label: 'Semester', sortable: true },
        { key: 'tanggal_mulai', label: 'Tanggal Mulai', sortable: true },
        { key: 'tanggal_selesai', label: 'Tanggal Selesai', sortable: true },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'actions', label: 'Aksi', sortable: false }
    ];

    // // Table data dengan actions
    const tableData = currentUsers.map((user, index) => ({
        ...user,
        no: startIndex + index + 1,
        actions: (
            <div className="flex gap-2">
                <Button
                    variant="primary"
                    size="sm"
                    icon={<IoCheckmarkCircle   />}
                    ariaLabel="Aktifkan"
                >
                </Button>
                <Button
                    variant="danger"
                    size="sm"
                    icon={<FaTrash />}
                    ariaLabel="Hapus"
                >
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
            icon={<FaCalendarAlt  />}
            title="Manajemen Tahun Ajaran"
            description="Kelola tahun ajaran"
          />
        </div>
      </ContentWrapper>


{/* Data Table Section */}
<div className="mt-6 sm:mt-8">
<ContentWrapper>
  <div className="space-y-4 sm:space-y-6">
           {/* Table Header - Responsive */}
           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
               <div className="flex items-center gap-2 sm:gap-3">
                 <div className="p-1.5 sm:p-2 bg-emerald-100 rounded-lg flex-shrink-0">
                   <FaCalendarAlt className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                 </div>
                 <div className="min-w-0 flex-1">
                   <h3 className="text-base sm:text-lg font-semibold text-slate-800 truncate">Daftar Tahun Ajaran</h3>
                   <div className="flex items-center gap-2 mt-1">
                     <p className="text-xs sm:text-sm text-slate-600 truncate">
                       Menampilkan {currentUsers.length} dari {sampleUsers.length} tahun ajaran
                     </p>
                   </div>
                 </div>
               </div>
               
               {/* Tombol Tambah Tahun Ajaran */}
               <div className="flex-shrink-0">
                 <Button
                   variant="primary"
                   size="sm"
                   icon={<FaPlus />}
                   onClick={() => console.log('Tambah Tahun Ajaran clicked')}
                 >
                   Tambah Tahun Ajaran
                 </Button>
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
  