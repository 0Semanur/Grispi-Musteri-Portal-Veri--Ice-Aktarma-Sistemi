import React, { useState } from 'react';
import { Table, Tag, Typography, Input, Space, Button } from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

// Mock veri
const mockTickets = [
  {
    id: '1',
    subject: 'Uygulama açılmıyor',
    category: 'Teknik Sorun',
    status: 'open',
    createdAt: '2023-07-15',
    lastUpdated: '2023-07-16',
  },
  {
    id: '2',
    subject: 'Fatura bilgilerimi güncellemek istiyorum',
    category: 'Fatura',
    status: 'pending',
    createdAt: '2023-07-10',
    lastUpdated: '2023-07-12',
  },
  {
    id: '3',
    subject: 'Hesap bilgilerimi nasıl değiştirebilirim?',
    category: 'Hesap',
    status: 'closed',
    createdAt: '2023-06-28',
    lastUpdated: '2023-07-05',
  },
  {
    id: '4',
    subject: 'Premium paket hakkında bilgi almak istiyorum',
    category: 'Bilgi Talebi',
    status: 'open',
    createdAt: '2023-07-18',
    lastUpdated: '2023-07-18',
  },
  {
    id: '5',
    subject: 'Ödeme yöntemimi değiştirmek istiyorum',
    category: 'Ödeme',
    status: 'pending',
    createdAt: '2023-07-05',
    lastUpdated: '2023-07-08',
  },
];

const TicketList = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  // Durum etiketleri için renk belirleme
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

  // Arama fonksiyonu
  const filteredTickets = mockTickets.filter(ticket =>
    ticket.subject.toLowerCase().includes(searchText.toLowerCase()) ||
    ticket.category.toLowerCase().includes(searchText.toLowerCase())
  );

  // Tablo sütunları
  const columns = [
    {
      title: 'Konu',
      dataIndex: 'subject',
      key: 'subject',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Kategori',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Durum',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
    },
    {
      title: 'Oluşturulma Tarihi',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Son Güncelleme',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
    },
    {
      title: 'İşlemler',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="primary" 
          icon={<EyeOutlined />} 
          onClick={() => navigate(`/tickets/${record.id}`)}
        >
          Görüntüle
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={2}>Taleplerim</Title>
        <Space>
          <Input
            placeholder="Taleplerde ara..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250 }}
          />
        </Space>
      </div>
      <Table 
        columns={columns} 
        dataSource={filteredTickets} 
        rowKey="id" 
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default TicketList;