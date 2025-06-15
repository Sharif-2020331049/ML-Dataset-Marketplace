// import React, { useState } from 'react';
// import { User, Settings, Upload, ShoppingBag, Edit2, Camera } from 'lucide-react';
// import { Button } from '../components/ui/Button.jsx';
// import { Card, CardContent, CardHeader } from '../components/ui/CategoryCard.jsx';
// import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/Avatar.jsx';

// const UserProfile = () => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [isEditing, setIsEditing] = useState(false);
//   const [userInfo, setUserInfo] = useState({
//     firstName: 'John',
//     lastName: 'Doe',
//     email: 'john.doe@example.com',
//     bio: 'Machine learning enthusiast and data scientist with 5+ years of experience.',
//     location: 'Dhaka, Bangladesh',
//     joinDate: 'January 2023',
//     avatar: ''
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserInfo(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSave = () => {
//     setIsEditing(false);
//     console.log('User info updated:', userInfo);
//     // Save logic
//   };

//   const userDatasets = [
//     {
//       id: 1,
//       title: 'Bengali Handwriting Dataset',
//       category: 'Image',
//       price: '৳1500',
//       status: 'approved',
//       downloads: 45
//     },
//     {
//       id: 2,
//       title: 'Customer Review Sentiment Data',
//       category: 'Text',
//       price: '৳800',
//       status: 'pending',
//       downloads: 0
//     }
//   ];

//   const userPurchases = [
//     {
//       id: 1,
//       title: 'Fashion Product Images',
//       category: 'Image',
//       price: '৳2000',
//       purchaseDate: '2024-01-15'
//     },
//     {
//       id: 2,
//       title: 'Stock Market Data',
//       category: 'Financial',
//       price: '৳1200',
//       purchaseDate: '2024-01-10'
//     }
//   ];

//   const tabs = [
//     { id: 'overview', label: 'Overview', icon: User },
//     { id: 'datasets', label: 'My Datasets', icon: Upload },
//     { id: 'purchases', label: 'Purchases', icon: ShoppingBag },
//     { id: 'settings', label: 'Settings', icon: Settings }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="max-w-6xl mx-auto">
//           <Card className="mb-8">
//             <CardContent className="p-8">
//               <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8">
//                 <div className="relative">
//                   <Avatar className="w-24 h-24">
//                     <AvatarImage src={userInfo.avatar} />
//                     <AvatarFallback className="text-xl">
//                       {userInfo.firstName[0]}{userInfo.lastName[0]}
//                     </AvatarFallback>
//                   </Avatar>
//                   <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
//                     <Camera className="w-4 h-4" />
//                   </button>
//                 </div>

//                 <div className="flex-1">
//                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//                     <div>
//                       <h1 className="text-3xl font-bold text-gray-900">
//                         {userInfo.firstName} {userInfo.lastName}
//                       </h1>
//                       <p className="text-gray-600 mt-1">{userInfo.email}</p>
//                       <p className="text-sm text-gray-500 mt-1">
//                         Member since {userInfo.joinDate} • {userInfo.location}
//                       </p>
//                     </div>
//                     <Button
//                       onClick={() => setIsEditing(!isEditing)}
//                       variant="outline"
//                       className="mt-4 sm:mt-0"
//                     >
//                       <Edit2 className="w-4 h-4 mr-2" />
//                       {isEditing ? 'Cancel' : 'Edit Profile'}
//                     </Button>
//                   </div>

//                   {isEditing ? (
//                     <div className="mt-4 space-y-4">
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <input
//                           type="text"
//                           name="firstName"
//                           value={userInfo.firstName}
//                           onChange={handleInputChange}
//                           placeholder="First Name"
//                           className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         />
//                         <input
//                           type="text"
//                           name="lastName"
//                           value={userInfo.lastName}
//                           onChange={handleInputChange}
//                           placeholder="Last Name"
//                           className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         />
//                       </div>
//                       <input
//                         type="text"
//                         name="location"
//                         value={userInfo.location}
//                         onChange={handleInputChange}
//                         placeholder="Location"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                       <textarea
//                         name="bio"
//                         value={userInfo.bio}
//                         onChange={handleInputChange}
//                         placeholder="Bio"
//                         rows={3}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                       <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
//                         Save Changes
//                       </Button>
//                     </div>
//                   ) : (
//                     <p className="text-gray-700 mt-4">{userInfo.bio}</p>
//                   )}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <div className="flex flex-wrap gap-2 mb-8">
//             {tabs.map((tab) => {
//               const Icon = tab.icon;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
//                     activeTab === tab.id
//                       ? 'bg-blue-600 text-white'
//                       : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
//                   }`}
//                 >
//                   <Icon className="w-4 h-4 mr-2" />
//                   {tab.label}
//                 </button>
//               );
//             })}
//           </div>

//           {activeTab === 'overview' && (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="text-lg">Datasets Uploaded</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-3xl font-bold text-blue-600">{userDatasets.length}</div>
//                   <p className="text-gray-600 text-sm">Total datasets</p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="text-lg">Total Downloads</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-3xl font-bold text-green-600">
//                     {userDatasets.reduce((sum, d) => sum + d.downloads, 0)}
//                   </div>
//                   <p className="text-gray-600 text-sm">Across all datasets</p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="text-lg">Purchases Made</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-3xl font-bold text-purple-600">{userPurchases.length}</div>
//                   <p className="text-gray-600 text-sm">Datasets purchased</p>
//                 </CardContent>
//               </Card>
//             </div>
//           )}

//           {activeTab === 'datasets' && (
//             <Card>
//               <CardHeader>
//                 <CardTitle>My Uploaded Datasets</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {userDatasets.map((dataset) => (
//                     <div key={dataset.id} className="border border-gray-200 rounded-lg p-4">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <h3 className="font-semibold text-gray-900">{dataset.title}</h3>
//                           <p className="text-gray-600 text-sm">{dataset.category} • {dataset.price}</p>
//                           <p className="text-gray-500 text-sm mt-1">
//                             {dataset.downloads} downloads
//                           </p>
//                         </div>
//                         <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                           dataset.status === 'approved' 
//                             ? 'bg-green-100 text-green-800' 
//                             : 'bg-yellow-100 text-yellow-800'
//                         }`}>
//                           {dataset.status}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {activeTab === 'purchases' && (
//             <Card>
//               <CardHeader>
//                 <CardTitle>Purchase History</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {userPurchases.map((purchase) => (
//                     <div key={purchase.id} className="border border-gray-200 rounded-lg p-4">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <h3 className="font-semibold text-gray-900">{purchase.title}</h3>
//                           <p className="text-gray-600 text-sm">{purchase.category} • {purchase.price}</p>
//                           <p className="text-gray-500 text-sm mt-1">
//                             Purchased on {purchase.purchaseDate}
//                           </p>
//                         </div>
//                         <Button variant="outline" size="sm">
//                           Download
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {activeTab === 'settings' && (
//             <Card>
//               <CardHeader>
//                 <CardTitle>Account Settings</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-6">
//                   <div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-4">Email Preferences</h3>
//                     <div className="space-y-3">
//                       <label className="flex items-center">
//                         <input type="checkbox" defaultChecked className="mr-3" />
//                         <span className="text-gray-700">Email notifications for new dataset purchases</span>
//                       </label>
//                       <label className="flex items-center">
//                         <input type="checkbox" defaultChecked className="mr-3" />
//                         <span className="text-gray-700">Marketing emails and updates</span>
//                       </label>
//                       <label className="flex items-center">
//                         <input type="checkbox" className="mr-3" />
//                         <span className="text-gray-700">Weekly dataset recommendations</span>
//                       </label>
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-4">Privacy Settings</h3>
//                     <div className="space-y-3">
//                       <label className="flex items-center">
//                         <input type="checkbox" defaultChecked className="mr-3" />
//                         <span className="text-gray-700">Make my profile public</span>
//                       </label>
//                       <label className="flex items-center">
//                         <input type="checkbox" className="mr-3" />
//                         <span className="text-gray-700">Show my uploaded datasets on profile</span>
//                       </label>
//                     </div>
//                   </div>

//                   <div className="pt-4 border-t">
//                     <Button variant="destructive">
//                       Delete Account
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;