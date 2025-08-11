import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Typography, 
  Table, 
  Button, 
  Steps, 
  Checkbox, 
  Space,
  Alert,
  Spin,
  message
} from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, FileTextOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { parseFile } from '../utils/fileParser';
import '../assets/css/import.css';

const { Title, Text } = Typography;

const ImportPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [hasHeader, setHasHeader] = useState(true);
  const [previewData, setPreviewData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [originalPreviewData, setOriginalPreviewData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [headerRow, setHeaderRow] = useState([]);
  const [totalRows, setTotalRows] = useState(0);

  const { file, importType } = location.state || {};

  useEffect(() => {
    if (!file) {
      navigate('/import');
      return;
    }

    // Parse the actual uploaded file
    parseFile(file)
      .then((result) => {
        setOriginalPreviewData(result.data);
        setAllData(result.allData);
        setColumns(result.columns);
        setHeaderRow(result.headerRow);
        setTotalRows(result.totalRows);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Dosya ayrıştırma hatası:', error);
        message.error('Dosya ayrıştırılırken bir hata oluştu');
        navigate('/import');
      });
  }, [file, importType, navigate]);

  // Update columns and preview data based on hasHeader checkbox
  useEffect(() => {
    if (headerRow.length > 0 && originalPreviewData.length > 0) {
      // Update columns
      const updatedColumns = headerRow.map((header, index) => ({
        title: hasHeader ? header : `Kolon ${index + 1}`,
        dataIndex: `col_${index}`,
        key: `col_${index}`,
        width: 150,
        ellipsis: true
      }));
      setColumns(updatedColumns);

      // Update preview data - skip header row if hasHeader is true
      const updatedPreviewData = hasHeader 
        ? originalPreviewData.slice(1) // Skip first row (header)
        : originalPreviewData; // Show all rows including first row as data
      
      setPreviewData(updatedPreviewData);
    }
  }, [hasHeader, headerRow, originalPreviewData]);

  const handleNext = () => {
    navigate('/import/mapping', { 
      state: { 
        file, 
        importType, 
        hasHeader,
        columns: columns.map(col => col.title),
        headerRow,
        previewData,
        allData,
        actualFileData: allData
      } 
    });
  };

  const handleBack = () => {
    navigate('/import');
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <Spin size="large" />
        <div style={{ marginTop: '16px' }}>
          <Text>Dosyanız işleniyor...</Text>
        </div>
      </div>
    );
  }

  // Calculate actual data rows for display
  const actualDataRows = hasHeader ? totalRows - 1 : totalRows;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <Steps
        current={1}
        items={[
          { title: 'Dosya Yükle' },
          { title: 'Veri Önizleme' },
          { title: 'Alan Eşleştirme' },
          { title: 'Özet' },
          { title: 'Sonuç' }
        ]}
        style={{ marginBottom: '32px' }}
      />

      <Card>
        <Title level={2} style={{ marginBottom: '24px' }}>
          <FileTextOutlined style={{ marginRight: '8px', color: '#6A1B9A' }} />
          Veri Önizleme
        </Title>
        
        <Alert
          message="Dosya Önizlemesi"
          description={`Yüklediğiniz dosyadan ${hasHeader ? 'başlık satırı hariç ' : ''}ilk ${previewData.length} satır gösteriliyor. Verilerinizin doğru göründüğünü kontrol edin.`}
          type="info"
          showIcon
          style={{ marginBottom: '24px' }}
        />

        <div style={{ marginBottom: '24px' }}>
          <Space>
            <Text strong>Dosya:</Text>
            <Text>{file?.name}</Text>
            <Text type="secondary">|</Text>
            <Text strong>İçe Aktarma Tipi:</Text>
            <Text style={{ textTransform: 'capitalize' }}>
              {importType === 'contact' ? 'Kişi' : 
               importType === 'ticket' ? 'Talep' : 
               importType === 'organization' ? 'Organizasyon' : importType}
            </Text>
            <Text type="secondary">|</Text>
            <Text strong>Toplam Veri Satırı:</Text>
            <Text>{actualDataRows}</Text>
            <Text type="secondary">|</Text>
            <Text strong>Kolon Sayısı:</Text>
            <Text>{columns.length}</Text>
          </Space>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <Checkbox 
            checked={hasHeader} 
            onChange={(e) => setHasHeader(e.target.checked)}
          >
            İlk satır başlık bilgilerini içeriyor
          </Checkbox>
        </div>

        <Table
          columns={columns}
          dataSource={previewData}
          pagination={false}
          scroll={{ x: 800 }}
          size="small"
          bordered
          style={{ marginBottom: '32px' }}
          title={() => (
            <Text strong>
              {hasHeader ? 'Veri Örnekleri (Başlık Satırı Hariç)' : 'Dosyadan İlk 5 Satır'}
            </Text>
          )}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            size="large"
            icon={<ArrowLeftOutlined />}
            onClick={handleBack}
          >
            Geri
          </Button>
          
          <Button 
            type="primary" 
            size="large"
            icon={<ArrowRightOutlined />}
            onClick={handleNext}
          >
            Devam Et
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ImportPreview;