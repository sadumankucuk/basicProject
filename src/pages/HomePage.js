import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Row, Col } from 'antd';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import axios from 'axios';
import * as moment from 'moment';
import 'moment/locale/en-au';

moment.updateLocale('en');

const HomePage = () => {
  const history = useHistory();
  const [isNoData, setIsNoData] = useState(false);
  const [tableData, setTableData] = useState();
  const [chartData, setChartData] = useState();

  const dateFormatter = (date) => moment.utc(new Date(date)).format('LL');

  useEffect(() => {
    axios.get('https://www.json-generator.com/api/json/get/bUgMRhYjKG?indent=2').then((response) => {
      setTableData(response.data.nodes);
      setChartData(response.data.graphData);
    }).catch((err) => setIsNoData(true));
  }, []);

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Account Type',
      dataIndex: 'accountType',
      key: 'accountType',
    },
    {
      title: 'Display Name',
      dataIndex: 'displayName',
      key: 'displayName',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
  ];

  return (

    <Row>
      <Col xs={24} sm={12}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={dateFormatter} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="equity"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="saleCount" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </Col>
      <Col xs={24} sm={12}>
        <Table
          dataSource={tableData}
          noData={isNoData}
          columns={columns}
          rowKey="id"
          onRow={(record) => ({
            onClick: () => {
              history.push(
                {
                  pathname: `detail/${record.id}`,
                  state: record,
                },
              );
            },
          })}
        />
      </Col>
    </Row>
  );
};

export default HomePage;
