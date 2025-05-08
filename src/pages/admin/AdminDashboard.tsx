import React, { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import ToolsCMS from './ToolsCMS';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AdminDashboard: React.FC = () => {
  const { user, signIn, signOut } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await signIn({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  };

  if (user) {
    return <ToolsCMS user={user} signOut={signOut} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
        <p className="mb-6 text-muted-foreground">Log in om het CMS te gebruiken.</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Wachtwoord"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Inloggen...' : 'Inloggen'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard; 