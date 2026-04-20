import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconSearch } from './Icons';

export default function Header({ searchPlaceholder = "Search..." }) {
  const navigate = useNavigate();
  const [connections, setConnections] = useState({ jira: false, ai: false });

  useEffect(() => {
    const jiraOk = !!(localStorage.getItem('jira_url') && localStorage.getItem('jira_token'));
    const aiOk = !!(localStorage.getItem('llm_provider'));
    setConnections({ jira: jiraOk, ai: aiOk });
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate('/login');
  };

  const pulse = { width:'8px', height:'8px', borderRadius:'50%', animation:'pulse 2s infinite' };

  return (
    <header style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: '1rem 2rem', 
      background: 'rgba(8,12,20,0.7)', 
      backdropFilter: 'blur(20px)', 
      borderBottom: '1px solid rgba(255,255,255,0.05)', 
      position: 'sticky', 
      top: 0, 
      zIndex: 50 
    }}>
      <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', width: '320px' }}>
        <IconSearch />
        <input type="text" placeholder={searchPlaceholder} style={{ background: 'transparent', border: 'none', color: 'white', marginLeft: '0.75rem', outline: 'none', width: '100%', fontSize: '0.9rem' }} />
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
        {/* Telemetry */}
        <div style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'0.75rem', fontWeight:600, color:connections.jira ? '#10b981' : '#64748b' }}>
          <div style={{ ...pulse, background: connections.jira ? '#10b981' : '#64748b' }}/> Jira: {connections.jira ? 'Connected' : 'Offline'}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'0.75rem', fontWeight:600, color:connections.ai ? '#a78bfa' : '#64748b' }}>
          <div style={{ ...pulse, background: connections.ai ? '#a78bfa' : '#64748b' }}/> AI Engine: {connections.ai ? 'Active' : 'Offline'}
        </div>

        <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }} />
        
        {/* Nav Links */}
        <span onClick={() => navigate('/dashboard')} style={{ color: '#3b82f6', cursor: 'pointer' }}>Workspace</span>
        <span onClick={() => navigate('/settings')} style={{ color: '#94a3b8', cursor: 'pointer', transition:'color 0.2s' }} onMouseEnter={e=>e.target.style.color='white'} onMouseLeave={e=>e.target.style.color='#94a3b8'}>Project Settings</span>
        
        <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }} />
        
        {/* User Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={handleLogout} title="Click to Logout">
          <img src="https://i.pravatar.cc/150?u=current_user" alt="User" style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)' }} />
          <div style={{ fontSize:'0.8rem', color:'#ef4444', fontWeight:600 }}>Logout</div>
        </div>
      </div>
      <style>{`@keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } 100% { opacity: 1; transform: scale(1); } }`}</style>
    </header>
  );
}
