// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { CheckCircle, Download, Home, Receipt } from 'lucide-react';
// import { Button } from '../components/ui/Button.jsx';

// const PaymentSuccess = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//       <div className="max-w-md w-full bg-white rounded-xl border border-gray-200 p-8 text-center">
//         <div className="mb-6">
//           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <CheckCircle className="w-10 h-10 text-green-600" />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
//           <p className="text-gray-600">
//             Thank you for your purchase. You now have access to download the dataset.
//           </p>
//         </div>

//         <div className="space-y-3 mb-6">
//           <Button 
//             size="lg" 
//             className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
//           >
//             <Download className="w-4 h-4 mr-2" />
//             Download Dataset
//           </Button>
          
//           <Button 
//             variant="outline" 
//             size="lg" 
//             className="w-full"
//             onClick={() => navigate('/')}
//           >
//             <Home className="w-4 h-4 mr-2" />
//             Back to Home
//           </Button>
          
//           <Button 
//             variant="ghost" 
//             size="lg" 
//             className="w-full"
//           >
//             <Receipt className="w-4 h-4 mr-2" />
//             View Receipt
//           </Button>
//         </div>

//         <p className="text-xs text-gray-500">
//           A confirmation email has been sent to your registered email address.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;






// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { CheckCircle, Download, Home } from 'lucide-react';
// import { Button } from '../components/ui/Button.jsx';
// import axios from '../api/axios.js';
// import { toast } from 'react-toastify';

// const PaymentSuccess = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [downloadLink, setDownloadLink] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchDownloadLink = async () => {
//       try {
//         const searchParams = new URLSearchParams(location.search);
//         const sessionId = searchParams.get('session_id');
        
//         if (!sessionId) {
//           throw new Error('Missing session ID');
//         }

//         const response = await axios.get(`dataset/payment/success?session_id=${sessionId}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         });

//         setDownloadLink(response.data.downloadLink);
//       } catch (error) {
//         console.error('Failed to get download link:', error);
//         toast.error(error.response?.data?.error || 'Failed to get download link');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDownloadLink();
//   }, [location]);

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//       <div className="max-w-md w-full bg-white rounded-xl border border-gray-200 p-8 text-center">
//         {/* ... your success UI ... */}
//         {downloadLink && (
//           <a 
//             href={downloadLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             download
//             className="block"
//           >
//             <Button 
//               size="lg" 
//               className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
//             >
//               <Download className="w-4 h-4 mr-2" />
//               Download Dataset Now
//             </Button>
//           </a>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;


// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { CheckCircle, Download, Home, Receipt } from 'lucide-react';
// import { Button } from '../components/ui/Button.jsx';
// import axios from '../api/axios.js';
// import { toast } from 'react-toastify';

// const PaymentSuccess = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [downloadLink, setDownloadLink] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [downloadId, setDownloadId] = useState("")

//   useEffect(() => {
//     const fetchDownloadData = async () => {
//       try {
//         const searchParams = new URLSearchParams(location.search);
//         const sessionId = searchParams.get('session_id');
        
//         if (!sessionId) {
//           throw new Error('Missing session ID');
//         }

//         // 1. Verify payment and get datasetId
//         const paymentResponse = await axios.get(
//           `/purchase/payment/success?session_id=${sessionId}`,
//           { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
//         );

//         const { datasetId } = paymentResponse.data;

//         // 2. Get dataset details including originalFileId
//         const datasetResponse = await axios.get(
//           `/dataset/${datasetId}/details`,
//           { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
//         );

//         setDownloadId(datasetResponse.data.originalFileId);
        

//         // 3. Set download information
//         setDownloadInfo({
//           url: `http://localhost:8000/api/v1/archive/${downloadId}`, // Your download endpoint
//           filename: `${datasetResponse.data.datasetTitle}.zip`
//         });

//       } catch (error) {
//         console.error('Failed to get download data:', error);
//         toast.error(error.response?.data?.error || 'Failed to prepare download');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDownloadData();
//   }, [location]);

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//       <div className="max-w-md w-full bg-white rounded-xl border border-gray-200 p-8 text-center">
//         <div className="mb-6">
//           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <CheckCircle className="w-10 h-10 text-green-600" />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
//           <p className="text-gray-600">
//             Thank you for your purchase. {downloadLink ? 'You can now download the dataset.' : 'Preparing your download...'}
//           </p>
//         </div>

//         <div className="space-y-3 mb-6">
//           {isLoading ? (
//             <Button 
//               size="lg" 
//               className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
//               disabled
//             >
//               <Download className="w-4 h-4 mr-2 animate-pulse" />
//               Preparing download...
//             </Button>
//           ) : downloadLink ? (
//             <a 
//               href={downloadLink}
//               target="_blank"
//               rel="noopener noreferrer"
//               download
//               className="block"
//             >
//               <Button 
//                 size="lg" 
//                 className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
//               >
//                 <Download className="w-4 h-4 mr-2" />
//                 Download Dataset
//               </Button>
//             </a>
//           ) : (
//             <Button 
//               size="lg" 
//               className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
//               disabled
//             >
//               <Download className="w-4 h-4 mr-2" />
//               Download Unavailable
//             </Button>
//           )}
          
//           <Button 
//             variant="outline" 
//             size="lg" 
//             className="w-full"
//             onClick={() => navigate('/')}
//           >
//             <Home className="w-4 h-4 mr-2" />
//             Back to Home
//           </Button>
          
//           <Button 
//             variant="ghost" 
//             size="lg" 
//             className="w-full"
//           >
//             <Receipt className="w-4 h-4 mr-2" />
//             View Receipt
//           </Button>
//         </div>

//         <p className="text-xs text-gray-500">
//           A confirmation email has been sent to your registered email address.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;


import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Home, Receipt } from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import axios from '../api/axios.js';
import { toast } from 'react-toastify';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [downloadLink, setDownloadLink] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadId, setDownloadId] = useState("");

  useEffect(() => {
    const fetchDownloadData = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const sessionId = searchParams.get('session_id');
        
        if (!sessionId) {
          throw new Error('Missing session ID');
        }

        // 1. Verify payment and get datasetId
        const paymentResponse = await axios.get(
          `/purchase/payment/success?session_id=${sessionId}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );

        const { datasetId } = paymentResponse.data;

        // 2. Get dataset details including originalFileId
        const datasetResponse = await axios.get(
          `/dataset/${datasetId}/details`,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );

        // Set the downloadId first
        console.log(datasetResponse.data.originalFileId);
        
        // Then set the download link using the current downloadId
        setDownloadLink(`http://localhost:8000/api/v1/archive/download/${datasetResponse.data.originalFileId}`);

      } catch (error) {
        console.error('Failed to get download data:', error);
        toast.error(error.response?.data?.error || 'Failed to prepare download');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDownloadData();
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl border border-gray-200 p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">
            Thank you for your purchase. {downloadLink ? 'You can now download the dataset.' : 'Preparing your download...'}
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {isLoading ? (
            <Button 
              size="lg" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled
            >
              <Download className="w-4 h-4 mr-2 animate-pulse" />
              Preparing download...
            </Button>
          ) : downloadLink ? (
            <a 
              href={downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="block"
            >
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Dataset
              </Button>
            </a>
          ) : (
            <Button 
              size="lg" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled
            >
              <Download className="w-4 h-4 mr-2" />
              Download Unavailable
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full"
            onClick={() => navigate('/')}
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <Button 
            variant="ghost" 
            size="lg" 
            className="w-full"
          >
            <Receipt className="w-4 h-4 mr-2" />
            View Receipt
          </Button>
        </div>

        <p className="text-xs text-gray-500">
          A confirmation email has been sent to your registered email address.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;