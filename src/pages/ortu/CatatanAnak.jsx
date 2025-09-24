import { useState, useEffect, useMemo } from 'react';
import ContentWrapper from '../../components/ui/ContentWrapper';
import PageHeader from '../../components/ui/PageHeader';
import ConversationList from '../../components/chat/ConversationList';
import ChatView from '../../components/chat/ChatView';
import { FaCommentDots } from 'react-icons/fa6';
import useWindowSize from '../../hooks/useWindowSize';

export default function CatatanOrtu() {
  const conversations = useMemo(() => [
    { id: 1, studentName: 'Ahmad Fauzi', parentName: 'Anda', teacherName: 'Bu Tika (Matematika)', lastMessage: 'Baik bu, terima kasih informasinya.', timestamp: 'Kemarin', messages: [
        { id: 1, sender: 'guru', text: 'Selamat siang, saya perhatikan ananda Ahmad sangat aktif di kelas Matematika hari ini.', timestamp: '10:30' },
        { id: 2, sender: 'ortu', text: 'Baik bu, terima kasih informasinya.', timestamp: '11:00' },
      ]
    },
    { id: 2, studentName: 'Ahmad Fauzi', parentName: 'Anda', teacherName: 'Pak Budi (B. Indonesia)', lastMessage: 'Siap pak, akan saya ingatkan.', timestamp: '2 hari lalu', messages: [
        { id: 1, sender: 'guru', text: 'Selamat pagi, saya ingin menginformasikan bahwa ananda Citra perlu lebih fokus saat pelajaran Bahasa Indonesia.', timestamp: '09:00' },
        { id: 2, sender: 'ortu', text: 'Siap pak, akan saya ingatkan.', timestamp: '09:15' },
        { id: 3, sender: 'guru', text: 'Terima kasih atas kerja samanya.', timestamp: '09:30' },
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
        title="Catatan dari Guru"
        description="Lihat dan balas catatan perkembangan anak Anda dari guru."
      />

      <ContentWrapper className="!p-0 overflow-hidden">
        {/* DIUBAH: Menggunakan Flexbox, bukan Grid */}
        <div className="flex h-[75vh]">
          {showList && (
            <div className="w-full md:w-1/3 lg:w-1/4 h-full flex-shrink-0">
              <ConversationList 
                conversations={conversations} 
                onSelect={handleSelectConversation} 
                activeConversationId={activeConversationId}
                hideAddButton={true}
              />
            </div>
          )}

          {showChat && (
            <div className="w-full md:flex-1 h-full min-w-0">
              <ChatView 
                conversation={activeConversation ? { ...activeConversation, studentName: activeConversation.teacherName, parentName: `Diskusi untuk: ${activeConversation.studentName}` } : null} 
                onBack={handleBack}
              />
            </div>
          )}
        </div>
      </ContentWrapper>
    </div>
  );
}