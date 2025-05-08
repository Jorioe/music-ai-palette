import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { MusicTool } from '@/types/MusicTool';
import { Button } from '@/components/ui/button';

interface ToolsCMSProps {
  user: any;
  signOut: () => void;
}

const ToolsCMS: React.FC<ToolsCMSProps> = ({ user, signOut }) => {
  const [tools, setTools] = useState<MusicTool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTools = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('tools').select('*');
      if (!error && data) setTools(data as MusicTool[]);
      setLoading(false);
    };
    fetchTools();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center py-12">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Tools Beheren</h1>
          <Button variant="outline" onClick={signOut}>Uitloggen</Button>
        </div>
        {loading ? (
          <div>Laden...</div>
        ) : (
          <div className="space-y-4">
            {tools.map(tool => (
              <div key={tool.id} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="font-semibold text-lg">{tool.name}</div>
                  <div className="text-sm text-muted-foreground">{tool.description}</div>
                </div>
                {/* Hier komen later bewerk/verwijder knoppen */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolsCMS; 