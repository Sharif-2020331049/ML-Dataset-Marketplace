import { useState } from 'react';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';

export const RegisterAdminForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');      
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      setMessage({ type: 'error', text: 'Please fill all fields' });
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Admin registered successfully!' });
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
      } else {
        setMessage({ type: 'error', text: data.message || 'Registration failed' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error' });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 tracking-wide text-center">
        Register New Admin
      </h2>

      {message && (
        <p
          className={`mb-6 text-center font-medium ${
            message.type === 'error' ? 'text-red-600' : 'text-green-600'
          }`}
        >
          {message.text}
        </p>
      )}

      <form onSubmit={handleRegister} className="space-y-5">
        <div>
          <label htmlFor="firstName" className="block mb-2 text-sm font-semibold text-gray-700">
            First Name
          </label>
          <Input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
            required
            className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block mb-2 text-sm font-semibold text-gray-700">
            Last Name
          </label>
          <Input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
            required
            className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
            className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 rounded-lg"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-colors shadow-md"
        >
          Register Now
        </Button>
      </form>
    </div>
  );
};
