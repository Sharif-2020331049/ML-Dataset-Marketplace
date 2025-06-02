import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.jsx';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const categoryData = [
  { name: 'Computer Vision', datasets: 324, revenue: 45000 },
  { name: 'NLP', datasets: 298, revenue: 38000 },
  { name: 'Audio', datasets: 156, revenue: 22000 },
  { name: 'Tabular', datasets: 234, revenue: 31000 },
  { name: 'Time Series', datasets: 145, revenue: 18000 },
  { name: 'Other', datasets: 90, revenue: 12000 },
];

const statusData = [
  { name: 'Approved', value: 1235, color: '#10b981' },
  { name: 'Pending', value: 12, color: '#f59e0b' },
  { name: 'Rejected', value: 45, color: '#ef4444' },
];

export const DatasetStats = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Datasets by Category</CardTitle>
          <CardDescription>Distribution of datasets across different ML categories</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="datasets" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dataset Status Distribution</CardTitle>
          <CardDescription>Current approval status of all datasets</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
