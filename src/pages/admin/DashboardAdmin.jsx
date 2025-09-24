import ContentWrapper from "../../components/ui/ContentWrapper";
import Card from "../../components/ui/Card";
import PageHeader from "../../components/ui/PageHeader";
import BarChartComponent from "../../components/charts/BarChartComponent";
import PieChartComponent from "../../components/charts/PieChartComponent";
import {FaChalkboardTeacher, FaChartLine } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { RiParentFill } from "react-icons/ri";

export default function DashboardAdmin() {
  // Data untuk chart
  const kelasData = [
    { kelas: "1A", jumlah: 30 },
    { kelas: "1B", jumlah: 28 },
    { kelas: "2A", jumlah: 32 },
    { kelas: "2B", jumlah: 30 },
    { kelas: "3A", jumlah: 25 },
    { kelas: "3B", jumlah: 27 },
    { kelas: "4A", jumlah: 29 },
    { kelas: "4B", jumlah: 31 },
  ];

  const kelasDataPie = [
    { name: "Laki-laki", value: 30 },
    { name: "Perempuan", value: 28 },
  ];

  return (
    <>
    <ContentWrapper>
      <div className="space-y-6">
        {/* Header */}
        <PageHeader
          icon={<FaChartLine />}
          title="Dashboard Admin"
          description="Overview sistem monitoring sekolah"
        />
        
        {/* Horizontal Cards - Fixed Gradient Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            icon={<FaChalkboardTeacher />}
            title="Total Guru"
            value="25"
            label="Guru"
          />
          <Card
            icon={<PiStudentFill />}
            title="Total Siswa" 
            value="450"
            label="Siswa"
          />
          <Card
            icon={<RiParentFill  />}
            title="Total Orangtua"
            value="18"
            label="Orangtua"
          />
        </div>
      </div>
    </ContentWrapper>

     <div className="mt-8">
     <ContentWrapper>  
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       {/* Pie Chart di kiri */}
            <PieChartComponent 
              data={kelasDataPie}
              width="100%"
              height="100%"
              showLegend={true}
              legendPosition="bottom"
              showCard={true}
              title="Jumlah Siswa Laki-laki dan Perempuan"
              chartHeight="250px"
            />
       {/* Bar Chart di kanan */}
            <BarChartComponent 
              data={kelasData}
              width="100%"
              height="100%"
              backgroundColor="#10B981"
              label="Jumlah Siswa"
              showLegend={false}
              yAxisStepSize={5}
              showCard={true}
              title="Jumlah Siswa per Kelas"
              chartHeight="250px"
            />
       </div>
     </ContentWrapper>
     </div>
    
  </>
  );
}