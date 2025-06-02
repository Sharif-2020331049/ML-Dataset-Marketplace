import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.jsx';
import { Button } from './ui/button.jsx';
import { Badge } from './ui/badge.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table.jsx';
import { Input } from './ui/input.jsx';
import { Eye, Ban, Trash } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const users = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    email: 'sarah.chen@medtech.com',
    role: 'Seller',
    joinDate: '2024-03-15',
    uploads: 5,
    purchases: 12,
    status: 'Active',
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    email: 'mike.r@datascience.io',
    role: 'Buyer',
    joinDate: '2024-04-22',
    uploads: 0,
    purchases: 8,
    status: 'Active',
  },
  {
    id: 3,
    name: 'FinanceAI Corp',
    email: 'data@financeai.com',
    role: 'Seller',
    joinDate: '2024-02-10',
    uploads: 23,
    purchases: 3,
    status: 'Suspended',
  },
];

export const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'Suspended':
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleViewUser = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className='p-1'>User Management</CardTitle>
            <CardDescription>Manage platform users and their activities</CardDescription>
          </div>
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-32 sm:w-40 md:w-48"

          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Uploads</TableHead>
              <TableHead>Purchases</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={user.role === 'Seller' ? 'default' : 'secondary'}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell>{user.uploads}</TableCell>
                <TableCell>{user.purchases}</TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewUser(user.id)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={user.status === 'Suspended' ? 'text-green-600 hover:text-green-700' : 'text-orange-600 hover:text-orange-700'}
                    >
                      <Ban className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash className="h-4 w-4" />
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
