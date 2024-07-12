import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Text } from 'recharts';

const COLORS = ['#125592','#4187c4','#a59fa0','#de6769','#97040b'];



const renderCustomizedLabel = (props) => {
  const { x, y, width, height, value } = props;
  return (
    <Text 
      x={x + width / 2} 
      y={height < 20 ? y - 10 : y + height / 2} 
      fill="#ffffff" 
      textAnchor="middle" 
      dominantBaseline="middle"
      style={{fontWeight:"bold"}}
    >
      {`${value}%`}
    </Text>
  );
};

const CustomizedXAxisTick = ({ x, y, payload }) => {
  return (
    <Text 
      x={x} 
      y={y + 10} 
      width={60} 
      textAnchor="middle" 
      verticalAnchor="start"
      fontSize={16}
    >
      {payload.value}
    </Text>
  );
};

const QuestionChart = ({ data, question }) => {
  const sortedData = data.sort((a, b) => {
    const order = ['매우 만족', '약간 만족', '보통', '약간 불만족', '매우 불만족'];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });

  return (
    <div className="question-chart-container">
      <h3>{question}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart 
          data={sortedData} 
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            tick={<CustomizedXAxisTick />} 
            interval={0}
            height={60}
          />
          <YAxis />
          {/* <Tooltip /> */}
          <Bar dataKey="value" label={renderCustomizedLabel}>
            {sortedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default QuestionChart;