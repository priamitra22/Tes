// layouts/SidebarMenu.js
import {
  FaUser,
  FaUsers,
  FaBook,
  FaClipboardList,
  FaCalendarAlt,
  FaFileDownload,
  FaCommentDots,
  FaCogs,
} from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";

export const sidebarMenu = {
  admin: [
    { title: "Dashboard", icon: FaUser, to: "/admin/dashboard" },
    { title: "Akun Pengguna", icon: MdManageAccounts, to: "/admin/akun-pengguna" },
    {
      title: "Data Master",
      icon: FaCogs,
      subMenu: [
        { title: "Data Guru", to: "/admin/data/guru" },
        { title: "Data Siswa", to: "/admin/data/siswa" },
        { title: "Data Orangtua", to: "/admin/data/ortu" },
      ],
    },
    { title: "Kelas & Mapel", icon: FaBook, to: "/admin/classes" },
    { title: "Tahun Ajaran", icon: FaCalendarAlt, to: "/admin/tahun-ajaran" },
    {
      title: "Laporan Nilai",
      icon: FaFileDownload,
      to: "/admin/laporan-nilai",
    },
  ],
  guru: [
    { title: "Dashboard", icon: FaUser, to: "/guru/dashboard" },
    { title: "Kelas Saya", icon: FaUsers, to: "/guru/kelas" },
    { title: "Absensi", icon: FaClipboardList, to: "/guru/absensi" },
    { title: "Catatan", icon: FaCommentDots, to: "/guru/catatan" },
    { title: "Laporan", icon: FaFileDownload, to: "/guru/laporan" },
  ],
  ortu: [
    { title: "Dashboard", icon: FaUser, to: "/ortu/dashboard" },
    { title: "Nilai Anak", icon: FaBook, to: "/ortu/nilai" },
    { title: "Absensi Anak", icon: FaClipboardList, to: "/ortu/absensi" },
    { title: "Catatan Anak", icon: FaCommentDots, to: "/ortu/catatan-anak" },
    { title: "Profil Anak", icon: FaUsers, to: "/ortu/profil-anak" },
    { title: "Laporan Anak", icon: FaFileDownload, to: "/ortu/laporan" },
  ],
};
