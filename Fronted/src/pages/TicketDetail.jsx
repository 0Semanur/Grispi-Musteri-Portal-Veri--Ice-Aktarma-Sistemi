import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Typography, 
  Card, 
  Tag, 
  Descriptions, 
  Timeline, 
  Divider, 
  Button, 
  Input, 
  Upload, 
  message,
  Space 
} from 'antd';
import { 
  UploadOutlined, 
  SendOutlined, 
  ArrowLeftOutlined,
  PaperClipOutlined,
  UserOutlined,
  CommentOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

// Mock veri
const mockTickets = [
  {
    id: '1',
    subject: 'Uygulama açılmıyor',
    category: 'Teknik Sorun',
    status: 'open',
    createdAt: '2023-07-15',
    lastUpdated: '2023-07-16',
    description: 'Uygulamayı açmaya çalıştığımda hata veriyor. Ekran görüntüsünü ekte paylaştım.',
    messages: [
      {
        id: 1,
        sender: 'user',
        content: 'Uygulamayı açmaya çalıştığımda hata veriyor. Ekran görüntüsünü ekte paylaştım.',
        timestamp: '2023-07-15 14:30',
        attachments: [{ name: 'hata_ekrani.png', url: '#' }]
      },
      {
        id: 2,
        sender: 'agent',
        content: 'Merhaba, sorununuzu inceledik. Lütfen uygulamayı güncelleyip tekrar deneyin.',
        timestamp: '2023-07-16 09:15',
        attachments: []
      },
      {
        id: 3,
        sender: 'user',
        content: 'Güncellemeyi yaptım ama hala aynı hatayı alıyorum.',
        timestamp: '2023-07-16 10:45',
        attachments: []
      },
    ],
    statusHistory: [
      { status: 'open', timestamp: '2023-07-15 14:30', comment: 'Talep oluşturuldu' },
      { status: 'pending', timestamp: '2023-07-16 09:15', comment: 'Destek ekibi yanıt verdi' },
      { status: 'open', timestamp: '2023-07-16 10:45', comment: 'Müşteri yanıt verdi' },
    ]
  },
  {
    id: '2',
    subject: 'Fatura bilgilerimi güncellemek istiyorum',
    category: 'Fatura',
    status: 'pending',
    createdAt: '2023-07-10',
    lastUpdated: '2023-07-12',
    description: 'Fatura adresimi değiştirmek istiyorum. Yeni adresim: İstanbul, Kadıköy...',
    messages: [
      {
        id: 1,
        sender: 'user',
        content: 'Fatura adresimi değiştirmek istiyorum. Yeni adresim: İstanbul, Kadıköy...',
        timestamp: '2023-07-10 11:20',
        attachments: []
      },
      {
        id: 2,
        sender: 'agent',
        content: 'Merhaba, fatura bilgilerinizi güncellemek için lütfen vergi numaranızı da paylaşır mısınız?',
        timestamp: '2023-07-12 14:05',
        attachments: []
      },
    ],
    statusHistory: [
      { status: 'open', timestamp: '2023-07-10 11:20', comment: 'Talep oluşturuldu' },
      { status: 'pending', timestamp: '2023-07-12 14:05', comment: 'Destek ekibi yanıt verdi' },
    ]
  },
  {
    id: '3',
    subject: 'Hesap bilgilerimi nasıl değiştirebilirim?',
    category: 'Hesap',
    status: 'closed',
    createdAt: '2023-06-28',
    lastUpdated: '2023-07-05',
    description: 'Hesabımdaki e-posta adresini değiştirmek istiyorum. Nasıl yapabilirim?',
    messages: [
      {
        id: 1,
        sender: 'user',
        content: 'Hesabımdaki e-posta adresini değiştirmek istiyorum. Nasıl yapabilirim?',
        timestamp: '2023-06-28 16:45',
        attachments: []
      },
      {
        id: 2,
        sender: 'agent',
        content: 'Merhaba, hesap ayarları > profil bölümünden e-posta adresinizi güncelleyebilirsiniz.',
        timestamp: '2023-06-29 10:30',
        attachments: [{ name: 'email_degistirme.pdf', url: '#' }]
      },
      {
        id: 3,
        sender: 'user',
        content: 'Teşekkür ederim, başarıyla değiştirdim.',
        timestamp: '2023-07-05 09:15',
        attachments: []
      },
    ],
    statusHistory: [
      { status: 'open', timestamp: '2023-06-28 16:45', comment: 'Talep oluşturuldu' },
      { status: 'pending', timestamp: '2023-06-29 10:30', comment: 'Destek ekibi yanıt verdi' },
      { status: 'closed', timestamp: '2023-07-05 09:15', comment: 'Talep çözüldü' },
    ]
  },
  {
    id: '4',
    subject: 'Premium paket hakkında bilgi almak istiyorum',
    category: 'Bilgi Talebi',
    status: 'open',
    createdAt: '2023-07-18',
    lastUpdated: '2023-07-18',
    description: 'Premium paketinizin özellikleri ve fiyatlandırması hakkında bilgi alabilir miyim?',
    messages: [
      {
        id: 1,
        sender: 'user',
        content: 'Premium paketinizin özellikleri ve fiyatlandırması hakkında bilgi alabilir miyim?',
        timestamp: '2023-07-18 13:20',
        attachments: []
      },
    ],
    statusHistory: [
      { status: 'open', timestamp: '2023-07-18 13:20', comment: 'Talep oluşturuldu' },
    ]
  },
  {
    id: '5',
    subject: 'Ödeme yöntemimi değiştirmek istiyorum',
    category: 'Ödeme',
    status: 'pending',
    createdAt: '2023-07-05',
    lastUpdated: '2023-07-08',
    description: 'Mevcut kredi kartımı değiştirmek istiyorum. Nasıl yapabilirim?',
    messages: [
      {
        id: 1,
        sender: 'user',
        content: 'Mevcut kredi kartımı değiştirmek istiyorum. Nasıl yapabilirim?',
        timestamp: '2023-07-05 15:10',
        attachments: []
      },
      {
        id: 2,
        sender: 'agent',
        content: 'Merhaba, ödeme ayarları bölümünden kredi kartı bilgilerinizi güncelleyebilirsiniz. Detaylı adımlar için ekteki kılavuzu inceleyebilirsiniz.',
        timestamp: '2023-07-08 11:25',
        attachments: [{ name: 'odeme_yontemi_degistirme.pdf', url: '#' }]
      },
    ],
    statusHistory: [
      { status: 'open', timestamp: '2023-07-05 15:10', comment: 'Talep oluşturuldu' },
      { status: 'pending', timestamp: '2023-07-08 11:25', comment: 'Destek ekibi yanıt verdi' },
    ]
  },
];

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const [fileList, setFileList] = useState([]);

  // ID'ye göre talep detayını bulma
  const ticket = mockTickets.find(ticket => ticket.id === id);

  if (!ticket) {
    return <div>Talep bulunamadı!</div>;
  }

  // Durum etiketi için renk belirleme
  const getStatusTag = (status) => {
    let color = '';
    let text = '';

    switch (status) {
      case 'open':
        color = 'green';
        text = 'Açık';
        break;
      case 'pending':
        color = 'orange';
        text = 'Beklemede';
        break;
      case 'closed':
        color = 'red';
        text = 'Kapalı';
        break;
      default:
        color = 'default';
        text = status;
    }

    return <Tag color={color}>{text}</Tag>;
  };

  // Dosya yükleme ayarları
  const uploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  // Yeni mesaj gönderme
  const handleSendMessage = () => {
    if (newMessage.trim() === '' && fileList.length === 0) {
      message.warning('Lütfen bir mesaj yazın veya dosya ekleyin');
      return;
    }

    message.success('Mesajınız gönderildi');
    setNewMessage('');
    setFileList([]);
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/')}
        >
          Talep Listesine Dön
        </Button>
      </div>

      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <Title level={3}>{ticket.subject}</Title>
          {getStatusTag(ticket.status)}
        </div>

        <Descriptions bordered column={2}>
          <Descriptions.Item label="Talep No">{ticket.id}</Descriptions.Item>
          <Descriptions.Item label="Kategori">{ticket.category}</Descriptions.Item>
          <Descriptions.Item label="Oluşturulma Tarihi">{ticket.createdAt}</Descriptions.Item>
          <Descriptions.Item label="Son Güncelleme">{ticket.lastUpdated}</Descriptions.Item>
        </Descriptions>

        <Divider orientation="left">Mesaj Geçmişi</Divider>

        <div style={{ marginBottom: 20 }}>
          {ticket.messages.map(msg => (
            <Card 
              key={msg.id} 
              style={{ 
                marginBottom: 16, 
                backgroundColor: msg.sender === 'user' ? '#f0f8ff' : '#fff',
                borderLeft: msg.sender === 'user' ? '4px solid #1677ff' : '4px solid #52c41a'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                {msg.sender === 'user' ? 
                  <UserOutlined style={{ marginRight: 8 }} /> : 
                  <CommentOutlined style={{ marginRight: 8 }} />
                }
                <Text strong>{msg.sender === 'user' ? 'Siz' : 'Destek Ekibi'}</Text>
                <Text type="secondary" style={{ marginLeft: 16 }}>{msg.timestamp}</Text>
              </div>
              <Paragraph>{msg.content}</Paragraph>
              {msg.attachments && msg.attachments.length > 0 && (
                <div>
                  <Text strong><PaperClipOutlined /> Ekler:</Text>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {msg.attachments.map((attachment, index) => (
                      <li key={index}>
                        <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                          {attachment.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          ))}
        </div>

        {ticket.status !== 'closed' && (
          <div>
            <Divider orientation="left">Yanıt Gönder</Divider>
            <TextArea 
              rows={4} 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Mesajınızı buraya yazın..."
              style={{ marginBottom: 16 }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>Dosya Ekle</Button>
              </Upload>
              <Button 
                type="primary" 
                icon={<SendOutlined />} 
                onClick={handleSendMessage}
              >
                Gönder
              </Button>
            </div>
          </div>
        )}

        <Divider orientation="left">Durum Geçmişi</Divider>
        <Timeline
          items={ticket.statusHistory.map(item => ({
            color: item.status === 'open' ? 'green' : item.status === 'pending' ? 'orange' : 'red',
            children: (
              <>
                <Text strong>{item.timestamp}</Text>
                <br />
                <Text>{item.comment}</Text>
                <br />
                <Text type="secondary">Durum: {getStatusTag(item.status)}</Text>
              </>
            ),
          }))}
        />
      </Card>
    </div>
  );
};

export default TicketDetail;