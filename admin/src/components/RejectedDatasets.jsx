import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.jsx';
import { Button } from './ui/button.jsx';
import { Badge } from './ui/badge.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table.jsx';
import { Eye, Check } from 'lucide-react';

const rejectedDatasets = [
  {
    id: 1,
    title: 'Low Quality Image Dataset',
    category: 'Computer Vision',
    seller: 'QuickData Solutions',
    rejectedDate: '2024-05-20',
    reason: 'Poor image quality, insufficient metadata',
    price: '$79',
  },
  {
    id: 2,
    title: 'Scraped Social Media Data',
    category: 'NLP',
    seller: 'SocialScraper Inc',
    rejectedDate: '2024-05-18',
    reason: 'Privacy violations, unauthorized data collection',
    price: '$149',
  },
  {
    id: 3,
    title: 'Incomplete Audio Dataset',
    category: 'Audio',
    seller: 'AudioMine Corp',
    rejectedDate: '2024-05-16',
    reason: 'Missing labels, corrupted files',
    price: '$199',
  },
];

export const RejectedDatasets = ({ onReview }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='p-1'>Rejected Datasets</CardTitle>
        <CardDescription>Datasets that have been rejected with reasons</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Dataset</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Rejected Date</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rejectedDatasets.map((dataset) => (
              <TableRow key={dataset.id}>
                <TableCell>
                  <div className="font-medium">{dataset.title}</div>
                  <div className="text-sm text-gray-500">{dataset.price}</div>
                </TableCell>
                <TableCell>{dataset.seller}</TableCell>
                <TableCell>
                  <Badge variant="outline">{dataset.category}</Badge>
                </TableCell>
                <TableCell>{dataset.rejectedDate}</TableCell>
                <TableCell>
                  <div className="text-sm text-red-600 max-w-xs">
                    {dataset.reason}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onReview(dataset)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Review
                    </Button>
                    <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                      <Check className="h-4 w-4 mr-1" />
                      Restore
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
