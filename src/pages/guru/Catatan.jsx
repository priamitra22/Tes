import { useState, useEffect, useMemo } from 'react';
import ContentWrapper from '../../components/ui/ContentWrapper';
import PageHeader from '../../components/ui/PageHeader';
import ConversationList from '../../components/chat/ConversationList';
import ChatView from '../../components/chat/ChatView';
import { FaCommentDots } from 'react-icons/fa6';
import useWindowSize from '../../hooks/useWindowSize';

export default function Catatan() {
  const conversations = useMemo(() => [
    { 
      id: 1, studentName: 'Ahmad Fauzi', parentName: 'Bapak Abdullah', teacherName: 'Anda', lastMessage: 'Baik bu, terima kasih informasinya.', timestamp: 'Kemarin', messages: [
        { id: 1, sender: 'guru', text: 'Selamat siang Pak Abdullah, saya perhatikan ananda Ahmad sangat aktif di kelas Matematika hari ini.', timestamp: '10:30' },
        { id: 2, sender: 'ortu', text: 'Baik bu, terima kasih informasinya.', timestamp: '11:00' },
      ]
    },
    { 
      id: 2, studentName: 'Citra Lestari', parentName: 'Ibu Wulandari', teacherName: 'Anda', lastMessage: 'Terima kasih atas kerja samanya.', timestamp: '2 hari lalu', messages: [
        { id: 1, sender: 'guru', text: 'Selamat pagi Bu Wulandari, saya ingin menginformasikan bahwa ananda Citra perlu lebih fokus saat pelajaran Bahasa Indonesia.', timestamp: '09:00' },
        { id: 2, sender: 'ortu', text: 'Siap bu, akan saya ingatkan.', timestamp: '09:15' },
        { id: 3, sender: 'guru', text: 'Terima kasih atas kerja samanya.', timestamp: '09:30' },
        { id: 4, sender: 'guru', text: 'Tolong pastikan juga untuk selalu membawa buku paketnya ya bu.', timestamp: '09:31' },
        { id: 5, sender: 'ortu', text: 'Oh baik bu, siap. Nanti saya sampaikan ke Citra.', timestamp: '09:40' },
      ]
    },
  ], []);  

  const [activeConversationId, setActiveConversationId] = useState(null);
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const [view, setView] = useState('list');

  useEffect(() => {
    if (!isMobile && !activeConversationId && conversations.length > 0) {
      setActiveConversationId(conversations[0].id);
    }
  }, [isMobile, activeConversationId, conversations]);

  const handleSelectConversation = (id) => {
    setActiveConversationId(id);
    if (isMobile) setView('chat');
  };

  const handleBack = () => {
    setView('list');
    setActiveConversationId(null);
  };

  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const showList = !isMobile || (isMobile && view === 'list');
  const showChat = !isMobile || (isMobile && view === 'chat');

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<FaCommentDots />}
        title="Catatan Siswa"
        description="Kelola komunikasi dan catatan perkembangan siswa dengan orang tua."
      />

      <ContentWrapper className="!p-0 overflow-hidden">
        {/* DIUBAH: Menggunakan Flexbox, bukan Grid */}
        <div className="flex h-[75vh]">
          {showList && (
            <div className="w-full md:w-1/3 lg:w-1/4 h-full flex-shrink-0">
              <ConversationList 
                conversations={conversations.map(c => ({...c, teacherName: c.studentName}))}
                onSelect={handleSelectConversation} 
                activeConversationId={activeConversationId}
              />
            </div>
          )}

          {showChat && (
            <div className="w-full md:flex-1 h-full min-w-0">
              <ChatView 
                conversation={activeConversation ? { ...activeConversation, studentName: activeConversation.studentName, parentName: `Orang Tua: ${activeConversation.parentName}` } : null} 
                onBack={handleBack}
              />
            </div>
          )}
        </div>
      </ContentWrapper>
    </div>
  );
}