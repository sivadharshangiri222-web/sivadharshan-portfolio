import { API_BASE_URL } from '../config';
import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMail, FiCpu, FiCode, FiUser, FiLogOut, FiTrash2, 
  FiPlus, FiEdit2, FiX, FiCheck, FiAlertCircle, FiSettings
} from 'react-icons/fi';

interface AdminDashboardProps {
  token: string;
  onLogout: () => void;
  onBackToPortfolio: () => void;
}

type Tab = 'contacts' | 'projects' | 'skills' | 'profile';

export default function AdminDashboard({ token, onLogout, onBackToPortfolio }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('contacts');
  
  // Data States
  const [contacts, setContacts] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills]     = useState<any[]>([]);
  const [profile, setProfile]   = useState<any>({
    name: '', designation: '', cgpa: '', bio: '', email: '', github: '', linkedin: '', profile_photo: ''
  });

  // Modal / Form States
  const [projectModal, setProjectModal] = useState<{ open: boolean; editId?: number }>({ open: false });
  const [projectForm, setProjectForm]   = useState({
    title: '', description: '', technologies: '', github_link: '', live_link: '', image_url: ''
  });

  const [skillModal, setSkillModal] = useState<{ open: boolean; editId?: number }>({ open: false });
  const [skillForm, setSkillForm]   = useState({
    name: '', level: 90, icon: 'FiCode'
  });

  // Notification States
  const [notif, setNotif] = useState<{ text: string; type: 'success' | 'error' | '' }>({ text: '', type: '' });

  const showNotif = (text: string, type: 'success' | 'error') => {
    setNotif({ text, type });
    setTimeout(() => setNotif({ text: '', type: '' }), 4000);
  };

  // API headers
  const authHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  // Fetch functions
  const fetchContacts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, { headers: authHeaders });
      if (res.ok) setContacts(await res.json());
    } catch (err) { console.error(err); }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects`);
      if (res.ok) setProjects(await res.json());
    } catch (err) { console.error(err); }
  };

  const fetchSkills = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/skills`);
      if (res.ok) setSkills(await res.json());
    } catch (err) { console.error(err); }
  };

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/profile`);
      if (res.ok) setProfile(await res.json());
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    fetchContacts();
    fetchProjects();
    fetchSkills();
    fetchProfile();
  }, [token]);

  // Contact handlers
  const handleDeleteContact = async (id: number) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact/${id}`, {
        method: 'DELETE',
        headers: authHeaders
      });
      if (res.ok) {
        showNotif('Message deleted', 'success');
        fetchContacts();
      } else {
        showNotif('Failed to delete message', 'error');
      }
    } catch (err: any) {
      showNotif(err.message, 'error');
    }
  };

  // Project handlers
  const handleOpenProjectModal = (proj?: any) => {
    if (proj) {
      setProjectModal({ open: true, editId: proj.id });
      setProjectForm({
        title: proj.title,
        description: proj.description,
        technologies: proj.technologies,
        github_link: proj.github_link || '',
        live_link: proj.live_link || '',
        image_url: proj.image_url || ''
      });
    } else {
      setProjectModal({ open: true });
      setProjectForm({ title: '', description: '', technologies: '', github_link: '', live_link: '', image_url: '' });
    }
  };

  const handleSaveProject = async (e: FormEvent) => {
    e.preventDefault();
    const isEdit = !!projectModal.editId;
    const url = isEdit 
      ? `${API_BASE_URL}/api/projects/${projectModal.editId}` 
      : `${API_BASE_URL}/api/projects`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: authHeaders,
        body: JSON.stringify(projectForm)
      });
      if (res.ok) {
        showNotif(isEdit ? 'Project updated' : 'Project added', 'success');
        setProjectModal({ open: false });
        fetchProjects();
      } else {
        const d = await res.json();
        showNotif(d.message || 'Operation failed', 'error');
      }
    } catch (err: any) {
      showNotif(err.message, 'error');
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        method: 'DELETE',
        headers: authHeaders
      });
      if (res.ok) {
        showNotif('Project deleted', 'success');
        fetchProjects();
      } else {
        showNotif('Failed to delete', 'error');
      }
    } catch (err: any) {
      showNotif(err.message, 'error');
    }
  };

  // Skill handlers
  const handleOpenSkillModal = (sk?: any) => {
    if (sk) {
      setSkillModal({ open: true, editId: sk.id });
      setSkillForm({
        name: sk.name,
        level: sk.level,
        icon: sk.icon
      });
    } else {
      setSkillModal({ open: true });
      setSkillForm({ name: '', level: 90, icon: 'FiCode' });
    }
  };

  const handleSaveSkill = async (e: FormEvent) => {
    e.preventDefault();
    const isEdit = !!skillModal.editId;
    const url = isEdit 
      ? `${API_BASE_URL}/api/skills/${skillModal.editId}` 
      : `${API_BASE_URL}/api/skills`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: authHeaders,
        body: JSON.stringify(skillForm)
      });
      if (res.ok) {
        showNotif(isEdit ? 'Skill updated' : 'Skill added', 'success');
        setSkillModal({ open: false });
        fetchSkills();
      } else {
        const d = await res.json();
        showNotif(d.message || 'Operation failed', 'error');
      }
    } catch (err: any) {
      showNotif(err.message, 'error');
    }
  };

  const handleDeleteSkill = async (id: number) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/skills/${id}`, {
        method: 'DELETE',
        headers: authHeaders
      });
      if (res.ok) {
        showNotif('Skill deleted', 'success');
        fetchSkills();
      } else {
        showNotif('Failed to delete', 'error');
      }
    } catch (err: any) {
      showNotif(err.message, 'error');
    }
  };

  // Profile handlers
  const handleSaveProfile = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/profile`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify(profile)
      });
      if (res.ok) {
        showNotif('Profile updated successfully', 'success');
        fetchProfile();
      } else {
        showNotif('Failed to update profile', 'error');
      }
    } catch (err: any) {
      showNotif(err.message, 'error');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-poppins relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {notif.text && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className={`fixed bottom-6 left-1/2 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl border backdrop-blur-md shadow-2xl ${
              notif.type === 'success' 
                ? 'bg-emerald-900/40 border-emerald-500/50 text-emerald-300' 
                : 'bg-red-900/40 border-red-500/50 text-red-300'
            }`}
          >
            {notif.type === 'success' ? <FiCheck size={18} /> : <FiAlertCircle size={18} />}
            <span className="text-sm font-semibold">{notif.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header bar */}
      <header className="border-b border-dark-border bg-dark-card/30 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
              <FiSettings size={16} />
            </div>
            <span className="font-playfair font-bold text-xl tracking-wide text-white">Dashboard</span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={onBackToPortfolio}
              className="px-4 py-2 rounded-xl border border-dark-border text-xs text-gray-400 hover:text-white hover:border-white/20 transition-all"
            >
              View Portfolio
            </button>
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold/10 border border-gold/30 text-xs text-gold hover:bg-gold hover:text-black transition-all"
            >
              <FiLogOut size={13} /> Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-10 w-full flex-grow grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-1 flex flex-col gap-2">
          {[
            { id: 'contacts', label: 'Contacts Inquiries', icon: FiMail, count: contacts.length },
            { id: 'projects', label: 'Manage Projects', icon: FiCode, count: projects.length },
            { id: 'skills', label: 'Manage Skills', icon: FiCpu, count: skills.length },
            { id: 'profile', label: 'Profile Settings', icon: FiUser },
          ].map(item => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border text-sm font-medium transition-all ${
                  active 
                    ? 'bg-gold/10 border-gold/40 text-gold shadow-md' 
                    : 'bg-dark-card/30 border-dark-border/80 text-gray-400 hover:text-white hover:border-dark-border'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${active ? 'bg-gold text-black' : 'bg-dark-border text-gray-400'}`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Workspace Area */}
        <main className="lg:col-span-3">
          
          {/* TAB 1: CONTACTS LIST */}
          {activeTab === 'contacts' && (
            <div className="bg-dark-card border border-dark-border rounded-3xl p-6 shadow-xl">
              <h2 className="font-playfair font-bold text-2xl mb-6">Contact Inquiries</h2>
              {contacts.length === 0 ? (
                <p className="text-gray-500 text-sm">No messages received yet.</p>
              ) : (
                <div className="space-y-4">
                  {contacts.map(msg => (
                    <div key={msg.id} className="p-5 rounded-2xl bg-black border border-dark-border hover:border-gold/30 transition-all flex flex-col md:flex-row justify-between gap-4">
                      <div className="space-y-2 max-w-2xl">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="font-semibold text-white text-base">{msg.name}</span>
                          <span className="text-gray-500 text-xs font-mono">{msg.email}</span>
                          <span className="text-gray-600 text-xs">{new Date(msg.created_at).toLocaleString()}</span>
                        </div>
                        <p className="text-gold text-xs font-semibold uppercase tracking-wider">Subject: {msg.subject}</p>
                        <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                      </div>
                      <div className="flex items-start">
                        <button 
                          onClick={() => handleDeleteContact(msg.id)}
                          className="p-2.5 rounded-xl border border-red-500/20 hover:border-red-500 hover:bg-red-500/10 text-red-400 transition-all"
                          title="Delete message"
                        >
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PROJECTS MANAGEMENT */}
          {activeTab === 'projects' && (
            <div className="bg-dark-card border border-dark-border rounded-3xl p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-playfair font-bold text-2xl">Manage Projects</h2>
                <button 
                  onClick={() => handleOpenProjectModal()}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-gold hover:text-white transition-all"
                >
                  <FiPlus size={14} /> Add Project
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map(proj => (
                  <div key={proj.id} className="p-5 rounded-2xl bg-black border border-dark-border hover:border-gold/20 transition-all flex flex-col justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-lg text-white mb-1">{proj.title}</h3>
                      <p className="text-xs text-gray-500 mb-3 font-mono">{proj.technologies}</p>
                      <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">{proj.description}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-dark-border pt-3 mt-2">
                      <div className="flex items-center gap-1.5">
                        {proj.github_link && <span className="text-[10px] px-2 py-0.5 rounded bg-dark-border text-gray-400">GitHub</span>}
                        {proj.live_link && <span className="text-[10px] px-2 py-0.5 rounded bg-dark-border text-gray-400">Live</span>}
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleOpenProjectModal(proj)}
                          className="p-2 rounded-lg border border-dark-border hover:border-gold text-gray-400 hover:text-gold transition-all"
                        >
                          <FiEdit2 size={13} />
                        </button>
                        <button 
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-2 rounded-lg border border-dark-border hover:border-red-500 text-gray-400 hover:text-red-400 transition-all"
                        >
                          <FiTrash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SKILLS MANAGEMENT */}
          {activeTab === 'skills' && (
            <div className="bg-dark-card border border-dark-border rounded-3xl p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-playfair font-bold text-2xl">Manage Skills</h2>
                <button 
                  onClick={() => handleOpenSkillModal()}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-gold hover:text-white transition-all"
                >
                  <FiPlus size={14} /> Add Skill
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {skills.map(sk => (
                  <div key={sk.id} className="p-4 rounded-2xl bg-black border border-dark-border hover:border-gold/20 transition-all flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <h4 className="font-semibold text-white truncate text-base">{sk.name}</h4>
                      <p className="text-xs text-gold mt-0.5">Level: {sk.level}%</p>
                      <p className="text-[10px] text-gray-500 font-mono mt-0.5">Icon: {sk.icon}</p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button 
                        onClick={() => handleOpenSkillModal(sk)}
                        className="p-2 rounded-lg border border-dark-border hover:border-gold text-gray-400 hover:text-gold transition-all"
                      >
                        <FiEdit2 size={12} />
                      </button>
                      <button 
                        onClick={() => handleDeleteSkill(sk.id)}
                        className="p-2 rounded-lg border border-dark-border hover:border-red-500 text-gray-400 hover:text-red-400 transition-all"
                      >
                        <FiTrash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PROFILE SETTINGS */}
          {activeTab === 'profile' && (
            <div className="bg-dark-card border border-dark-border rounded-3xl p-6 shadow-xl">
              <h2 className="font-playfair font-bold text-2xl mb-6">Profile Settings</h2>
              <form onSubmit={handleSaveProfile} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Full Name</label>
                    <input 
                      type="text" 
                      value={profile.name || ''} 
                      onChange={e => setProfile({...profile, name: e.target.value})}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-black border border-dark-border text-sm text-white focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Designation</label>
                    <input 
                      type="text" 
                      value={profile.designation || ''} 
                      onChange={e => setProfile({...profile, designation: e.target.value})}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-black border border-dark-border text-sm text-white focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">CGPA</label>
                    <input 
                      type="text" 
                      value={profile.cgpa || ''} 
                      onChange={e => setProfile({...profile, cgpa: e.target.value})}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-black border border-dark-border text-sm text-white focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Email</label>
                    <input 
                      type="email" 
                      value={profile.email || ''} 
                      onChange={e => setProfile({...profile, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-black border border-dark-border text-sm text-white focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">GitHub URL</label>
                    <input 
                      type="url" 
                      value={profile.github || ''} 
                      onChange={e => setProfile({...profile, github: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-black border border-dark-border text-sm text-white focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">LinkedIn URL</label>
                    <input 
                      type="url" 
                      value={profile.linkedin || ''} 
                      onChange={e => setProfile({...profile, linkedin: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-black border border-dark-border text-sm text-white focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Profile Photo Path/URL</label>
                  <input 
                    type="text" 
                    value={profile.profile_photo || ''} 
                    onChange={e => setProfile({...profile, profile_photo: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-black border border-dark-border text-sm text-white focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Bio / Description</label>
                  <textarea 
                    value={profile.bio || ''} 
                    onChange={e => setProfile({...profile, bio: e.target.value})}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-black border border-dark-border text-sm text-white focus:outline-none focus:border-gold resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-gold hover:text-white transition-all"
                >
                  Save Profile Settings
                </button>
              </form>
            </div>
          )}

        </main>
      </div>

      {/* PROJECT DIALOG MODAL */}
      <AnimatePresence>
        {projectModal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setProjectModal({ open: false })}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-dark-card border border-dark-border rounded-3xl p-6 relative z-10 max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setProjectModal({ open: false })}
                className="absolute right-4 top-4 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <FiX size={18} />
              </button>
              <h3 className="font-playfair font-bold text-2xl mb-6">
                {projectModal.editId ? 'Edit Project' : 'Add New Project'}
              </h3>
              <form onSubmit={handleSaveProject} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Project Title</label>
                  <input 
                    type="text" required value={projectForm.title}
                    onChange={e => setProjectForm({...projectForm, title: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-black border border-dark-border text-sm text-white focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Technologies (comma separated)</label>
                  <input 
                    type="text" required value={projectForm.technologies} placeholder="Python, MySQL, React"
                    onChange={e => setProjectForm({...projectForm, technologies: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-black border border-dark-border text-sm text-white focus:outline-none focus:border-gold"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">GitHub Link</label>
                    <input 
                      type="text" value={projectForm.github_link}
                      onChange={e => setProjectForm({...projectForm, github_link: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-black border border-dark-border text-sm text-white focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Live Link</label>
                    <input 
                      type="text" value={projectForm.live_link}
                      onChange={e => setProjectForm({...projectForm, live_link: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-black border border-dark-border text-sm text-white focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Image URL / Path</label>
                  <input 
                    type="text" value={projectForm.image_url}
                    onChange={e => setProjectForm({...projectForm, image_url: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-black border border-dark-border text-sm text-white focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Description</label>
                  <textarea 
                    required rows={4} value={projectForm.description}
                    onChange={e => setProjectForm({...projectForm, description: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-black border border-dark-border text-sm text-white focus:outline-none focus:border-gold resize-none"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-gold hover:text-white transition-all"
                >
                  Save Project
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SKILL DIALOG MODAL */}
      <AnimatePresence>
        {skillModal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSkillModal({ open: false })}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-dark-card border border-dark-border rounded-3xl p-6 relative z-10"
            >
              <button 
                onClick={() => setSkillModal({ open: false })}
                className="absolute right-4 top-4 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <FiX size={18} />
              </button>
              <h3 className="font-playfair font-bold text-2xl mb-6">
                {skillModal.editId ? 'Edit Skill' : 'Add New Skill'}
              </h3>
              <form onSubmit={handleSaveSkill} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Skill Name</label>
                  <input 
                    type="text" required value={skillForm.name}
                    onChange={e => setSkillForm({...skillForm, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-black border border-dark-border text-sm text-white focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Proficiency Level (0-100)</label>
                  <input 
                    type="number" min={0} max={100} required value={skillForm.level}
                    onChange={e => setSkillForm({...skillForm, level: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 rounded-xl bg-black border border-dark-border text-sm text-white focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Icon Library Key</label>
                  <select 
                    value={skillForm.icon}
                    onChange={e => setSkillForm({...skillForm, icon: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-black border border-dark-border text-sm text-white focus:outline-none focus:border-gold"
                  >
                    <option value="FiCpu">FiCpu (Logical Thinking)</option>
                    <option value="FiTerminal">FiTerminal (Debugging)</option>
                    <option value="FiCode">FiCode (Programming)</option>
                    <option value="FiCheckCircle">FiCheckCircle (Problem Solving)</option>
                    <option value="SiPython">SiPython (Python)</option>
                    <option value="MdDesignServices">MdDesignServices (UI/UX)</option>
                  </select>
                </div>
                <button 
                  type="submit"
                  className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-gold hover:text-white transition-all"
                >
                  Save Skill
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
