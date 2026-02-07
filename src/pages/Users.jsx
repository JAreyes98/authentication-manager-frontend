import React, { useEffect, useState } from 'react';
import { UserPlus, Search, Edit2, Trash2, Loader2, X, AlertTriangle, CheckCircle } from 'lucide-react';
import userService from '../services/userService';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, userId: null, username: '' });
  
  const [formData, setFormData] = useState({ username: '', email: '', password: '', roles: ['ROLE_USER'] });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getUsers();
      
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        console.error("API did not return an array. Check if you are receiving HTML instead.");
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users", error);
      setUsers([]); 
    } finally {
      setLoading(false);
    }
};

  const confirmDelete = async () => {
    try {
      await userService.deleteUser(deleteConfirm.userId);
      setUsers(users.filter(u => u.id !== deleteConfirm.userId));
      setDeleteConfirm({ open: false, userId: null, username: '' });
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await userService.createUser(formData);
      setIsAddModalOpen(false);
      setFormData({ username: '', email: '', password: '', roles: ['ROLE_USER'] });
      fetchUsers();
    } catch (error) {
      console.error("Creation failed", error);
    }
  };

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-slate-400 text-sm">Review and manage system access credentials</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-lg shadow-blue-900/20"
        >
          <UserPlus size={18} />
          <span>Add New User</span>
        </button>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-700">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text"
              placeholder="Search by username or email..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900/50 text-slate-400 text-[10px] uppercase tracking-[0.15em] font-bold">
              <tr>
                <th className="px-6 py-4">Identity</th>
                <th className="px-6 py-4">Assigned Roles</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <Loader2 className="animate-spin mx-auto text-blue-500" size={32} />
                  </td>
                </tr>
              ) : filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-700/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-200">{user.username}</div>
                    <div className="text-slate-500 text-xs">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1.5">
                      {user.roles?.map(role => (
                        <span key={role} className="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded text-[9px] font-bold uppercase tracking-wider">
                          {role.replace('ROLE_', '')}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase">
                      <span className="w-1 h-1 rounded-full bg-emerald-400"></span> Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-all">
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => setDeleteConfirm({ open: true, userId: user.id, username: user.username })}
                        className="p-2 hover:bg-red-500/10 rounded-lg text-slate-500 hover:text-red-400 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE USER MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
              <h2 className="text-xl font-bold text-white">Add New Account</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreate} className="p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Username</label>
                <input type="text" required className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                <input type="email" required className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Password</label>
                <input type="password" required className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
              </div>
              
              <div className="flex gap-3 mt-8">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 px-4 py-2.5 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700 font-semibold transition-all">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 font-bold shadow-lg shadow-blue-900/20 transition-all">Create User</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRETTY DELETE CONFIRMATION MODAL */}
      {deleteConfirm.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-6 ring-8 ring-red-500/5">
                <AlertTriangle size={32} />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Confirm Deletion</h2>
              <p className="text-slate-400 text-sm">
                Are you sure you want to delete <span className="text-white font-semibold">@{deleteConfirm.username}</span>? This action cannot be undone.
              </p>
            </div>
            
            <div className="p-4 bg-slate-900/50 border-t border-slate-700 flex gap-3">
              <button 
                onClick={() => setDeleteConfirm({ open: false, userId: null, username: '' })}
                className="flex-1 px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700 font-semibold transition-all"
              >
                No, Keep it
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition-all shadow-lg shadow-red-900/20"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;