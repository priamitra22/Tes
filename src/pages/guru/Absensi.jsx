import { useState } from "react";
import ContentWrapper from "../../components/ui/ContentWrapper";
import DataTable from "../../components/ui/DataTable";
import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";
import AttendanceRadioButton from "../../components/ui/AttendanceRadioButton";
import { FaClipboardUser, FaCalendarDays, FaCheck, FaPenToSquare, FaUsers, FaMugSaucer } from "react-icons/fa6";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/id';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

moment.locale('id');

const localizer = momentLocalizer(moment);

// Komponen untuk tampilan hari libur
const HolidayView = ({ selectedDate }) => (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
        <div className="p-4 bg-emerald-100 rounded-full mb-4">
            <FaMugSaucer className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-700">Hari Libur</h3>
        <p className="text-slate-500 mt-1">
            {/* DIUBAH: Menghilangkan nama hari */}
            Tidak ada absensi pada tanggal {moment(selectedDate).format('D MMMM YYYY')}.
        </p>
    </div>
);


// Komponen untuk Tampilan Input Absensi
const InputView = ({ students, handleStatusChange, selectedDate, setSelectedDate, markAllPresent }) => {
  const columns = [
    { key: 'no', label: 'No' },
    { key: 'nama', label: 'Nama Siswa' },
    { key: 'status', label: 'Status Kehadiran' },
  ];

  const tableData = students.map((siswa, index) => ({
    ...siswa,
    no: index + 1,
    status: (
      <div className="flex gap-2.5">
        <AttendanceRadioButton studentId={siswa.id} status="Hadir" currentStatus={siswa.status} setStatus={handleStatusChange} />
        <AttendanceRadioButton studentId={siswa.id} status="Sakit" currentStatus={siswa.status} setStatus={handleStatusChange} />
        <AttendanceRadioButton studentId={siswa.id} status="Izin" currentStatus={siswa.status} setStatus={handleStatusChange} />
        <AttendanceRadioButton studentId={siswa.id} status="Alpha" currentStatus={siswa.status} setStatus={handleStatusChange} />
      </div>
    )
  }));
  
  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl mb-6">
        <div className="flex items-center gap-3">
            <h3 className="text-base font-semibold text-slate-700">Pilih Tanggal Absen:</h3>
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                filterDate={isWeekday}
                dateFormat="d MMMM yyyy"
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full sm:w-auto"
                popperPlacement="bottom-start"
                locale="id"
            />
        </div>
        {isWeekday(selectedDate) && (
             <div className="flex gap-3">
                <Button variant="secondary" icon={<FaUsers />} onClick={markAllPresent}>
                    Tandai Semua Hadir
                </Button>
                <Button variant="primary" icon={<FaCheck />} ariaLabel="Simpan Absensi">
                    Simpan Absensi
                </Button>
            </div>
        )}
      </div>
      
      {isWeekday(selectedDate) ? (
        <DataTable columns={columns} data={tableData} />
      ) : (
        <HolidayView selectedDate={selectedDate} />
      )}
    </div>
  );
};

// ... (Sisa kode tidak berubah)
const RekapView = ({ attendanceEvents }) => (
    <div>
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Rekap Absensi Kelas</h3>
      <div className="h-[500px] p-2 bg-slate-50 rounded-lg border">
        <Calendar
          localizer={localizer}
          events={attendanceEvents}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={(event) => ({
            style: { backgroundColor: event.color, borderColor: event.color, color: 'white' },
          })}
        />
      </div>
    </div>
  );

export default function Absensi() {
  const [activeView, setActiveView] = useState('input');
  const [selectedDate, setSelectedDate] = useState(new Date()); 
  
  const [students, setStudents] = useState([
      { id: 1, nisn: "001", nama: "Ahmad Fauzi", status: null },
      { id: 2, nisn: "002", nama: "Budi Santoso", status: "Hadir" },
      { id: 3, nisn: "003", nama: "Citra Lestari", status: "Hadir" },
      { id: 4, nisn: "004", nama: "Dewi Anggraini", status: "Sakit" },
  ]);

  const attendanceEvents = [
    { title: '29 Hadir, 1 Sakit', start: new Date(2025, 8, 19), end: new Date(2025, 8, 19), allDay: true, color: '#10B981' },
    { title: '30 Hadir', start: new Date(2025, 8, 18), end: new Date(2025, 8, 18), allDay: true, color: '#10B981' },
  ];

  const handleStatusChange = (studentId, newStatus) => {
    setStudents(students.map(s => s.id === studentId ? { ...s, status: newStatus } : s));
  };
  
  const markAllPresent = () => {
    setStudents(students.map(s => ({ ...s, status: 'Hadir' })));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<FaClipboardUser />}
        title="Absensi Siswa"
        description="Catat kehadiran siswa harian dan lihat rekapitulasi absensi."
      />

      <ContentWrapper>
        <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
          <button 
            onClick={() => setActiveView('input')} 
            className={`w-1/2 flex items-center justify-center gap-2 px-4 py-2 font-semibold text-sm rounded-md transition-all ${activeView === 'input' ? 'bg-white shadow text-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}
          >
            <FaPenToSquare /> Input Absensi
          </button>
          <button 
            onClick={() => setActiveView('rekap')} 
            className={`w-1/2 flex items-center justify-center gap-2 px-4 py-2 font-semibold text-sm rounded-md transition-all ${activeView === 'rekap' ? 'bg-white shadow text-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}
          >
            <FaCalendarDays /> Rekap Absensi
          </button>
        </div>

        {activeView === 'input' && (
          <InputView 
            students={students} 
            handleStatusChange={handleStatusChange}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            markAllPresent={markAllPresent}
          />
        )}
        {activeView === 'rekap' && <RekapView attendanceEvents={attendanceEvents} />}
      </ContentWrapper>
    </div>
  );
}