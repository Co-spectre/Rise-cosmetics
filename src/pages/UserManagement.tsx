import React from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, UserX, Mail } from 'lucide-react';

const UserManagement = () => {
  const users = [
    {
      id: '1',
      name: 'Maria Rossi',
      email: 'maria@example.com',
      status: 'active',
      role: 'customer',
      joinDate: '2024-01-15',
      orders: 3
    },
    {
      id: '2',
      name: 'Giuseppe Verdi',
      email: 'giuseppe@example.com',
      status: 'active',
      role: 'customer',
      joinDate: '2024-01-10',
      orders: 1
    }
  ];

  const stats = [
    {
      title: 'Total Users',
      value: '856',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Users',
      value: '834',
      icon: UserCheck,
      color: 'green'
    },
    {
      title: 'Inactive Users',
      value: '22',
      icon: UserX,
      color: 'red'
    },
    {
      title: 'Newsletter Subscribers',
      value: '634',
      icon: Mail,
      color: 'purple'
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">Manage customer accounts and user data.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">Name</th>
                    <th className="py-2">Email</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Role</th>
                    <th className="py-2">Join Date</th>
                    <th className="py-2">Orders</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="py-3 font-medium">{user.name}</td>
                      <td className="py-3 text-gray-600">{user.email}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 text-gray-600">{user.role}</td>
                      <td className="py-3 text-gray-600">{user.joinDate}</td>
                      <td className="py-3 text-gray-600">{user.orders}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default UserManagement;
