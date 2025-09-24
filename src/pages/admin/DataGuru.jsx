import DataMasterLayout from "../../components/layouts/DataMasterLayout";
import { FaUserCheck, FaUserTimes, FaUsers, FaPlus } from "react-icons/fa";
import { PiChalkboardTeacherFill } from "react-icons/pi";


export default function DataGuru() {
    // Filter options untuk kelas
    const kelasFilters = [
        { value: "", label: "Semua Kelas" },
        { value: "Kelas 1", label: "Kelas 1" },
        { value: "Kelas 2", label: "Kelas 2" },
        { value: "Kelas 3", label: "Kelas 3" },
        { value: "Kelas 4", label: "Kelas 4" },
        { value: "Kelas 5", label: "Kelas 5" },
        { value: "Kelas 6", label: "Kelas 6" }
    ];

    // Filter options untuk status
    const statusFilters = [
        { value: "", label: "Semua Status" },
        { value: "aktif", label: "Akun Aktif" },
        { value: "tidak-aktif", label: "Akun Tidak Aktif" }
    ];

    // Sample data untuk guru
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

    // Table columns
    const columns = [
        { key: 'no', label: 'No', sortable: false },
        { key: 'name', label: 'Nama', sortable: true }, 
        { key: 'nip', label: 'NIP', sortable: true },
        { key: 'Kelas', label: 'Kelas', sortable: true },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'actions', label: 'Aksi', sortable: false }
    ];

    // Statistics cards
    const statisticsCards = [
        {
            icon: <FaUsers />,
            title: "Total Guru",
            value: "25",
            label: "Guru"
        },
        {
            icon: <FaUserCheck />,
            title: "Aktif", 
            value: "450",
            label: "Aktif"
        },
        {
            icon: <FaUserTimes />,
            title: "Tidak Aktif",
            value: "18",
            label: "Tidak Aktif"
        }
    ];

    // Event handlers
    const handleEdit = (item) => {
        console.log('Edit guru:', item);
    };

    const handleDelete = (item) => {
        console.log('Delete guru:', item);
    };

    const handleAddClick = () => {
        console.log('Add guru clicked');
    };

    const handleSecondButtonClick = () => {
        console.log('Add many guru clicked');
    };

    return (
        <DataMasterLayout
            // Page configuration
            pageIcon={<PiChalkboardTeacherFill />}
            pageTitle="Data Guru"
            pageDescription="Kelola semua data guru"
            
            // Statistics cards
            statisticsCards={statisticsCards}
            
            // Search and filter configuration
            searchPlaceholder="Cari nama atau NIP."
            filterOptions={kelasFilters}
            secondFilterOptions={statusFilters}
            filterPlaceholder="Pilih Kelas"
            secondFilterPlaceholder="Pilih Status"
            showFilter={true}
            showSecondFilter={true}
            searchFields={['name', 'email', 'nip']}
            filterField="kelas"
            secondFilterField="status"
            
            // Button configuration
            showAddButton={true}
            addButtonText="Tambah Guru"
            onAddClick={handleAddClick}
            showSecondButton={true}
            secondButtonText="Tambah Banyak Guru"
            secondButtonIcon={<FaPlus />}
            secondButtonVariant="primary"
            onSecondButtonClick={handleSecondButtonClick}
            
            // Table configuration
            tableIcon={<PiChalkboardTeacherFill className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />}
            tableTitle="Daftar Guru"
            columns={columns}
            data={sampleUsers}
            
            // Event handlers
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
    );
}
  