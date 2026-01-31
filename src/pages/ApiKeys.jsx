import React, { useEffect, useState } from 'react';
import { Key, Plus, Search, Trash2, Loader2, X, AlertTriangle, Check, Shield, Wand2 } from 'lucide-react';
import apiKeyService from '../services/apiKeyService';
// Option: If uuid fails, use: const uuidv4 = () => window.crypto.randomUUID();
import { v4 as uuidv4 } from 'uuid'; 

const ApiKeys = () => {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, keyId: null, keyName: '' });

  const [formData, setFormData] = useState({ 
    clientName: '', 
    clientId: '', 
    clientSecret: '',
    scopes: ['read'] 
  });

  useEffect(() => {
    fetchKeys();
  }, []);

  const fetchKeys = async () => {
    try {
      const response = await apiKeyService.getApiKeys();
      setKeys(response.data);
    } catch (error) {
      console.error("Error fetching API keys", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScopeChange = (scope) => {
    const updatedScopes = formData.scopes.includes(scope)
      ? formData.scopes.filter(s => s !== scope)
      : [...formData.scopes, scope];
    setFormData({ ...formData, scopes: updatedScopes });
  };

  const generateCredentials = () => {
    setFormData({
      ...formData,
      clientId: uuidv4().split('-')[0] + '-' + uuidv4().split('-')[1],
      clientSecret: uuidv4().replace(/-/g, '')
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await apiKeyService.createApiKey(formData);
      setIsAddModalOpen(false);
      setFormData({ clientName: '', clientId: '', clientSecret: '', scopes: ['read'] });
      fetchKeys();
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const filteredKeys = keys.filter(k => 
    k.clientName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">External Applications</h1>
          <p className="text-slate-400 text-sm">Review and manage authorized system clients</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold transition-all"
        >
          <Plus size={18} />
          <span>Register New App</span>
        </button>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900/50 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
              <tr>
                <th className="px-6 py-4">Client Name</th>
                <th className="px-6 py-4">Client ID</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {loading ? (
                <tr><td colSpan="3" className="px-6 py-12 text-center"><Loader2 className="animate-spin mx-auto text-blue-500" /></td></tr>
              ) : filteredKeys.map((item) => (
                <tr key={item.id} className="hover:bg-slate-700/30">
                  <td className="px-6 py-4 font-semibold text-slate-200">{item.clientName}</td>
                  <td className="px-6 py-4 text-slate-400 text-xs font-mono">{item.clientId}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-500 hover:text-red-400 transition-all">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Shield className="text-blue-500" size={24} /> Register Application
              </h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Client Name</label>
                <input type="text" required placeholder="e.g. Laboratory-System"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={formData.clientName} onChange={(e) => setFormData({...formData, clientName: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Client ID</label>
                  <input type="text" required placeholder="Unique ID"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white font-mono text-xs outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={formData.clientId} onChange={(e) => setFormData({...formData, clientId: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Client Secret</label>
                  <input type="text" required placeholder="Secret Key"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white font-mono text-xs outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={formData.clientSecret} onChange={(e) => setFormData({...formData, clientSecret: e.target.value})} />
                </div>
              </div>

              <button type="button" onClick={generateCredentials}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-[10px] font-bold uppercase transition-colors">
                <Wand2 size={14} /> Auto-generate Credentials
              </button>

              <div className="space-y-3 pt-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Required Scopes</label>
                <div className="flex gap-2">
                  {['read', 'write', 'delete'].map((scope) => (
                    <button key={scope} type="button" onClick={() => handleScopeChange(scope)}
                      className={`px-4 py-1.5 rounded-full border text-[10px] font-bold transition-all ${
                        formData.scopes.includes(scope) 
                          ? 'bg-blue-600 border-blue-500 text-white' 
                          : 'bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-600'
                      }`}>
                      {scope.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 px-4 py-2.5 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700 font-semibold transition-all">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 font-bold shadow-lg transition-all">Save Application</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiKeys;