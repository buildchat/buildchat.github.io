import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type UsageChartProps = {
  type: 'queries' | 'subscription';
  data?: {
    labels: string[];
    values: number[];
  };
};

const UsageChart = ({ type, data }: UsageChartProps) => {
  const { t } = useTranslation();
  
  // Demo data if no actual data is provided
  const demoData = {
    queries: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: [65, 78, 90, 85, 95, 110, 120]
    },
    subscription: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      values: [250, 420, 380, 450]
    }
  };
  
  const chartData = data || demoData[type];
  
  const options: ChartOptions<'bar' | 'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: type === 'queries' ? t('dashboard.queries') : t('dashboard.subscription'),
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      }
    }
  };
  
  const chartConfig = {
    labels: chartData.labels,
    datasets: [
      {
        label: type === 'queries' ? 'Queries' : 'Usage',
        data: chartData.values,
        backgroundColor: type === 'queries' 
          ? 'rgba(59, 130, 246, 0.6)'  // blue
          : 'rgba(139, 92, 246, 0.6)', // purple
        borderColor: type === 'queries'
          ? 'rgba(59, 130, 246, 1)'
          : 'rgba(139, 92, 246, 1)',
        borderWidth: 2
      }
    ]
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: type === 'queries' ? 0.1 : 0.3 }}
      className="bg-white rounded-xl shadow-md p-6 h-80"
    >
      {type === 'queries' ? (
        <Bar options={options} data={chartConfig} height={250} />
      ) : (
        <Line options={options} data={chartConfig} height={250} />
      )}
    </motion.div>
  );
};

export default UsageChart;