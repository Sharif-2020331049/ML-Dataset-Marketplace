import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Home, Receipt } from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl border border-gray-200 p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">
            Thank you for your purchase. You now have access to download the dataset.
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <Button 
            size="lg" 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Dataset
          </Button>
          
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
