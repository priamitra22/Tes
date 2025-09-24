import ContentWrapper from "../../components/ui/ContentWrapper";
import Card from "../../components/ui/Card";
import PageHeader from "../../components/ui/PageHeader";
import SearchBar from "../../components/ui/SearchBar";
import Button from "../../components/ui/Button";
import DataTable from "../../components/ui/DataTable";
import Pagination from "../../components/ui/Pagination";
import { FaUserCheck, FaUserTimes, FaUsers, FaUserCog, FaPlus, FaDownload, FaSync, FaEdit, FaTrash, FaEye, FaList, FaInfoCircle } from "react-icons/fa";
import { useState } from "react";

export default function AkunPengguna() {
    // State untuk search dan filter
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [secondFilter, setSecondFilter] = useState("");
    
    // // State untuk pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Filter options untuk role
    const roleFilters = [
        { value: "", label: "Semua Role" },
        { value: "admin", label: "Admin" },
        { value: "guru", label: "Guru" },
        { value: "orangtua", label: "Orangtua" }
    ];

    // Filter options untuk status
    const statusFilters = [
        { value: "", label: "Semua Status" },
        { value: "aktif", label: "Akun Aktif" },
        { value: "tidak-aktif", label: "Akun Tidak Aktif" }
    ];

    // // Sample data untuk akun pengguna
    const sampleUsers = [
        { id: 1, name: "Admin Utama", email: "admin@sekolah.com", role: "admin", status: "aktif", lastLogin: "2024-01-15" },
        { id: 2, name: "Guru Matematika", email: "guru.math@sekolah.com", role: "guru", status: "aktif", lastLogin: "2024-01-14" },
        { id: 3, name: "Orangtua Ahmad", email: "ortu.ahmad@email.com", role: "orangtua", status: "aktif", lastLogin: "2024-01-13" },
        { id: 4, name: "Guru Bahasa", email: "guru.bahasa@sekolah.com", role: "guru", status: "tidak-aktif", lastLogin: "2024-01-10" },
        { id: 5, name: "Admin Sistem", email: "admin.sistem@sekolah.com", role: "admin", status: "aktif", lastLogin: "2024-01-15" },
        { id: 6, name: "Orangtua Siti", email: "ortu.siti@email.com", role: "orangtua", status: "aktif", lastLogin: "2024-01-12" },
        { id: 7, name: "Guru IPA", email: "guru.ipa@sekolah.com", role: "guru", status: "aktif", lastLogin: "2024-01-14" },
        { id: 8, name: "Orangtua Budi", email: "ortu.budi@email.com", role: "orangtua", status: "tidak-aktif", lastLogin: "2024-01-08" }
    ];

    // Filter data berdasarkan search dan filter
    const filteredUsers = sampleUsers.filter(user => {
        const matchesSearch = !search || 
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()) ||
            user.role.toLowerCase().includes(search.toLowerCase());
        
        const matchesRole = !filter || user.role === filter;
        const matchesStatus = !secondFilter || user.status === secondFilter;
        
        return matchesSearch && matchesRole && matchesStatus;
    });

    // // Pagination logic
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    // // Table columns
    const columns = [
        { key: 'no', label: 'No', sortable: false },
        { key: 'name', label: 'Nama', sortable: true }, 
        { key: 'nip/nik', label: 'NIP/NIK', sortable: true },
        { key: 'role', label: 'Role', sortable: true },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'lastLogin', label: 'Login Terakhir', sortable: true },
        { key: 'actions', label: 'Aksi', sortable: false }
    ];

    // // Table data dengan actions
    const tableData = currentUsers.map((user, index) => ({
        ...user,
        no: startIndex + index + 1,
        status: (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                user.status === 'aktif' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
            }`}>
                {user.status === 'aktif' ? 'Aktif' : 'Tidak Aktif'}
            </span>
        ),
        role: (
            <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                user.role === 'admin' 
                    ? 'bg-purple-100 text-purple-800'
                    : user.role === 'guru'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-orange-100 text-orange-800'
            }`}>
                {user.role === 'admin' ? 'Admin' : user.role === 'guru' ? 'Guru' : 'Orangtua'}
            </span>
        ),
        actions: (
            <div className="flex gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    icon={<FaEdit />}
                    ariaLabel="Edit Akun"
                />
                <Button
                    variant="ghost"
                    size="sm"
                    icon={<FaTrash />}
                    ariaLabel="Hapus Akun"
                />
            </div>
        )
    }));

    return (
        <>
        <ContentWrapper>
        <div className="space-y-6">
          {/* Judul Halaman */}
          <PageHeader
            icon={<FaUserCog />}
            title="Manajemen Akun Pengguna"
            description="Kelola semua akun pengguna sistem"
          />
          {/* Horizontal Cards - Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
              icon={<FaUsers />}
              title="Total Akun"
              value="25"
              label="Total Akun"
            />
            <Card
              icon={<FaUserCheck />}
              title="Akun Aktif" 
              value="450"
              label="Aktif"
            />
            <Card
              icon={<FaUserTimes />}
              title="Akun Tidak Aktif"
              value="18"
              label="Tidak Aktif"
            />
          </div>
        </div>
      </ContentWrapper>


{/* Search Section */}
      <div className="mt-6 sm:mt-8">
  <div className="space-y-3 sm:space-y-4">
    
    <SearchBar
      search={search}
      setSearch={setSearch}
      filter={filter}
      setFilter={setFilter}
      filters={roleFilters}
      secondFilter={secondFilter}
      setSecondFilter={setSecondFilter}
      secondFilters={statusFilters}
      filterPlaceholder="Pilih Role"
      secondFilterPlaceholder="Pilih Status"
      placeholder="Cari nama atau NIP/NISN."
      onSearch={(query) => console.log('Search:', query)}
      showFilter={true}
      showSecondFilter={true}
      showAddButton={true}
      addButtonText="Tambah Akun"
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
                   <FaUserCog className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                 </div>
                 <div className="min-w-0 flex-1">
                   <h3 className="text-base sm:text-lg font-semibold text-slate-800 truncate">Daftar Akun Pengguna</h3>
                   <div className="flex items-center gap-2 mt-1">
                     <p className="text-xs sm:text-sm text-slate-600 truncate">
                       Menampilkan {currentUsers.length} dari {filteredUsers.length} akun
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
  