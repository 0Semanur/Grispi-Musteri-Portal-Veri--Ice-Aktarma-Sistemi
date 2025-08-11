import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Typography, 
  Button, 
  Steps, 
  Result,
  Progress,
  Space,
  Divider,
  Alert,
  Collapse,
  Tag,
  Row,
  Col
} from 'antd';
import { 
  CheckCircleOutlined, 
  DownloadOutlined, 
  HomeOutlined,
  FileTextOutlined,
  BugOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import '../assets/css/import.css';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

const ImportResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [importing, setImporting] = useState(true);
  const [progress, setProgress] = useState(0);
  const [importResult, setImportResult] = useState(null);

  const { file, importType, hasHeader, allData, mappings, grispiFields } = location.state || {};

  useEffect(() => {
    if (!file) {
      navigate('/import');
      return;
    }

    // Simulate import process
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setImporting(false);
          
          // Process actual data (skip header if hasHeader is true)
          const actualDataRows = hasHeader ? allData.slice(1) : allData;
          const validationResult = validateData(actualDataRows);
          
          setImportResult({
            success: true,
            totalRows: actualDataRows.length,
            successCount: validationResult.successCount,
            errorCount: validationResult.errorCount,
            errors: validationResult.errors,
            jsonOutput: generateDetailedJsonOutput(actualDataRows, validationResult.validRows)
          });
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [file, navigate, allData, mappings, hasHeader]);

  const validateData = (dataRows) => {
    const errors = [];
    const validRows = [];
    let successCount = 0;

    dataRows.forEach((row, index) => {
      const rowNumber = index + 1; // Actual row number (excluding header)
      const rowErrors = [];
      let isValid = true;

      // Create mapped data for this row
      const mappedData = {};
      Object.entries(mappings || {}).forEach(([columnKey, grispiField]) => {
        if (grispiField && row[columnKey] !== undefined) {
          mappedData[grispiField] = row[columnKey];
        }
      });

      // Validate required fields
      const requiredFields = grispiFields?.filter(field => field.required) || [];
      requiredFields.forEach(field => {
        if (!mappedData[field.value] || String(mappedData[field.value]).trim() === '') {
          rowErrors.push({
            row: rowNumber,
            field: field.label,
            message: 'Zorunlu alan boş'
          });
          isValid = false;
        }
      });

      // Validate email format
      if (mappedData.email && mappedData.email.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(mappedData.email)) {
          rowErrors.push({
            row: rowNumber,
            field: 'email',
            message: 'Geçersiz e-posta formatı'
          });
          isValid = false;
        }
      }

      // Validate phone number (minimum 10 digits)
      if (mappedData.phone && mappedData.phone.trim() !== '') {
        const phoneDigits = mappedData.phone.replace(/\D/g, '');
        if (phoneDigits.length < 10) {
          rowErrors.push({
            row: rowNumber,
            field: 'phone',
            message: 'Telefon numarası çok kısa (minimum 10 rakam)'
          });
          isValid = false;
        }
      }

      if (isValid) {
        successCount++;
        validRows.push({ ...mappedData, originalRowIndex: index });
      } else {
        errors.push(...rowErrors);
      }
    });

    return {
      successCount,
      errorCount: dataRows.length - successCount,
      errors,
      validRows
    };
  };

  const generateDetailedJsonOutput = (dataRows, validRows) => {
    if (!dataRows || !mappings) return [];
    
    return validRows.map((validRow, index) => {
      const { originalRowIndex, ...mappedData } = validRow;
      
      return {
        id: index + 1,
        importType: importType,
        importDate: new Date().toISOString(),
        status: 'success',
        ...mappedData
      };
    });
  };

  const handleDownloadJson = () => {
    const jsonData = JSON.stringify(importResult?.jsonOutput || [], null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${importType}_import_sonuc_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleNewImport = () => {
    navigate('/import');
  };

  if (importing) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Steps
          current={4}
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
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <Title level={2}>Veriler İçe Aktarılıyor...</Title>
            <Text type="secondary">{importType} verileriniz işlenirken lütfen bekleyin</Text>
            
            <div style={{ margin: '40px 0' }}>
              <Progress 
                percent={progress} 
                status="active"
                strokeColor="#6A1B9A"
                style={{ maxWidth: '400px' }}
              />
            </div>
            
            <Text>{hasHeader ? allData?.length - 1 : allData?.length || 0} satır işleniyor...</Text>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <Steps
        current={4}
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
        <Result
          status="success"
          title="İçe Aktarma Başarıyla Tamamlandı!"
          subTitle={`${importType} verileriniz Grispi sistemine başarıyla aktarıldı.`}
          icon={<CheckCircleOutlined style={{ color: '#6A1B9A' }} />}
        />

        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col span={8}>
            <Card size="small" style={{ textAlign: 'center' }}>
              <Title level={3} style={{ color: '#52c41a', margin: 0 }}>
                {importResult?.successCount || 0}
              </Title>
              <Text type="secondary">Başarıyla İçe Aktarılan</Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small" style={{ textAlign: 'center' }}>
              <Title level={3} style={{ color: '#faad14', margin: 0 }}>
                {importResult?.totalRows || 0}
              </Title>
              <Text type="secondary">Toplam İşlenen Satır</Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small" style={{ textAlign: 'center' }}>
              <Title level={3} style={{ color: '#ff4d4f', margin: 0 }}>
                {importResult?.errorCount || 0}
              </Title>
              <Text type="secondary">Hata Sayısı</Text>
            </Card>
          </Col>
        </Row>

        {importResult?.errorCount > 0 && (
          <Alert
            message="Bazı satırlarda hata oluştu"
            description={`${importResult.errorCount} satır doğrulama hataları nedeniyle içe aktarılamadı.`}
            type="warning"
            showIcon
            style={{ marginBottom: '24px' }}
          />
        )}

        <Collapse style={{ marginBottom: '24px' }}>
          {importResult?.errorCount > 0 && (
            <Panel 
              header={
                <Space>
                  <BugOutlined />
                  <Text>İçe Aktarma Hatalarını Görüntüle ({importResult.errorCount})</Text>
                </Space>
              } 
              key="errors"
            >
              {importResult.errors.map((error, index) => (
                <div key={index} style={{ marginBottom: '8px' }}>
                  <Tag color="red">Satır {error.row}</Tag>
                  <Text strong>{error.field}:</Text> {error.message}
                </div>
              ))}
            </Panel>
          )}
          
          <Panel 
            header={
              <Space>
                <FileTextOutlined />
                <Text>JSON Çıktısı Önizlemesi ({importResult?.jsonOutput?.length || 0} kayıt)</Text>
              </Space>
            } 
            key="json"
          >
            <div style={{ marginBottom: '16px' }}>
              <Text type="secondary">
                Bu JSON çıktısı, eşleştirilen verilerinizin Grispi formatındaki halini gösterir. 
                Bu veri Grispi API'sine gönderilecek formattadır.
              </Text>
            </div>
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '16px', 
              borderRadius: '6px',
              overflow: 'auto',
              maxHeight: '400px',
              fontSize: '12px',
              lineHeight: '1.4'
            }}>
              {JSON.stringify(importResult?.jsonOutput || [], null, 2)}
            </pre>
          </Panel>
        </Collapse>

        <Divider />

        <div style={{ textAlign: 'center' }}>
          <Space size="large">
            <Button 
              type="primary"
              icon={<HomeOutlined />}
              onClick={handleGoHome}
              size="large"
            >
              Ana Sayfaya Git
            </Button>
            
            <Button 
              icon={<DownloadOutlined />}
              onClick={handleDownloadJson}
              size="large"
            >
              JSON İndir
            </Button>
            
            <Button 
              onClick={handleNewImport}
              size="large"
            >
              Yeni İçe Aktarma
            </Button>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default ImportResult;