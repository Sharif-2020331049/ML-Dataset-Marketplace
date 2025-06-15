import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Menu, X } from 'lucide-react';
import { Button } from '../ui/Button.jsx';
import { DataContext } from '../../context/DataContext.jsx';

const Header = () => {
  const { token, setToken, navigate } = useContext(DataContext)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/');
    setIsProfileDropdownOpen(false);
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">OD</span>
            </div>
            <span className="text-xl font-bold text-gray-900">OpenDataX</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/browse" className="text-gray-700 hover:text-blue-600 transition-colors">
              Browse Datasets
            </Link>
            <Link to="/upload" className="text-gray-700 hover:text-blue-600 transition-colors">
              Upload
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search datasets..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {token ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </button>
                
                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/browse"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Browse Datasets
              </Link>
              <Link
                to="/upload"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Upload
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>

              {/* Mobile Auth Section */}
              <div className="border-t border-gray-200 pt-2">
                {token ? (
                  <>
                    <Link
                      to="/profile"
                      className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="px-3 py-2 space-y-2">
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">Login</Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;



// import React, { useContext, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Search, User, Menu, X } from 'lucide-react';
// import { Button } from '../ui/Button.jsx';
// import { DataContext } from '../../context/DataContext.jsx';

// const Header = () => {
//   const { token, setToken, navigate } = useContext(DataContext)
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-sm">OD</span>
//             </div>
//             <span className="text-xl font-bold text-gray-900">OpenDataX</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-8">
//             <Link to="/browse" className="text-gray-700 hover:text-blue-600 transition-colors">
//               Browse Datasets
//             </Link>
//             <Link to="/upload" className="text-gray-700 hover:text-blue-600 transition-colors">
//               Upload
//             </Link>
//             <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
//               Contact
//             </Link>
//           </nav>

//           {/* Search Bar */}
//           <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
//             <div className="relative w-full">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <input
//                 type="text"
//                 placeholder="Search datasets..."
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//           </div>

//           {/* Auth Buttons */}
//           {/* Auth Buttons (Desktop) */}
//           <div className="hidden md:flex items-center space-x-4">
//             {token ? (
//               <>
//                 <Button
//                   variant="outline" 
//                   className="text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
//                   onClick={() => {
//                     setToken(null);
//                     localStorage.removeItem('token');
//                     navigate('/')
//                   }}
//                 >
//                   Log out
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Link to="/login">
//                   <Button variant="outline">Login</Button>
//                 </Link>
//                 <Link to="/register">
//                   <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
//                     Sign Up
//                   </Button>
//                 </Link>
//               </>
//             )}
//           </div>


//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden p-2"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           >
//             {isMobileMenuOpen ? (
//               <X className="w-6 h-6 text-gray-700" />
//             ) : (
//               <Menu className="w-6 h-6 text-gray-700" />
//             )}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden border-t border-gray-200 bg-white">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               <Link
//                 to="/browse"
//                 className="block px-3 py-2 text-gray-700 hover:text-blue-600"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 Browse Datasets
//               </Link>
//               <Link
//                 to="/upload"
//                 className="block px-3 py-2 text-gray-700 hover:text-blue-600"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 Upload
//               </Link>
//               <Link
//                 to="/contact"
//                 className="block px-3 py-2 text-gray-700 hover:text-blue-600"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 Contact
//               </Link>

//               {/* Auth Buttons / User Dropdown */}
//               <div className="hidden md:flex items-center space-x-4 relative">
//                 {token ? (
//                   <div className="relative group">
//                     <Button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
//                       <User className="w-5 h-5" />
//                       <span>Account</span>
//                     </Button>
//                     <div className="hidden group-hover:flex flex-col gap-2 absolute right-0 mt-2 w-40 py-3 px-5 bg-white text-gray-700 rounded shadow-lg z-50">
//                       <Link to="/profile" className="hover:text-black">My Profile</Link>
//                       <button onClick={() => navigate('/dashboard')} className="text-left hover:text-black">Dashboard</button>
//                       {/* <button onClick={logout} className="text-left hover:text-black">Logout</button> */}
//                     </div>
//                   </div>
//                 ) : (
//                   <>
//                     <Link to="/login">
//                       <Button variant="outline">Login</Button>
//                     </Link>
//                     <Link to="/register">
//                       <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
//                         Sign Up
//                       </Button>
//                     </Link>
//                   </>
//                 )}
//               </div>



//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;





// import React, { useContext, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Search, User, Menu, X } from 'lucide-react';
// import { Button } from '../ui/Button.jsx';
// import { DataContext } from '../../context/DataContext.jsx';

// const Header = () => {
//   const { token, setToken, navigate } = useContext(DataContext)
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-sm">OD</span>
//             </div>
//             <span className="text-xl font-bold text-gray-900">OpenDataX</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-8">
//             <Link to="/browse" className="text-gray-700 hover:text-blue-600 transition-colors">
//               Browse Datasets
//             </Link>
//             <Link to="/upload" className="text-gray-700 hover:text-blue-600 transition-colors">
//               Upload
//             </Link>
//             <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
//               Contact
//             </Link>
//           </nav>

//           {/* Search Bar */}
//           <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
//             <div className="relative w-full">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <input
//                 type="text"
//                 placeholder="Search datasets..."
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//           </div>

//           {/* Auth Buttons */}
//           {/* Auth Buttons (Desktop) */}
//           <div className="hidden md:flex items-center space-x-4">
//             {token ? (
//               <>
//                 <Button
//                   variant="outline" 
//                   className="text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
//                   onClick={() => {
//                     setToken(null);
//                     localStorage.removeItem('token');
//                     navigate('/')
//                   }}
//                 >
//                   Log out
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Link to="/login">
//                   <Button variant="outline">Login</Button>
//                 </Link>
//                 <Link to="/register">
//                   <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
//                     Sign Up
//                   </Button>
//                 </Link>
//               </>
//             )}
//           </div>


//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden p-2"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           >
//             {isMobileMenuOpen ? (
//               <X className="w-6 h-6 text-gray-700" />
//             ) : (
//               <Menu className="w-6 h-6 text-gray-700" />
//             )}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden border-t border-gray-200 bg-white">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               <Link
//                 to="/browse"
//                 className="block px-3 py-2 text-gray-700 hover:text-blue-600"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 Browse Datasets
//               </Link>
//               <Link
//                 to="/upload"
//                 className="block px-3 py-2 text-gray-700 hover:text-blue-600"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 Upload
//               </Link>
//               <Link
//                 to="/contact"
//                 className="block px-3 py-2 text-gray-700 hover:text-blue-600"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 Contact
//               </Link>

//               {/* Auth Buttons / User Dropdown */}
//               <div className="hidden md:flex items-center space-x-4 relative">
//                 {token ? (
//                   <div className="relative group">
//                     <Button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
//                       <User className="w-5 h-5" />
//                       <span>Account</span>
//                     </Button>
//                     <div className="hidden group-hover:flex flex-col gap-2 absolute right-0 mt-2 w-40 py-3 px-5 bg-white text-gray-700 rounded shadow-lg z-50">
//                       <Link to="/profile" className="hover:text-black">My Profile</Link>
//                       <button onClick={() => navigate('/dashboard')} className="text-left hover:text-black">Dashboard</button>
//                       {/* <button onClick={logout} className="text-left hover:text-black">Logout</button> */}
//                     </div>
//                   </div>
//                 ) : (
//                   <>
//                     <Link to="/login">
//                       <Button variant="outline">Login</Button>
//                     </Link>
//                     <Link to="/register">
//                       <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
//                         Sign Up
//                       </Button>
//                     </Link>
//                   </>
//                 )}
//               </div>



//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;



// import React, { useContext, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Search, User, Menu, X } from 'lucide-react';
// import { Button } from '../ui/Button.jsx';
// import { DataContext } from '../../context/DataContext.jsx';

// const Header = () => {
//   const { token, setToken, navigate } = useContext(DataContext)
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-sm">OD</span>
//             </div>
//             <span className="text-xl font-bold text-gray-900">OpenDataX</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-8">
//             <Link to="/browse" className="text-gray-700 hover:text-blue-600 transition-colors">
//               Browse Datasets
//             </Link>
//             <Link to="/upload" className="text-gray-700 hover:text-blue-600 transition-colors">
//               Upload
//             </Link>
//             <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
//               Contact
//             </Link>
//           </nav>

//           {/* Search Bar */}
//           <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
//             <div className="relative w-full">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <input
//                 type="text"
//                 placeholder="Search datasets..."
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//           </div>

//           {/* Auth Buttons */}
//           {/* Auth Buttons (Desktop) */}
//           <div className="hidden md:flex items-center space-x-4">
//             {token ? (
//               <>
//                 <Button
//                   variant="outline" 
//                   className="text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
//                   onClick={() => {
//                     setToken(null);
//                     localStorage.removeItem('token');
//                     navigate('/')
//                   }}
//                 >
//                   Log out
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Link to="/login">
//                   <Button variant="outline">Login</Button>
//                 </Link>
//                 <Link to="/register">
//                   <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
//                     Sign Up
//                   </Button>
//                 </Link>
//               </>
//             )}
//           </div>


//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden p-2"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           >
//             {isMobileMenuOpen ? (
//               <X className="w-6 h-6 text-gray-700" />
//             ) : (
//               <Menu className="w-6 h-6 text-gray-700" />
//             )}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden border-t border-gray-200 bg-white">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               <Link
//                 to="/browse"
//                 className="block px-3 py-2 text-gray-700 hover:text-blue-600"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 Browse Datasets
//               </Link>
//               <Link
//                 to="/upload"
//                 className="block px-3 py-2 text-gray-700 hover:text-blue-600"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 Upload
//               </Link>
//               <Link
//                 to="/contact"
//                 className="block px-3 py-2 text-gray-700 hover:text-blue-600"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 Contact
//               </Link>

//               {/* Auth Buttons / User Dropdown */}
//               <div className="hidden md:flex items-center space-x-4 relative">
//                 {token ? (
//                   <div className="relative group">
//                     <Button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
//                       <User className="w-5 h-5" />
//                       <span>Account</span>
//                     </Button>
//                     <div className="hidden group-hover:flex flex-col gap-2 absolute right-0 mt-2 w-40 py-3 px-5 bg-white text-gray-700 rounded shadow-lg z-50">
//                       <Link to="/profile" className="hover:text-black">My Profile</Link>
//                       <button onClick={() => navigate('/dashboard')} className="text-left hover:text-black">Dashboard</button>
//                       {/* <button onClick={logout} className="text-left hover:text-black">Logout</button> */}
//                     </div>
//                   </div>
//                 ) : (
//                   <>
//                     <Link to="/login">
//                       <Button variant="outline">Login</Button>
//                     </Link>
//                     <Link to="/register">
//                       <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
//                         Sign Up
//                       </Button>
//                     </Link>
//                   </>
//                 )}
//               </div>



//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;



// import React, { useContext, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Search, User, Menu, X } from 'lucide-react';
// import { Button } from '../ui/Button.jsx';
// import { DataContext } from '../../context/DataContext.jsx';

// const Header = () => {
//   const { token, setToken, navigate } = useContext(DataContext)
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-sm">OD</span>
//             </div>
//             <span className="text-xl font-bold text-gray-900">OpenDataX</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-8">
//             <Link to="/browse" className="text-gray-700 hover:text-blue-600 transition-colors">
//               Browse Datasets
//             </Link>
//             <Link to="/upload" className="text-gray-700 hover:text-blue-600 transition-colors">
//               Upload
//             </Link>
//             <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
//               Contact
//             </Link>
//           </nav>

//           {/* Search Bar */}
//           <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
//             <div className="relative w-full">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <input
//                 type="text"
//                 placeholder="Search datasets..."
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//           </div>

//           {/* Auth Buttons */}
//           {/* Auth Buttons (Desktop) */}
//           <div className="hidden md:flex items-center space-x-4">
//             {token ? (
//               <>
//                 <Button
//                   variant="outline" 
//                   className="text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
//                   onClick={() => {
//                     setToken(null);
//                     localStorage.removeItem('token');
//                     navigate('/')
//                   }}
//                 >
//                   Log out
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Link to="/login">
//                   <Button variant="outline">Login</Button>
//                 </Link>
//                 <Link to="/register">
//                   <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
//                     Sign Up
//                   </Button>
//                 </Link>
//               </>
//             )}
//           </div>


//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden p-2"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           >
//             {isMobileMenuOpen ? (
//               <X className="w-6 h-6 text-gray-700" />
//             ) : (
//               <Menu className="w-6 h-6 text-gray-700" />
//             )}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden border-t border-gray-200 bg-white">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               <Link
//                 to="/browse"
//                 className="block px-3 py-2 text-gray-700 hover:text-blue-600"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 Browse Datasets
//               </Link>
//               <Link
//                 to="/upload"
//                 className="block px-3 py-2 text-gray-700 hover:text-blue-600"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 Upload
//               </Link>
//               <Link
//                 to="/contact"
//                 className="block px-3 py-2 text-gray-700 hover:text-blue-600"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 Contact
//               </Link>

//               {/* Auth Buttons / User Dropdown */}
//               <div className="hidden md:flex items-center space-x-4 relative">
//                 {token ? (
//                   <div className="relative group">
//                     <Button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
//                       <User className="w-5 h-5" />
//                       <span>Account</span>
//                     </Button>
//                     <div className="hidden group-hover:flex flex-col gap-2 absolute right-0 mt-2 w-40 py-3 px-5 bg-white text-gray-700 rounded shadow-lg z-50">
//                       <Link to="/profile" className="hover:text-black">My Profile</Link>
//                       <button onClick={() => navigate('/dashboard')} className="text-left hover:text-black">Dashboard</button>
//                       {/* <button onClick={logout} className="text-left hover:text-black">Logout</button> */}
//                     </div>
//                   </div>
//                 ) : (
//                   <>
//                     <Link to="/login">
//                       <Button variant="outline">Login</Button>
//                     </Link>
//                     <Link to="/register">
//                       <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
//                         Sign Up
//                       </Button>
//                     </Link>
//                   </>
//                 )}
//               </div>



//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;