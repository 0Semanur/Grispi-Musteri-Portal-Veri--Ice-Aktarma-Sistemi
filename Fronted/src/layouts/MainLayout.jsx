import React from 'react';
import { Layout, Menu, Typography, Button, Avatar, Dropdown, message, Space } from 'antd';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  PlusOutlined, 
  UnorderedListOutlined, 
  UserOutlined, 
  LogoutOutlined,
  BellOutlined,
  HomeOutlined,
  ImportOutlined
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isTicketListPage = location.pathname === '/';
  const userEmail = localStorage.getItem('userEmail') || localStorage.getItem('userPhone') || 'customer@grispi.com.tr';
  const userName = 'Müşteri Adı';

  // Logout işlevi
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPhone');
    message.success('Çıkış yapıldı');
    navigate('/login');
  };

  // Kullanıcı menüsü için öğeler
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profil',
      onClick: () => navigate('/profile'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Çıkış Yap',
      onClick: handleLogout,
    },
  ];

  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        background: '#6A1B9A',
        padding: '0 24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ 
            background: '#FF6B35', 
            borderRadius: '8px', 
            padding: '8px 12px', 
            marginRight: '16px' 
          }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>
              G
            </Text>
          </div>
          <Title level={4} style={{ color: 'white', margin: 0, marginRight: '40px' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              Grispi Müşteri Portalı
            </Link>
          </Title>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {isTicketListPage && (
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => navigate('/tickets/new')}
              style={{ 
                marginRight: 16,
                background: '#FF6B35',
                borderColor: '#FF6B35'
              }}
            >
              + Yeni Talep
            </Button>
          )}
          
          <Button 
            type="text" 
            icon={<BellOutlined style={{ color: 'white', fontSize: 20 }} />} 
            style={{ marginRight: 16 }}
          />
          
          <Dropdown 
            menu={{ items: userMenuItems }} 
            placement="bottomRight"
            trigger={['click']}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer',
              padding: '8px 16px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              minWidth: '180px'
            }}>
              <Avatar 
                style={{ 
                  backgroundColor: '#FF6B35', 
                  marginRight: '12px',
                  border: '2px solid white',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }} 
              >
                G
              </Avatar>
              <div style={{ textAlign: 'left', flex: 1 }}>
                <div style={{ 
                  color: 'white', 
                  fontWeight: 'bold', 
                  fontSize: '14px',
                  lineHeight: '1.2'
                }}>
                  {userName}
                </div>
                <div style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  fontSize: '12px',
                  lineHeight: '1.2'
                }}>
                  Rol: Admin
                </div>
              </div>
            </div>
          </Dropdown>
        </div>
      </Header>
      
      <Layout>
        <Sider width={60} theme="light" style={{ background: '#6A1B9A' }}>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname.startsWith('/import') ? '/import' : location.pathname]}
            style={{ 
              height: '100%', 
              borderRight: 0, 
              background: '#6A1B9A'
            }}
            items={[
              {
                key: '/',
                icon: <HomeOutlined style={{ fontSize: '24px', color: 'white' }} />,
                label: '',
                onClick: () => navigate('/'),
                style: { 
                  background: location.pathname === '/' ? 'rgba(255, 255, 255, 0.2)' : 'transparent'
                }
              },
              {
                key: '/profile',
                icon: <UserOutlined style={{ fontSize: '24px', color: 'white' }} />,
                label: '',
                onClick: () => navigate('/profile'),
                style: { 
                  background: location.pathname === '/profile' ? 'rgba(255, 255, 255, 0.2)' : 'transparent'
                }
              },
              {
                key: '/import',
                icon: <ImportOutlined style={{ fontSize: '24px', color: 'white' }} />,
                label: '',
                onClick: () => navigate('/import'),
                style: { 
                  background: location.pathname.startsWith('/import') ? 'rgba(255, 255, 255, 0.2)' : 'transparent'
                }
              }
            ]}
          />
        </Sider>
        <Content style={{ padding: '24px 50px', background: '#f0f2f5' }}>
          <div className="site-layout-content" style={{ 
            background: '#fff', 
            padding: 24, 
            minHeight: 280,
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;