import ContentWrapper from "../../components/ui/ContentWrapper";
import Card from "../../components/ui/Card";
import PageHeader from "../../components/ui/PageHeader";
// DIUBAH: Menambahkan ikon baru dan menghapus yang tidak perlu
import { FaClipboardUser, FaCheck, FaXmark, FaBriefcaseMedical, FaFileLines } from "react-icons/fa6"; 
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/id';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('id');
const localizer = momentLocalizer(moment);

export default function AbsensiAnak() {
    // === Data Dummy ===
    const rekapAbsensi = {
        hadir: 18,
        sakit: 1,
        izin: 1,
        alpha: 1,
    };

    const attendanceEvents = [
        // Minggu ini
        { title: 'Hadir', start: new Date(2025, 8, 22), end: new Date(2025, 8, 22), allDay: true, status: 'hadir' },
        { title: 'Hadir', start: new Date(2025, 8, 23), end: new Date(2025, 8, 23), allDay: true, status: 'hadir' },
        
        // Minggu lalu
        { title: 'Alpha', start: new Date(2025, 8, 15), end: new Date(2025, 8, 15), allDay: true, status: 'alpha' },
        { title: 'Hadir', start: new Date(2025, 8, 16), end: new Date(2025, 8, 16), allDay: true, status: 'hadir' },
        { title: 'Izin', start: new Date(2025, 8, 17), end: new Date(2025, 8, 17), allDay: true, status: 'izin' },
        { title: 'Hadir', start: new Date(2025, 8, 18), end: new Date(2025, 8, 18), allDay: true, status: 'hadir' },
        { title: 'Sakit', start: new Date(2025, 8, 19), end: new Date(2025, 8, 19), allDay: true, status: 'sakit' },
    ];
    
    // Fungsi untuk memberi warna pada event kalender
    const eventPropGetter = (event) => {
        const statusStyles = {
            hadir: { backgroundColor: '#10B981', borderColor: '#10B981' },
            sakit: { backgroundColor: '#F59E0B', borderColor: '#F59E0B' },
            izin: { backgroundColor: '#3B82F6', borderColor: '#3B82F6' },
            alpha: { backgroundColor: '#EF4444', borderColor: '#EF4444' },
        };
        return { style: statusStyles[event.status] || {} };
    };

    return (
        <div className="space-y-6">
            <PageHeader
                icon={<FaClipboardUser />}
                title="Riwayat Absensi Anak"
                description="Lihat rekapitulasi dan detail kehadiran anak Anda di sekolah."
            />

            {/* Ringkasan Absensi */}
            <ContentWrapper>
                <h3 className="text-lg font-bold text-slate-800 mb-4">Rekap Absensi Bulan Ini (September 2025)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card icon={<FaCheck />} title="Total Hadir" value={rekapAbsensi.hadir} label="Hari" />
                    {/* DIUBAH: Mengganti ikon Sakit */}
                    <Card icon={<FaBriefcaseMedical />} title="Total Sakit" value={rekapAbsensi.sakit} label="Hari" />
                    {/* DIUBAH: Mengganti ikon Izin */}
                    <Card icon={<FaFileLines />} title="Total Izin" value={rekapAbsensi.izin} label="Hari" />
                    <Card icon={<FaXmark />} title="Total Alpha" value={rekapAbsensi.alpha} label="Hari" />
                </div>
            </ContentWrapper>
            
            {/* Kalender Absensi */}
            <ContentWrapper>
                <h3 className="text-lg font-bold text-slate-800 mb-4">Kalender Kehadiran</h3>
                <div className="h-[60vh] p-2 bg-slate-50 rounded-lg border">
                    <Calendar
                        localizer={localizer}
                        events={attendanceEvents}
                        startAccessor="start"
                        endAccessor="end"
                        eventPropGetter={eventPropGetter}
                        views={['month']} // Hanya menampilkan view bulan
                    />
                </div>
            </ContentWrapper>
        </div>
    );
}