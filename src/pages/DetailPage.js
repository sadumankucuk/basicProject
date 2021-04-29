import React from 'react';
import { PageHeader, Descriptions } from 'antd';
import { useLocation } from 'react-router-dom';

const DetailPage = () => {
  const location = useLocation();
  const info = location.state;

  return (
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title={info.displayName}
      subTitle={info.accountType}
    >
      <Descriptions size="small" column={1} style={{ paddingLeft: '30px' }}>

        {Object.keys(info).map((col) => (
          <Descriptions.Item key={col} label={col}>{info[col]}</Descriptions.Item>
        ))}

      </Descriptions>

    </PageHeader>
  );
};

export default DetailPage;
