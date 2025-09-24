import DataMasterLayout from "../../components/layouts/DataMasterLayout";
import { FaUserTie, FaUsers, FaPlus } from "react-icons/fa";
import { RiParentFill } from "react-icons/ri";
import { IoWomanOutline } from "react-icons/io5";
import { FaUserShield } from "react-icons/fa6";

export default function DataOrtu() {
    // Filter options untuk relasi
    const relasiFilters = [
        { value: "", label: "Semua Relasi" },
        { value: "Ayah", label: "Ayah" },
        { value: "Ibu", label: "Ibu" },
        { value: "Wali", label: "Wali" },
    ];

    // Sample data untuk orangtua
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
        { key: 'nik', label: 'NIK', sortable: true },
        { key: 'kontak', label: 'Kontak', sortable: true },
        { key: 'relasi', label: 'Relasi', sortable: true },
        { key: 'anak', label: 'Anak', sortable: true },
        { key: 'jumlah_anak', label: 'Jumlah Anak', sortable: true },
        { key: 'actions', label: 'Aksi', sortable: false }
    ];

    // Statistics cards
    const statisticsCards = [
        {
            icon: <FaUsers />,
            title: "Total Orangtua",
            value: "25",
            label: "Orangtua",
            compact: true,
            allowMultiLine: true
        },
        {
            icon: <FaUserTie />,
            title: "Jumlah Ayah", 
            value: "450",
            label: "Ayah",
            compact: true,
            allowMultiLine: true
        },
        {
            icon: <IoWomanOutline />,
            title: "Jumlah Ibu",
            value: "18",
            label: "Ibu",
            compact: true,
            allowMultiLine: true
        },
        {
            icon: <FaUserShield />,
            title: "Jumlah Wali",
            value: "18",
            label: "Wali",
            compact: true,
            allowMultiLine: true
        }
    ];

    // Event handlers
    const handleEdit = (item) => {
        console.log('Edit orangtua:', item);
    };

    const handleDelete = (item) => {
        console.log('Delete orangtua:', item);
    };

    const handleAddClick = () => {
        console.log('Add orangtua clicked');
    };

    const handleSecondButtonClick = () => {
        console.log('Add many orangtua clicked');
    };

    return (
        <DataMasterLayout
            // Page configuration
            pageIcon={<RiParentFill />}
            pageTitle="Data Orangtua"
            pageDescription="Kelola semua data orangtua"
            
            // Statistics cards
            statisticsCards={statisticsCards}
            
            // Search and filter configuration
            searchPlaceholder="Cari nama atau NIK."
            filterOptions={relasiFilters}
            filterPlaceholder="Pilih Relasi"
            showFilter={true}
            showSecondFilter={false}
            searchFields={['name', 'email', 'nik']}
            filterField="relasi"
            
            // Button configuration
            showAddButton={true}
            addButtonText="Tambah Orangtua"
            onAddClick={handleAddClick}
            showSecondButton={true}
            secondButtonText="Tambah Banyak Orangtua"
            secondButtonIcon={<FaPlus />}
            secondButtonVariant="primary"
            onSecondButtonClick={handleSecondButtonClick}
            
            // Table configuration
            tableIcon={<RiParentFill className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />}
            tableTitle="Daftar Orangtua"
            columns={columns}
            data={sampleUsers}
            
            // Event handlers
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
    );
}
  