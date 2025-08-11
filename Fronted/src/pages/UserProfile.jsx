import React, { useState } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Typography, 
  Divider, 
  Row, 
  Col, 
  Select,
  Space,
  Avatar,
  message
} from 'antd';
import { 
  UserOutlined, 
  EditOutlined, 
  EyeInvisibleOutlined, 
  EyeTwoTone,
  SaveOutlined,
  PlusOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const UserProfile = () => {
  const [personalForm] = Form.useForm();
  const [addressForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [phoneNumbers, setPhoneNumbers] = useState([{ code: '+90', number: '588 765 43 21' }]);
  const [emails, setEmails] = useState(['customer@grispi.com.tr']);

  // Ülke kodları
  const countryCodes = [
    { code: '+90', country: 'TR' },
    { code: '+1', country: 'US' },
    { code: '+44', country: 'GB' },
    { code: '+49', country: 'DE' },
    { code: '+33', country: 'FR' },
  ];

  // Kişisel bilgileri kaydetme
  const handleSavePersonal = () => {
    personalForm.validateFields().then(values => {
      console.log('Kişisel bilgiler:', values);
      message.success('Kişisel bilgiler kaydedildi');
    }).catch(error => {
      console.error('Validation failed:', error);
    });
  };

  // Adres bilgilerini kaydetme
  const handleSaveAddress = () => {
    addressForm.validateFields().then(values => {
      console.log('Adres bilgileri:', values);
      message.success('Adres bilgileri kaydedildi');
    }).catch(error => {
      console.error('Validation failed:', error);
    });
  };

  // Şifre değiştirme
  const handleChangePassword = () => {
    passwordForm.validateFields().then(values => {
      console.log('Şifre değiştirildi');
      message.success('Şifre başarıyla değiştirildi');
      passwordForm.resetFields();
    }).catch(error => {
      console.error('Validation failed:', error);
    });
  };

  // Telefon numarası ekleme
  const handleAddPhone = () => {
    setPhoneNumbers([...phoneNumbers, { code: '+90', number: '' }]);
  };

  // E-posta ekleme
  const handleAddEmail = () => {
    setEmails([...emails, '']);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <Avatar 
          size={80} 
          icon={<UserOutlined />} 
          style={{ backgroundColor: '#6A1B9A', marginRight: 16 }}
        >
          G
        </Avatar>
        <div>
          <Title level={3} style={{ margin: 0 }}>Müşteri Adı</Title>
          <Text type="secondary">Rol: Admin</Text>
        </div>
      </div>

      <Card 
        title="Kişisel Bilgiler" 
        extra={<EditOutlined />}
        style={{ marginBottom: 24 }}
        className="profile-card"
      >
        <Form
          form={personalForm}
          layout="vertical"
          initialValues={{
            firstName: '',
            lastName: '',
            website: '',
          }}
        >
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="firstName"
                label="Ad"
                rules={[{ required: true, message: 'Lütfen adınızı girin!' }]}
              >
                <Input placeholder="Adınız" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="lastName"
                label="Soyad"
                rules={[{ required: true, message: 'Lütfen soyadınızı girin!' }]}
              >
                <Input placeholder="Soyadınız" />
              </Form.Item>
            </Col>
          </Row>

          <div>
            <Text strong style={{ marginBottom: 8, display: 'block' }}>Telefon</Text>
            {phoneNumbers.map((phone, index) => (
              <Row gutter={8} key={index} style={{ marginBottom: 8 }}>
                <Col xs={6} sm={4}>
                  <Select 
                    value={phone.code} 
                    style={{ width: '100%' }}
                    onChange={(value) => {
                      const newPhones = [...phoneNumbers];
                      newPhones[index].code = value;
                      setPhoneNumbers(newPhones);
                    }}
                  >
                    {countryCodes.map(country => (
                      <Option key={country.code} value={country.code}>
                        <span>{country.country}</span>
                      </Option>
                    ))}
                  </Select>
                </Col>
                <Col xs={18} sm={20}>
                  <Input 
                    value={phone.number}
                    placeholder="Telefon numarası" 
                    onChange={(e) => {
                      const newPhones = [...phoneNumbers];
                      newPhones[index].number = e.target.value;
                      setPhoneNumbers(newPhones);
                    }}
                  />
                </Col>
              </Row>
            ))}
            <Button 
              type="dashed" 
              onClick={handleAddPhone} 
              icon={<PlusOutlined />}
              style={{ marginBottom: 16 }}
            >
              Telefon Ekle
            </Button>
          </div>

          <div>
            <Text strong style={{ marginBottom: 8, display: 'block' }}>E-posta</Text>
            {emails.map((email, index) => (
              <Row gutter={8} key={index} style={{ marginBottom: 8 }}>
                <Col span={24}>
                  <Input 
                    value={email}
                    placeholder="E-posta adresi" 
                    onChange={(e) => {
                      const newEmails = [...emails];
                      newEmails[index] = e.target.value;
                      setEmails(newEmails);
                    }}
                  />
                </Col>
              </Row>
            ))}
            <Button 
              type="dashed" 
              onClick={handleAddEmail} 
              icon={<PlusOutlined />}
              style={{ marginBottom: 16 }}
            >
              E-posta Ekle
            </Button>
          </div>

          <Form.Item
            name="website"
            label="Website (İsteğe Bağlı)"
          >
            <Input placeholder="https://example.com" />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              onClick={handleSavePersonal}
              icon={<SaveOutlined />}
              style={{ backgroundColor: '#6A1B9A' }}
            >
              Değişiklikleri Kaydet
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card 
        title="Adres" 
        extra={<EditOutlined />}
        style={{ marginBottom: 24 }}
        className="profile-card"
      >
        <Form
          form={addressForm}
          layout="vertical"
        >
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="country"
                label="Ülke"
              >
                <Input placeholder="Ülke" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="city"
                label="Şehir"
              >
                <Input placeholder="Şehir" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="addressLine"
                label="Adres Satırı"
              >
                <Input placeholder="Adres" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="postalCode"
                label="Posta Kodu"
              >
                <Input placeholder="Posta kodu" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button 
              type="primary" 
              onClick={handleSaveAddress}
              icon={<SaveOutlined />}
              style={{ backgroundColor: '#6A1B9A' }}
            >
              Değişiklikleri Kaydet
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card 
        title="Şifre" 
        extra={<EditOutlined />}
        className="profile-card"
      >
        <Form
          form={passwordForm}
          layout="vertical"
        >
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="currentPassword"
                label="Mevcut Şifre"
                rules={[{ required: true, message: 'Lütfen mevcut şifrenizi girin!' }]}
              >
                <Input.Password
                  placeholder="Mevcut şifreniz"
                  iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="newPassword"
                label="Yeni Şifre"
                rules={[
                  { required: true, message: 'Lütfen yeni şifrenizi girin!' },
                  { min: 8, message: 'Şifre en az 8 karakter olmalıdır!' }
                ]}
              >
                <Input.Password
                  placeholder="Yeni şifreniz"
                  iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button 
              type="primary" 
              onClick={handleChangePassword}
              icon={<SaveOutlined />}
              style={{ backgroundColor: '#6A1B9A' }}
            >
              Değişiklikleri Kaydet
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UserProfile;