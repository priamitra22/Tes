import DataMasterLayout from "../../components/layouts/DataMasterLayout";
import { FaUsers, FaPlus } from "react-icons/fa";
import { FaChild, FaFemale } from "react-icons/fa";
import { IoSchoolOutline } from "react-icons/io5";

export default function DataSiswa() {
    // Filter options untuk jenis kelamin
    const jenisKelaminFilters = [
        { value: "", label: "Semua Jenis Kelamin" },
        { value: "Laki-laki", label: "Laki-laki" },
        { value: "Perempuan", label: "Perempuan" },
    ];

    // Sample data untuk siswa
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
        { key: 'nisn', label: 'NISN', sortable: true },
        { key: 'nik', label: 'NIK', sortable: true },
        { key: 'jenisKelamin', label: 'Jenis Kelamin', sortable: true },
        { key: 'Tempat Lahir', label: 'Tempat Lahir', sortable: true },
        { key: 'Tanggal Lahir', label: 'Tanggal Lahir', sortable: true },
        { key: 'actions', label: 'Aksi', sortable: false }
    ];

    // Statistics cards
    const statisticsCards = [
        {
            icon: <FaUsers />,
            title: "Total Siswa",
            value: "25",
            label: "Siswa"
        },
        {
            icon: <FaChild />,
            title: "Laki-laki", 
            value: "450",
            label: "Laki-laki"
        },
        {
            icon: <FaFemale />,
            title: "Perempuan",
            value: "18",
            label: "Perempuan"
        }
    ];

    // Event handlers
    const handleEdit = (item) => {
        console.log('Edit siswa:', item);
    };

    const handleDelete = (item) => {
        console.log('Delete siswa:', item);
    };

    const handleAddClick = () => {
        console.log('Add siswa clicked');
    };

    const handleSecondButtonClick = () => {
        console.log('Add many siswa clicked');
    };

    return (
        <DataMasterLayout
            // Page configuration
            pageIcon={<IoSchoolOutline />}
            pageTitle="Data Siswa"
            pageDescription="Kelola semua data Siswa"
            
            // Statistics cards
            statisticsCards={statisticsCards}
            
            // Search and filter configuration
            searchPlaceholder="Cari nama NIK atau NISN."
            filterOptions={jenisKelaminFilters}
            filterPlaceholder="Jenis Kelamin"
            showFilter={true}
            showSecondFilter={false}
            searchFields={['name', 'email', 'nik', 'nisn']}
            filterField="jenisKelamin"
            
            // Button configuration
            showAddButton={true}
            addButtonText="Tambah Siswa"
            onAddClick={handleAddClick}
            showSecondButton={true}
            secondButtonText="Tambah Banyak Siswa"
            secondButtonIcon={<FaPlus />}
            secondButtonVariant="primary"
            onSecondButtonClick={handleSecondButtonClick}
            
            // Table configuration
            tableIcon={<IoSchoolOutline className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />}
            tableTitle="Daftar Siswa"
            columns={columns}
            data={sampleUsers}
            
            // Event handlers
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
    );
}
  