import { useState, useEffect } from 'react';
import './index.css';
import './App.css';

// --- SVGs ---
const IconDashboard = () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const IconPlan = () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const IconLightning = () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const IconDatabase = () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>;
const IconSparkles = () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
const IconSearch = () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const IconSettings = () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const IconLink = () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;
const IconScenario = () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
const IconCloud = () => <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 12v-6m0 0L9 9m3-3l3 3" /></svg>;
const IconDocument = () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const IconStories = () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const IconTrash = () => <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const IconRefresh = () => <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>;
const IconSave = () => <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>;
const IconBook = () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const IconChip = () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>;
const IconWifi = () => <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>;
const IconJira = () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
const IconHistory = () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconEye = () => <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;

function AuthScreen({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [registeredUsers, setRegisteredUsers] = useState([
    { name: 'Admin User', email: 'admin@agentica.com', password: 'password123' } // Default mock POC
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    if (isLogin) {
      const user = registeredUsers.find(u => u.email === email && u.password === password);
      if (user) {
        onLogin(user);
      } else {
        setError('Invalid credentials. Try admin@agentica.com / password123 or sign up.');
      }
    } else {
      if (!name) { setError('Name is required for sign up.'); return; }
      if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
      
      const existing = registeredUsers.find(u => u.email === email);
      if (existing) { setError('User already exists. Please login.'); return; }
      
      const newUser = { name, email, password };
      setRegisteredUsers([...registeredUsers, newUser]);
      onLogin(newUser);
    }
  };

  return (
    <div className="auth-split-layout fade-in">
       {/* Premium Image Side */}
       <div className="auth-image-side">
          <div className="auth-image-overlay"></div>
          <div className="auth-image-content">
             <h1><IconSparkles/> IntelliPlan AI</h1>
             <p>Intelligent test planning powered by sophisticated LLM analysis of your Jira tickets.</p>
          </div>
       </div>

       {/* Form Side */}
       <div className="auth-form-side">
         <div className="auth-card">
            <h2>{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
            {error && <div className="alert-error" style={{marginBottom: '1rem', padding: '12px'}}>🚨 {error}</div>}
            
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" className={`form-control ${!isLogin && !name && error ? 'error' : ''}`} value={name} onChange={e => setName(e.target.value)} />
                </div>
              )}
              <div className="form-group">
                <label>Email ID</label>
                <input type="email" className={`form-control ${!email && error ? 'error' : ''}`} value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className={`form-control ${!password && error ? 'error' : ''}`} value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <button className="btn btn-primary-solid" style={{width: '100%', marginBottom: '1rem', padding: '14px'}}>
                {isLogin ? 'Login to Dashboard' : 'Sign Up'}
              </button>
            </form>
            
            <div style={{textAlign: 'center', marginTop: '16px'}}>
               <button className="btn-secondary" style={{border: 'none', background: 'transparent'}} onClick={() => { setIsLogin(!isLogin); setError(''); }}>
                 {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
               </button>
            </div>
         </div>
       </div>
    </div>
  )
}

function Sidebar({ currentView, setCurrentView, user }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo-icon"><IconSparkles /></div>
        <div className="logo-text">
          <span className="logo-title">IntelliPlan AI</span>
          <span className="logo-subtitle">Test Planner 2.0</span>
        </div>
      </div>
      <div className="nav-links">
        <div className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`} onClick={() => setCurrentView('dashboard')}>
          <IconDashboard /> Dashboard
        </div>
        <div className={`nav-item ${currentView === 'requirements' ? 'active' : ''}`} onClick={() => setCurrentView('requirements')}>
          <IconDocument /> Requirement Spec
        </div>
        <div className={`nav-item ${currentView === 'generate' ? 'active' : ''}`} onClick={() => setCurrentView('generate')}>
          <IconPlan /> Generate Plan
        </div>
        <div className={`nav-item ${currentView === 'user-stories' ? 'active' : ''}`} onClick={() => setCurrentView('user-stories')}>
          <IconStories /> User Stories
        </div>
        <div className={`nav-item ${currentView === 'scenarios' ? 'active' : ''}`} onClick={() => setCurrentView('scenarios')}>
          <IconScenario /> Test Scenarios
        </div>
      </div>
      <div className="sidebar-footer">
        <div className="sidebar-settings" onClick={() => setCurrentView('settings')} style={{marginBottom: '12px', background: currentView === 'settings' ? 'rgba(255,255,255,0.05)' : 'transparent', padding: '10px 12px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.2s'}}>
           <IconSettings /> <span style={{marginLeft: '8px', fontWeight: 500, fontSize: '0.9rem', color: currentView === 'settings' ? 'white' : '#94a3b8'}}>Settings</span>
        </div>

        <div className="user-profile-tag" style={{display: 'flex'}}>
          <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
          <div className="user-info-text">
            <span className="user-email">{user.email}</span>
            <span className="user-project">IntelliPlan User</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DocumentSection({ title, children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="document-section">
      <div className="document-section-title" onClick={() => setIsOpen(!isOpen)}>
        <span className={`collapse-icon ${isOpen ? 'open' : ''}`}>▶</span> {title}
      </div>
      {isOpen && <div className="document-section-content fade-in">{children}</div>}
    </div>
  );
}

function PlanPreviewViewer({ generatedPlan }) {
  const [activeTab, setActiveTab] = useState('document'); // Default to document view

  return (
    <div className="plan-preview-container">
      <div className="plan-preview-tabs">
        <button className={`preview-tab ${activeTab === 'document' ? 'active' : ''}`} onClick={() => setActiveTab('document')}>📄 Full Document Preview</button>
        <button className={`preview-tab ${activeTab === 'summary' ? 'active' : ''}`} onClick={() => setActiveTab('summary')}>📊 Quick Summary</button>
      </div>
      
      {activeTab === 'summary' && (
        <div className="plan-output-grid fade-in">
          <div className="plan-output-card">
            <div className="plan-output-label">📋 Scope</div>
            <div className="plan-output-value">{generatedPlan.test_plan.scope || 'Not specified'}</div>
          </div>
          <div className="plan-output-card">
            <div className="plan-output-label">🎯 Objectives</div>
            <ul className="plan-output-list">{(generatedPlan.test_plan.objectives || []).map((o,i) => <li key={i}>{o}</li>)}</ul>
          </div>
          <div className="plan-output-card">
            <div className="plan-output-label">🧪 Test Types</div>
            <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>{(generatedPlan.test_plan.test_types || []).map((t,i) => <span key={i} className="tag-pill" style={{background:'#7c3aed'}}>{t}</span>)}</div>
          </div>
          <div className="plan-output-card">
            <div className="plan-output-label">⚠️ Risks</div>
            <ul className="plan-output-list">{(generatedPlan.test_plan.risks || []).map((r,i) => <li key={i}>{r}</li>)}</ul>
          </div>
          {generatedPlan.user_stories && generatedPlan.user_stories.length > 0 && (
            <div className="plan-output-card" style={{gridColumn:'1/-1'}}>
              <div className="plan-output-label">📖 Derived User Stories ({generatedPlan.user_stories.length})</div>
              <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginTop:'8px'}}>
                {generatedPlan.user_stories.map((us,i) => (
                  <span key={i} className="tag-pill" style={{background:'#0ea5e9',fontSize:'0.8rem',padding:'5px 10px'}}>{us.id}: {us.title}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'document' && (
        <div className="document-preview-pane fade-in">
           <div className="document-preview-header">
             <h2>Test Plan Document</h2>
             <p className="document-meta">Auto-generated by IntelliPlan AI | Format: ISTQB Standard</p>
           </div>
           
           <DocumentSection title="1. Project Scope">
              <p>{generatedPlan.test_plan.scope || 'No scope defined.'}</p>
           </DocumentSection>
           
           <DocumentSection title="2. Objectives">
             <ul className="doc-list">
               {(generatedPlan.test_plan.objectives?.length > 0) 
                 ? generatedPlan.test_plan.objectives.map((o,i)=><li key={i}>{o}</li>) 
                 : <li>No objectives defined.</li>}
             </ul>
           </DocumentSection>

           <DocumentSection title="3. Test Items & Types">
             <div style={{display:'flex', gap: '20px', flexWrap: 'wrap'}}>
               <div style={{flex: 1, minWidth: '200px'}}>
                 <h4>Test Items</h4>
                 <ul className="doc-list">
                   {(generatedPlan.test_plan.test_items?.length > 0) 
                     ? generatedPlan.test_plan.test_items.map((t,i)=><li key={i}>{t}</li>)
                     : <li>No items defined.</li>}
                 </ul>
               </div>
               <div style={{flex: 1, minWidth: '200px'}}>
                 <h4>Test Types</h4>
                 <div style={{display:'flex',gap:'6px',flexWrap:'wrap', marginTop:'8px'}}>
                   {(generatedPlan.test_plan.test_types?.length > 0)
                     ? generatedPlan.test_plan.test_types.map((t,i)=><span key={i} className="tag-pill" style={{background:'#7c3aed'}}>{t}</span>)
                     : <span>None</span>}
                 </div>
               </div>
             </div>
           </DocumentSection>

           <DocumentSection title="4. Test Strategy">
              <p>{generatedPlan.test_plan.test_strategy || 'No test strategy defined.'}</p>
              
              <div style={{marginTop: '16px'}}>
                <h4>Environment Setup</h4>
                <p>{generatedPlan.test_plan.environment || 'No environment specified.'}</p>
              </div>
           </DocumentSection>

           <DocumentSection title="5. Entry & Exit Criteria">
              <div style={{display:'flex', gap: '20px', flexWrap: 'wrap'}}>
                <div style={{flex: 1, minWidth: '200px'}}>
                  <h4 style={{color: '#10b981'}}>Entry Criteria</h4>
                  <ul className="doc-list">
                    {(generatedPlan.test_plan.entry_criteria?.length > 0)
                      ? generatedPlan.test_plan.entry_criteria.map((c,i)=><li key={i}>{c}</li>)
                      : <li>No criteria defined.</li>}
                  </ul>
                </div>
                <div style={{flex: 1, minWidth: '200px'}}>
                  <h4 style={{color: '#ef4444'}}>Exit Criteria</h4>
                  <ul className="doc-list">
                    {(generatedPlan.test_plan.exit_criteria?.length > 0)
                      ? generatedPlan.test_plan.exit_criteria.map((c,i)=><li key={i}>{c}</li>)
                      : <li>No criteria defined.</li>}
                  </ul>
                </div>
              </div>
           </DocumentSection>

           <DocumentSection title="6. Risks & Mitigation">
              <table className="preview-table">
                <thead><tr><th>Identified Risk</th><th>Mitigation Plan</th></tr></thead>
                <tbody>
                  {(Math.max(generatedPlan.test_plan.risks?.length || 0, generatedPlan.test_plan.mitigation?.length || 0)) > 0 ? (
                    Array.from({length: Math.max(generatedPlan.test_plan.risks?.length || 0, generatedPlan.test_plan.mitigation?.length || 0)}).map((_, i) => (
                      <tr key={i}>
                        <td>{generatedPlan.test_plan.risks?.[i] || '—'}</td>
                        <td>{generatedPlan.test_plan.mitigation?.[i] || '—'}</td>
                      </tr>
                    ))
                  ) : (<tr><td colSpan="2" style={{textAlign:'center', color:'var(--text-muted)'}}>No risks specified</td></tr>)}
                </tbody>
              </table>
           </DocumentSection>

           {generatedPlan.user_stories && generatedPlan.user_stories.length > 0 && (
             <DocumentSection title={`7. Derived User Stories (${generatedPlan.user_stories.length})`}>
                <div className="doc-stories">
                  {generatedPlan.user_stories.map(us => (
                     <div key={us.id} className="doc-story-card">
                        <div className="doc-story-header">
                          <span className="doc-story-id">{us.id}</span>
                          <span className="doc-story-title">{us.title}</span>
                          {us.actor && <span className="doc-story-actor">User: {us.actor}</span>}
                        </div>
                        <p className="doc-story-desc">{us.description}</p>
                        
                        <div className="doc-story-ac">
                          <strong>Acceptance Criteria:</strong>
                          <ul className="doc-list">
                            {(us.acceptance_criteria?.length > 0) 
                              ? us.acceptance_criteria.map((ac, i) => <li key={i}>{ac}</li>)
                              : <li>No criteria defined.</li>}
                          </ul>
                        </div>
                     </div>
                  ))}
                </div>
             </DocumentSection>
           )}
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────
// REQUIREMENT SPECIFICATION
// ─────────────────────────────────────────────
function RequirementSpecification({ setSharedReqContext, setCurrentView }) {
  const [reqText, setReqText] = useState('');
  const [fileError, setFileError] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.name.endsWith('.pdf')) {
      setFileError('PDF parsing is being optimized. Use txt/md for real-time extraction.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setReqText(prev => prev + (prev ? '\n\n' : '') + ev.target.result);
      setFileError('');
    };
    reader.readAsText(file);
  };

  const handleAction = (view) => {
    if (!reqText.trim()) { setFileError('Requirements input cannot be empty.'); return; }
    setSharedReqContext(reqText);
    setCurrentView(view);
  };

  return (
    <div className="fade-in">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'40px', paddingBottom:'24px', borderBottom:'2px solid rgba(124, 58, 237, 0.1)'}}>
        <div>
          <h2 style={{fontSize:'2.2rem', fontWeight:800, background:'linear-gradient(135deg, white, var(--primary))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', margin:0}}>Requirement Specification</h2>
          <p style={{marginTop:'8px', color:'#94a3b8', fontSize:'1.1rem'}}>Deconstruct feature context into actionable QA artifacts.</p>
        </div>
      </div>
      
      <div className="settings-card" style={{maxWidth:'850px', margin:'0 auto 40px auto'}}>
         <label className="settings-label">1. Context Injection</label>
         
         <label className="req-upload-zone" style={{background:'rgba(15, 23, 42, 0.3)', border:'2px dashed rgba(255,255,255,0.08)'}}>
           <input type="file" style={{display:'none'}} accept=".txt,.md,.json,.csv" onChange={handleFileUpload} />
           <div className="req-upload-icon" style={{fontSize:'2rem', color:'var(--primary)', marginBottom:'12px'}}><IconCloud /></div>
           <div style={{fontWeight:700, fontSize:'1.1rem', color:'white', marginBottom:'6px'}}>Upload PRD / Requirement Document</div>
           <div style={{color:'#64748b', fontSize:'0.9rem'}}>Supports .txt .md .json (Standardized Formats)</div>
         </label>
         
         {fileError && <div className="alert-error" style={{marginTop:'12px', borderRadius:'12px'}}>🚨 {fileError}</div>}

         <div className="req-divider" style={{margin:'40px 0'}}><span>OR PASTE CONTENT DIRECTLY</span></div>

         <label className="settings-label">2. Semantic Content</label>
         <textarea 
           className="req-textarea" 
           style={{background:'rgba(15, 23, 42, 0.5)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'16px', minHeight:'250px', fontSize:'1rem', padding:'20px'}}
           placeholder="Paste Feature Objective, Acceptance Criteria, or Edge Case notes here..."
           value={reqText}
           onChange={e => setReqText(e.target.value)}
         ></textarea>
         
         <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', marginTop:'40px'}}>
            <button className="settings-btn-ghost" style={{padding:'18px', justifyContent:'center'}} onClick={() => handleAction('user-stories')}>
              <IconBook /> Generate User Stories
            </button>
            <button className="settings-btn-main" style={{padding:'18px', justifyContent:'center', background:'var(--primary)'}} onClick={() => handleAction('generate')}>
              <IconSparkles /> Generate Premium Test Plan
            </button>
         </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// USER STORIES PREVIEW
// ─────────────────────────────────────────────
function UserStoriesPreview({ sharedReqContext }) {
  const [userStories, setUserStories] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [jiraProjectKey, setJiraProjectKey] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState('');

  useEffect(() => {
    if (sharedReqContext && userStories.length === 0 && !isGenerating && !error) {
      generateStories();
    }
  }, [sharedReqContext]);

  const generateStories = async () => {
    setIsGenerating(true);
    setError('');
    
    const savedLlm = localStorage.getItem('intelliplan_llm');
    if (!savedLlm) {
      setError('LLM not configured. Please setup in Connections tab.');
      setIsGenerating(false);
      return;
    }
    const { apiKey, model } = JSON.parse(savedLlm);

    const prompt = `Extract user stories as raw JSON. Format: { "user_stories": [{ "title": "", "description": "", "acceptance_criteria": [], "story_points": "" }] } From: ${sharedReqContext}`;
    
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: model || 'llama-3.3-70b-versatile',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.2
        })
      });
      if (!res.ok) throw new Error(`Inference failed: ${res.status}`);
      const data = await res.json();
      const raw = data.choices[0].message.content;
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : raw);
      setUserStories(parsed.user_stories || []);
    } catch (err) {
      setError(err.message);
    }
    setIsGenerating(false);
  };

  const uploadToJira = async () => {
    if (!jiraProjectKey) {
      setError('Please provide a Jira Project Key (e.g. PROJ).');
      return;
    }
    const savedJira = localStorage.getItem('intelliplan_jira');
    if (!savedJira) {
      setError('Jira Connection is not configured.');
      return;
    }
    setIsUploading(true);
    setError('');
    const { email, token } = JSON.parse(savedJira);
    const b64 = btoa(`${email}:${token}`);

    try {
      let uploadedCount = 0;
      for (const us of userStories) {
         const adfDescription = {
           type: "doc",
           version: 1,
           content: [
             { type: "paragraph", content: [{ type: "text", text: us.description }] },
             { type: "paragraph", content: [{ type: "text", text: "\nAcceptance Criteria:", marks: [{type: "strong"}] }] },
             { type: "bulletList", content: us.acceptance_criteria.map(ac => ({
                type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: ac }] }]
             }))}
           ]
         };

         const payload = {
           fields: {
             project: { key: jiraProjectKey },
             summary: us.title.substring(0, 254),
             description: adfDescription,
             issuetype: { name: "Story" }
           }
         };

         const response = await fetch(`/api/jira/rest/api/3/issue`, {
           method: 'POST',
           headers: {
             'Authorization': `Basic ${b64}`,
             'Content-Type': 'application/json',
             'Accept': 'application/json'
           },
           body: JSON.stringify(payload)
         });
         
         if (!response.ok) {
           throw new Error(`Failed to create issue. Status: ${response.status}`);
         }
         uploadedCount++;
      }
      setUploadSuccess(`Successfully created ${uploadedCount} User Stories in Jira Project ${jiraProjectKey}!`);
    } catch (err) {
      setError(`Upload failed: ${err.message}`);
    }
    setIsUploading(false);
  };

  return (
    <div className="fade-in">
      <div className="wizard-title" style={{marginBottom: '24px'}}>
        <h2>User Stories Preview</h2>
        <p>Review the AI-generated user stories extracted from your Requirements Spec, and push to Jira.</p>
      </div>

      {error && <div className="alert-error">🚨 {error}</div>}
      {uploadSuccess && <div className="alert-success">✓ {uploadSuccess}</div>}

      {isGenerating ? (
         <div style={{textAlign: 'center', padding: '60px', color: 'var(--text-muted)'}}>
           <span className="spinner" style={{borderTopColor:'var(--primary)', width: '32px', height: '32px', borderWidth: '3px'}}></span>
           <p style={{marginTop:'16px', fontSize: '1.1rem'}}>AI is analyzing requirements and structuring User Stories...</p>
         </div>
      ) : userStories.length > 0 ? (
         <div className="fade-in">
           <div style={{background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px', marginBottom: '24px', display: 'flex', gap: '16px', alignItems: 'flex-end'}}>
              <div style={{flex: 1}}>
                <label style={{display:'block', fontSize:'0.85rem', fontWeight:600, marginBottom:'8px'}}>Target Jira Project Key</label>
                <input type="text" className="form-control" value={jiraProjectKey} onChange={e=>setJiraProjectKey(e.target.value.toUpperCase())} placeholder="e.g. CORE" />
              </div>
              <button className="btn btn-primary-solid" style={{background: 'linear-gradient(135deg, #10b981, #059669)', padding: '12px 24px'}} onClick={uploadToJira} disabled={isUploading}>
                {isUploading ? <><span className="spinner"></span> Syncing...</> : '📤 Create Jira Stories'}
              </button>
           </div>

           <div className="doc-stories">
             {userStories.map((us, i) => (
                <div key={i} className="doc-story-card">
                  <div className="doc-story-header">
                    <span className="doc-story-id" style={{background:'#10b981'}}>US-{i+1}</span>
                    <span className="doc-story-title">{us.title}</span>
                    {us.story_points && <span className="doc-story-actor">Points: {us.story_points}</span>}
                  </div>
                  <p className="doc-story-desc">{us.description}</p>
                  <div className="doc-story-ac">
                    <strong>Acceptance Criteria:</strong>
                    <ul className="doc-list">
                      {us.acceptance_criteria?.map((ac, idx) => <li key={idx}>{ac}</li>)}
                    </ul>
                  </div>
                </div>
             ))}
           </div>
         </div>
      ) : (
        <div className="alert-error">No User Stories generated or Context Missing. Return to Requirement Specifications tab.</div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// SYSTEM SETTINGS
// ─────────────────────────────────────────────
function Settings() {
  const [llmProvider, setLlmProvider] = useState('Groq');
  const [model, setModel] = useState('llama-3.3-70b-versatile');
  const [apiKey, setApiKey] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [maxTokens, setMaxTokens] = useState(2048);
  
  const [autoRetry, setAutoRetry] = useState(true);
  const [retryAttempts, setRetryAttempts] = useState(1);
  const [jobQueueing, setJobQueueing] = useState(false);

  const [jiraUrl, setJiraUrl] = useState('');
  const [jiraEmail, setJiraEmail] = useState('');
  const [jiraToken, setJiraToken] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [showLlmKey, setShowLlmKey] = useState(false);

  useEffect(() => {
    const savedLlm = localStorage.getItem('intelliplan_llm');
    if (savedLlm) {
      const parsed = JSON.parse(savedLlm);
      setApiKey(parsed.apiKey || '');
      setEndpoint(parsed.endpoint || '');
      setModel(parsed.model || 'llama-3.3-70b-versatile');
      setLlmProvider(parsed.provider || 'Groq');
    }
    
    const savedLlmExt = localStorage.getItem('intelliplan_llm_extended');
    if (savedLlmExt) {
      const parsed = JSON.parse(savedLlmExt);
      setMaxTokens(parsed.maxTokens || 2048);
      setAutoRetry(parsed.autoRetry ?? true);
      setRetryAttempts(parsed.retryAttempts || 1);
      setJobQueueing(parsed.jobQueueing ?? false);
    }
    
    const savedJira = localStorage.getItem('intelliplan_jira');
    if (savedJira) {
      const parsed = JSON.parse(savedJira);
      setJiraUrl(parsed.url || '');
      setJiraEmail(parsed.email || '');
      setJiraToken(parsed.token || '');
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('intelliplan_llm', JSON.stringify({
      provider: llmProvider,
      model: model,
      apiKey: apiKey,
      endpoint: endpoint,
      temperature: 0.2
    }));

    localStorage.setItem('intelliplan_llm_extended', JSON.stringify({
      maxTokens, autoRetry, retryAttempts, jobQueueing
    }));

    localStorage.setItem('intelliplan_jira', JSON.stringify({
      url: jiraUrl, email: jiraEmail, token: jiraToken
    }));
    
    alert('Settings saved successfully!');
  };

  const handleClearHistory = () => {
    if (confirm('Permanently delete all locally saved User Stories, Test Plans, and Test Cases? This cannot be undone.')) {
      alert('History cleared.');
    }
  };

  const testLlmConnection = async () => {
    alert(`Testing connection to ${llmProvider}...`);
  };

  return (
    <div className="fade-in settings-page">
      <div className="settings-header">
        <div>
          <h2>System Settings</h2>
          <p>AI Engine & Platform Configuration</p>
        </div>
        <div className="settings-header-actions">
          <button className="settings-btn-ghost" onClick={handleClearHistory}><IconTrash /> Clear Cache</button>
          <button className="settings-btn-main" onClick={handleSave}><IconSave /> Save All Changes</button>
        </div>
      </div>

      <div className="settings-card">
         <div className="settings-card-header">
            <h3><IconChip /> Model Engine Provider</h3>
            <span className="settings-badge">{llmProvider} Config</span>
         </div>
         <div className="settings-grid-2">
            <div>
              <label className="settings-label">Primary LLM Provider</label>
              <div className="provider-tabs">
                 <button className={`provider-tab ${llmProvider==='Ollama'?'active':''}`} onClick={()=>setLlmProvider('Ollama')}>Ollama</button>
                 <button className={`provider-tab ${llmProvider==='Groq'?'active':''}`} onClick={()=>setLlmProvider('Groq')}>Groq</button>
                 <button className={`provider-tab ${llmProvider==='Grok'?'active':''}`} onClick={()=>setLlmProvider('Grok')}>Grok</button>
              </div>
              
              <label className="settings-label" style={{marginTop:'20px'}}>Active Model</label>
              <select className="settings-input" value={model} onChange={e=>setModel(e.target.value)}>
                 <option value="llama-3.3-70b-versatile">llama-3.3-70b-versatile</option>
                 <option value="mixtral-8x7b-32768">mixtral-8x7b-32768</option>
                 <option value="gemma2-9b-it">gemma2-9b-it</option>
              </select>

              <div style={{marginTop:'20px'}}>
                <label className="settings-label">API Key / Token</label>
                <div style={{position:'relative'}}>
                  <input type={showLlmKey ? 'text' : 'password'} className="settings-input" placeholder="Enter API Key" value={apiKey} onChange={e=>setApiKey(e.target.value)} />
                  <button className="eye-btn" onClick={()=>setShowLlmKey(!showLlmKey)}><IconEye /></button>
                </div>
              </div>

              <div style={{marginTop:'20px'}}>
                <label className="settings-label">Custom Endpoint (Optional)</label>
                <input type="text" className="settings-input" placeholder="e.g. http://localhost:11434" value={endpoint} onChange={e=>setEndpoint(e.target.value)} />
              </div>

              <button className="settings-btn-ghost" style={{width:'100%', marginTop:'24px'}} onClick={testLlmConnection}>
                 <IconWifi /> Verify Model Connection
              </button>
            </div>
            
            <div style={{paddingLeft: '20px', borderLeft: '1px solid rgba(255,255,255,0.05)'}}>
                <label className="settings-label">Max Token Output</label>
                <input type="number" className="settings-input" value={maxTokens} onChange={e=>setMaxTokens(Number(e.target.value))} />
                
                <div style={{marginTop:'40px'}}>
                   <label className="settings-label">Inference Mode</label>
                   <div style={{display:'flex', gap:'8px', marginTop:'8px'}}>
                     <span className="settings-badge" style={{background:'rgba(16,185,129,0.1)', color:'#10b981'}}>Deterministic</span>
                     <span className="settings-badge" style={{background:'rgba(255,255,255,0.05)', color:'#94a3b8'}}>Standard</span>
                   </div>
                </div>

                <div className="settings-warning-box" style={{marginTop:'40px'}}>
                   <div style={{fontWeight:'bold', color:'#3b82f6', marginBottom:'8px'}}>💡 Pro Tip</div>
                   <div style={{fontSize:'0.85rem', color:'#94a3b8'}}>Use Groq for ultra-fast inference or Ollama for local, private test plan generation.</div>
                </div>
            </div>
         </div>
      </div>

      <div className="settings-card">
         <div className="settings-card-header">
            <h3><IconLightning /> Execution Pipeline</h3>
         </div>
         <div className="logic-row">
            <div>
               <div className="logic-title">Auto-Retry System</div>
               <div className="logic-desc">Automatically retry inference on network fluctuations.</div>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" checked={autoRetry} onChange={e=>setAutoRetry(e.target.checked)} />
              <span className="toggle-slider"></span>
            </label>
         </div>

         <div style={{marginTop:'16px', display:'flex', alignItems:'center', gap:'20px'}}>
           <div style={{flex:1}}>
             <label className="settings-label">Max Retries</label>
             <input type="number" className="settings-input" value={retryAttempts} onChange={e=>setRetryAttempts(Number(e.target.value))} />
           </div>
           <div style={{flex:2}}>
              <div className="logic-row" style={{marginBottom:0}}>
                <div>
                   <div className="logic-title">Sequential Job Queue</div>
                   <div className="logic-desc">Maintain order for large plan generations.</div>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" checked={jobQueueing} onChange={e=>setJobQueueing(e.target.checked)} />
                  <span className="toggle-slider"></span>
                </label>
              </div>
           </div>
         </div>
      </div>

      <div className="settings-card">
         <div className="settings-card-header">
            <h3><IconJira /> Jira Cloud Integration</h3>
            <span className="settings-badge" style={{background:'rgba(14,165,233,0.1)', color:'#0ea5e9'}}>Atlassian</span>
         </div>
         
         <div className="settings-grid-3">
            <div>
              <label className="settings-label">Jira URL</label>
              <input type="text" className="settings-input" placeholder="https://org.atlassian.net" value={jiraUrl} onChange={e=>setJiraUrl(e.target.value)} />
            </div>
            <div>
              <label className="settings-label">Dev Email</label>
              <input type="text" className="settings-input" placeholder="qa@org.com" value={jiraEmail} onChange={e=>setJiraEmail(e.target.value)} />
            </div>
            <div style={{position:'relative'}}>
              <label className="settings-label">API v3 Token</label>
              <input type={showToken ? 'text' : 'password'} className="settings-input" placeholder="••••••••••••" value={jiraToken} onChange={e=>setJiraToken(e.target.value)} />
              <button className="eye-btn" onClick={()=>setShowToken(!showToken)}><IconEye /></button>
            </div>
         </div>
         <button className="settings-btn-main" style={{marginTop:'32px', width:'100%', justifyContent:'center'}} onClick={handleSave}>
           <IconSave /> Sync & Save Integration
         </button>
      </div>

      <div className="settings-card" style={{border:'1px solid rgba(239,68,68,0.2)'}}>
         <div className="settings-card-header">
            <h3 style={{color:'#f87171'}}><IconHistory /> Secure Data Purge</h3>
         </div>
         <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div style={{maxWidth:'60%'}}>
              <div className="logic-title" style={{color:'#f87171'}}>Clear Local Artifact Persistence</div>
              <div className="logic-desc">Wipe all generated User Stories, Test Plans, and Scenario cache from this browser session.</div>
            </div>
            <button className="settings-btn-danger" onClick={handleClearHistory}><IconTrash /> Purge Everything</button>
         </div>
      </div>

    </div>
  );
}

function GeneratePlan({ onPlanReady, setCurrentView, sharedReqContext }) {
  const [ticketId, setTicketId] = useState('');
  const [ticketError, setTicketError] = useState('');
  
  const [isFetching, setIsFetching] = useState(false);
  const [ticketData, setTicketData] = useState(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [planGenerated, setPlanGenerated] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);

  useEffect(() => {
    if (sharedReqContext && ticketId !== 'DOC-REQ') {
      setTicketId('DOC-REQ');
      setTicketData({
        id: 'DOC-REQ',
        title: 'Requirement Document Context',
        reporter: 'Local System',
        status: 'READY',
        description: 'Auto-populated from Requirement Specifications. LLM will read the full raw document text logic correctly.',
        acceptanceCriteria: ['Derived automatically by AI'],
        subTasks: []
      });
      setTicketError('');
    }
  }, [sharedReqContext, ticketId]);

  const handleFetchTicket = async () => {
    if (sharedReqContext && ticketId === 'DOC-REQ') return; 
    setTicketError('');
    if (!ticketId) {
      setTicketError('Ticket ID must be given to fetch details from Jira.');
      return;
    }
    
    const savedJira = localStorage.getItem('intelliplan_jira');
    if (!savedJira) {
      setTicketError('Jira Connection is not configured. Go to Connections tab first.');
      return;
    }
    
    const { url, email, token } = JSON.parse(savedJira);
    setIsFetching(true);
    
    try {
      const b64 = btoa(`${email}:${token}`);
      const response = await fetch(`/api/jira/rest/api/3/issue/${ticketId.trim()}`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${b64}`,
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error(`Failed to fetch ticket. HTTP Status: ${response.status}`);
      
      const data = await response.json();
      
      let descString = 'No description available.';
      if (data.fields.description) {
        if (typeof data.fields.description === 'string') {
          descString = data.fields.description;
        } else if (data.fields.description.content) {
          descString = data.fields.description.content.map(p => {
             if(p.type === 'paragraph' && p.content) return p.content.map(c => c.text).join(' ');
             return '';
          }).filter(x=>x).join('\n');
        }
      }
      
      setTicketData({
        id: data.key,
        title: data.fields.summary || 'No Title',
        reporter: data.fields.reporter ? data.fields.reporter.displayName : 'Unknown',
        status: data.fields.status ? data.fields.status.name : 'OPEN',
        description: descString || 'Parsed without content.',
        acceptanceCriteria: ['Derived from description analysis.'],
        subTasks: data.fields.subtasks?.map(s => s.fields.summary) || []
      });
      setIsFetching(false);
    } catch (err) {
      setIsFetching(false);
      setTicketError(`Fetch failed: ${err.message}`);
    }
  };

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    const savedLlm = localStorage.getItem('intelliplan_llm');
    if (!savedLlm) {
      setTicketError('LLM connection not configured. Go to Connections tab first.');
      setIsGenerating(false);
      return;
    }
    const { apiKey, model } = JSON.parse(savedLlm);
    const prompt = `You are a Senior QA Architect. Generate a test plan as raw JSON.
    ${sharedReqContext ? `Requirements: ${sharedReqContext}` : `Jira: ${ticketData.id} - ${ticketData.title}\n${ticketData.description}`}
    Format: { "test_plan": { "scope": "", "objectives": [], ... }, "user_stories": [{ "id": "US-001", ... }] }`;

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: model || 'llama-3.3-70b-versatile',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.2
        })
      });
      if (!res.ok) throw new Error(`Inference failed: ${res.status}`);
      const data = await res.json();
      const raw = data.choices[0].message.content;
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : raw);
      
      setGeneratedPlan(parsed);
      if (onPlanReady && parsed.user_stories) {
        onPlanReady({ ticketId: ticketData.id, ticketData, userStories: parsed.user_stories, testPlan: parsed.test_plan });
      }
      setPlanGenerated(true);
    } catch (err) {
      setTicketError(`Generation failed: ${err.message}`);
    }
    setIsGenerating(false);
  };

  return (
    <div className="fade-in">
       <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'40px', paddingBottom:'24px', borderBottom:'2px solid rgba(124, 58, 237, 0.1)'}}>
        <div>
          <h2 style={{fontSize:'2.2rem', fontWeight:800, background:'linear-gradient(135deg, white, var(--primary))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', margin:0}}>Generate Test Plan</h2>
          <p style={{marginTop:'8px', color:'#94a3b8', fontSize:'1.1rem'}}>Fetch Jira context and orchestrate AI coverage strategies.</p>
        </div>
      </div>

       <div className="settings-card">
          <div className="settings-card-header">
            <h3><IconSearch /> Jira Context Acquisition</h3>
          </div>

          {ticketError && <div className="alert-error" style={{borderRadius:'12px'}}>🚨 {ticketError}</div>}
          
          <div style={{display:'flex', gap:'16px', alignItems:'flex-end'}}>
            <div style={{flex:1}}>
              <label className="settings-label">Jira Issue Key</label>
              <input type="text" className="settings-input" placeholder="e.g. CORE-1024" value={ticketId} onChange={e => setTicketId(e.target.value)} />
            </div>
            <button className="settings-btn-main" onClick={handleFetchTicket} disabled={isFetching}>
              {isFetching ? <><span className="spinner"></span> Syncing...</> : <><IconRefresh /> Fetch Details</>}
            </button>
          </div>

          {ticketData && (
             <div className="jira-preview-box fade-in" style={{marginTop:'32px', background:'rgba(15, 23, 42, 0.3)', borderRadius:'20px', border:'1px solid rgba(255,255,255,0.05)'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom:'20px'}}>
                  <div style={{fontSize:'1.3rem', fontWeight:700}}><span className="settings-badge" style={{fontSize:'0.9rem', padding:'6px 12px', marginRight:'12px'}}>{ticketData.id}</span> {ticketData.title}</div>
                  <span className="settings-badge" style={{background:'rgba(59, 130, 246, 0.1)', color:'#60a5fa'}}>{ticketData.status}</span>
                </div>
                
                <div className="jira-section">
                   <h4 style={{color:'#94a3b8', fontSize:'0.8rem', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'8px'}}>Analysis Target</h4>
                   <p style={{lineHeight:1.6, color:'#cfd8e3'}}>{ticketData.description}</p>
                </div>

                {ticketData.subTasks?.length > 0 && (
                  <div className="jira-section" style={{marginTop:'24px'}}>
                    <h4 style={{color:'#94a3b8', fontSize:'0.8rem', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'12px'}}>Related Sub-Tasks</h4>
            <div style={{display:'flex', gap:'8px', flexWrap:'wrap'}}>
                      {ticketData.subTasks.map((task, idx) => (
                        <span key={idx} className="settings-badge" style={{background:'rgba(255,255,255,0.05)', color:'#94a3b8', border:'1px solid rgba(255,255,255,0.05)'}}>{task}</span>
                      ))}
                    </div>
                  </div>
                )}
             </div>
          )}
       </div>

       {ticketData && (
         <div className="settings-card" style={{borderColor: planGenerated ? '#10b981' : 'rgba(255,255,255,0.1)'}}>
            <div className="settings-card-header">
              <h3><IconPlan /> Orchestration Engine</h3>
              {planGenerated && <span className="settings-badge" style={{background:'rgba(16,185,129,0.1)', color:'#10b981'}}>Artifacts Ready</span>}
            </div>

            {!planGenerated ? (
              <button className="settings-btn-main" style={{width:'100%', justifyContent:'center', padding:'20px', fontSize:'1.1rem'}} onClick={handleGeneratePlan} disabled={isGenerating}>
                {isGenerating ? <><span className="spinner"></span> AI mapping templates...</> : <><IconSparkles /> Generate Premium Test Plan Document</>}
              </button>
            ) : (
              <div className="fade-in">
                <div style={{background:'rgba(16,185,129,0.05)', border:'1px solid rgba(16,185,129,0.2)', borderRadius:'16px', padding:'24px', marginBottom:'24px'}}>
                  <div style={{fontWeight:800, fontSize:'1.3rem', color:'#10b981', marginBottom:'8px'}}>✓ High-Fidelity Test Plan Orchestrated</div>
                  <p style={{color:'#94a3b8', lineHeight:1.6, margin:0}}>AI has successfully analyzed the context and mapped it to the premium test plan template.</p>
                  <div style={{display:'flex', gap:'16px', marginTop:'24px'}}>
                    <button className="settings-btn-main" style={{background:'#059669'}}><IconSave /> Download .DOCX</button>
                    <button className="settings-btn-main" onClick={() => setCurrentView('scenarios')}>Step 2: Generate Scenarios ➔</button>
                  </div>
                </div>
                {generatedPlan?.test_plan && <PlanPreviewViewer generatedPlan={generatedPlan} />}
              </div>
            )}
         </div>
       )}
    </div>
  );
}

// ─────────────────────────────────────────────
// TEST SCENARIO GENERATOR
// ─────────────────────────────────────────────
const SCENARIO_TYPE_META = {
  Positive: { color: '#10b981', bg: 'rgba(16,185,129,0.1)', emoji: '✅' },
  Negative: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   emoji: '❌' },
  Edge:     { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  emoji: '⚡' },
  "Edge Case": { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', emoji: '⚡' }
};

function TestScenarioGenerator({ planContext }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isGenerating, setIsGenerating] = useState(false);
  const [scenarios, setScenarios] = useState(null);
  const [genError, setGenError] = useState('');
  const [rawJson, setRawJson] = useState('');
  const [showRaw, setShowRaw] = useState(false);
  const [copyMsg, setCopyMsg] = useState('');

  const canGenerate = planContext && planContext.userStories && planContext.userStories.length > 0;

  const handleGenerate = async () => {
    setGenError('');
    setScenarios(null);
    const savedLlm = localStorage.getItem('intelliplan_llm');
    if (!savedLlm) { setGenError('LLM not configured. Go to Connections first.'); return; }
    const { apiKey, model } = JSON.parse(savedLlm);
    if (!canGenerate) { setGenError('No test plan / user stories found. Generate a Test Plan first.'); return; }

    setIsGenerating(true);
    const testPlanJson = planContext.testPlan ? JSON.stringify(planContext.testPlan, null, 2) : "{}";
    const userStoriesJson = JSON.stringify(planContext.userStories, null, 2);
    
    const prompt = `You are a Senior QA Engineer. Generate test scenarios based on the Test Plan and User Stories provided.

STRICT INSTRUCTIONS:
- Derive scenarios ONLY from the provided test plan context and user stories
- Base scenarios strictly on the ISTQB standard template fields defined below
- Return ONLY valid raw JSON — no markdown, no explanation

INPUT (Jira ticket ${planContext.ticketId}):
Test Plan:
${testPlanJson}

User Stories:
${userStoriesJson}

TASK:
Output a JSON array "test_scenarios" containing comprehensive ISTQB scenarios. 
Generate at least 3 scenarios per user story (1 Positive, 1 Negative, 1 Edge Case).

OUTPUT FORMAT:
{
  "test_scenarios": [
    {
      "identification": {
        "id": "TS-001",
        "title": "...",
        "module": "...",
        "requirement_id": "...",
        "test_level": "System | Integration | UAT",
        "test_type": "Functional | Non-Functional"
      },
      "description": {
        "objective": "...",
        "business_impact": "...",
        "actor": "..."
      },
      "preconditions_dependencies": {
        "preconditions": ["..."],
        "dependencies": ["..."]
      },
      "coverage": {
        "type": "Positive | Negative | Edge Case",
        "priority": "P0 | P1 | P2 | P3",
        "severity": "Critical | High | Medium | Low"
      },
      "test_conditions": [
        {
          "condition_id": "SC-01",
          "condition": "...",
          "expected_outcome": "..."
        }
      ],
      "test_data_strategy": {
        "data_type": "Valid | Invalid | Boundary",
        "sample_data": "..."
      }
    }
  ]
}`;

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: model || 'llama-3.3-70b-versatile',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.2
        })
      });
      if (!res.ok) throw new Error(`Groq API error: ${res.status}`);
      const data = await res.json();
      const raw = data.choices[0].message.content;
      setRawJson(raw);
      let parsed;
      try {
        const jsonMatch = raw.match(/\{[\s\S]*\}/);
        parsed = JSON.parse(jsonMatch ? jsonMatch[0] : raw);
      } catch {
        throw new Error('LLM returned invalid JSON. Check Raw Output tab.');
      }
      if (!parsed.test_scenarios || !Array.isArray(parsed.test_scenarios)) {
        throw new Error('Response missing test_scenarios array.');
      }
      setScenarios(parsed.test_scenarios);
    } catch (err) {
      setGenError(err.message);
    }
    setIsGenerating(false);
  };

  const handleCopy = () => {
    const toCopy = scenarios ? JSON.stringify({ test_scenarios: scenarios }, null, 2) : rawJson;
    navigator.clipboard.writeText(toCopy).then(() => {
      setCopyMsg('Copied!');
      setTimeout(() => setCopyMsg(''), 2000);
    });
  };

  const getScenarioType = (sc) => sc.coverage?.type || sc.type || 'Undefined';
  
  const filtered = scenarios
    ? (activeFilter === 'All' ? scenarios : scenarios.filter(s => {
        const type = getScenarioType(s);
        return type.includes(activeFilter);
      }))
    : [];

  const counts = scenarios
    ? { 
        All: scenarios.length, 
        Positive: scenarios.filter(s=>getScenarioType(s).includes('Positive')).length, 
        Negative: scenarios.filter(s=>getScenarioType(s).includes('Negative')).length, 
        Edge: scenarios.filter(s=>getScenarioType(s).includes('Edge')).length 
      }
    : { All:0, Positive:0, Negative:0, Edge:0 };

  return (
    <div className="fade-in">
      {/* Page Header */}
      <div className="wizard-title" style={{marginBottom:'24px'}}>
        <h2>Test Scenario Generator</h2>
        <p>Derives Positive, Negative &amp; Edge scenarios from your approved Test Plan &amp; Jira ticket context.</p>
      </div>

      {/* Context Banner */}
      <div className="wizard-content" style={{marginBottom:'24px'}}>
        <div className="wizard-header">
          <div className="wizard-header-icon" style={{background:'rgba(139,92,246,0.1)',color:'#8b5cf6'}}><IconScenario /></div>
          <div className="wizard-title">
            <h2>Input Context</h2>
            <p>Automatically inherited from the Generate Plan step.</p>
          </div>
        </div>

        {canGenerate ? (
          <div className="scenario-context-grid">
            <div className="scenario-context-item">
              <span className="scenario-context-label">🎫 Jira Ticket</span>
              <span className="tag-pill" style={{background:'#7c3aed'}}>{planContext.ticketId}</span>
            </div>
            <div className="scenario-context-item">
              <span className="scenario-context-label">📖 User Stories</span>
              <span className="tag-pill" style={{background:'#0ea5e9'}}>{planContext.userStories.length} stories</span>
            </div>
            <div className="scenario-context-item" style={{flexDirection:'column',alignItems:'flex-start',gap:'6px'}}>
              <span className="scenario-context-label">Story IDs</span>
              <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
                {planContext.userStories.map((us,i) => <span key={i} className="tag-pill" style={{background:'rgba(255,255,255,0.08)',border:'1px solid var(--border)',color:'var(--text-main)',fontSize:'0.75rem'}}>{us.id}</span>)}
              </div>
            </div>
          </div>
        ) : (
          <div className="alert-error" style={{marginBottom:0}}>
            🚨 No Test Plan context found. Please go to <strong>Generate Plan</strong>, fetch a Jira ticket, and generate a test plan first.
          </div>
        )}
      </div>

      {/* Generate Button */}
      <div className="wizard-content" style={{marginBottom:'24px'}}>
        <div className="wizard-header">
          <div className="wizard-header-icon" style={{background:'rgba(245,158,11,0.1)',color:'#f59e0b'}}><IconLightning /></div>
          <div className="wizard-title">
            <h2>Generate Scenarios</h2>
            <p>AI will derive all scenario types strictly from the provided user stories.</p>
          </div>
        </div>

        {genError && <div className="alert-error">🚨 {genError}</div>}

        <button
          className="btn btn-primary-solid"
          style={{background:'linear-gradient(135deg,#7c3aed,#a855f7)',width:'100%',padding:'16px',fontSize:'1rem'}}
          onClick={handleGenerate}
          disabled={isGenerating || !canGenerate}
        >
          {isGenerating ? <><span className="spinner"></span>&nbsp; AI is deriving scenarios from user stories...</> : '🧪 Generate Test Scenarios'}
        </button>
      </div>

      {/* Results */}
      {scenarios && (
        <div className="wizard-content fade-in">
          {/* Results Header */}
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px',flexWrap:'wrap',gap:'12px'}}>
            <div>
              <h3 style={{margin:'0 0 4px',color:'var(--text-main)'}}>🎯 {scenarios.length} Scenarios Generated</h3>
              <p style={{margin:0,color:'var(--text-muted)',fontSize:'0.9rem'}}>Strictly derived from {planContext.userStories.length} user stories of ticket {planContext.ticketId}</p>
            </div>
            <div style={{display:'flex',gap:'8px'}}>
              <button className="btn btn-secondary" style={{padding:'8px 14px',fontSize:'0.85rem'}} onClick={() => setShowRaw(!showRaw)}>
                {showRaw ? '📋 Card View' : '{ } Raw JSON'}
              </button>
              <button className="btn btn-secondary" style={{padding:'8px 14px',fontSize:'0.85rem'}} onClick={handleCopy}>
                {copyMsg || '📋 Copy JSON'}
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          {!showRaw && (
            <div className="scenario-filter-tabs">
              {['All','Positive','Negative','Edge'].map(f => (
                <button
                  key={f}
                  className={`scenario-filter-btn ${activeFilter===f?'active':''}`}
                  style={activeFilter===f && f!=='All' ? {borderColor: SCENARIO_TYPE_META[f]?.color, color: SCENARIO_TYPE_META[f]?.color} : {}}
                  onClick={() => setActiveFilter(f)}
                >
                  {f!=='All' && SCENARIO_TYPE_META[f]?.emoji} {f} <span className="scenario-filter-count">{counts[f]}</span>
                </button>
              ))}
            </div>
          )}

          {/* Card Grid */}
          {!showRaw ? (
            <div className="scenario-cards-grid">
              {filtered.map((sc, idx) => {
                const scType = getScenarioType(sc);
                let metaKey = 'Positive';
                if(scType.includes('Negative')) metaKey = 'Negative';
                if(scType.includes('Edge')) metaKey = 'Edge Case';
                const meta = SCENARIO_TYPE_META[metaKey] || { color:'#6c2bd9', bg:'rgba(108,43,217,0.1)', emoji:'🔵' };
                
                const id = sc.identification?.id || sc.id || 'N/A';
                const title = sc.identification?.title || sc.title || 'Untitled';
                const reqId = sc.identification?.requirement_id || sc.user_story_id || 'N/A';
                const desc = sc.description?.objective || sc.description || '';
                const conditions = sc.test_conditions || [];

                return (
                  <div key={idx} className="scenario-card" style={{'--sc-color': meta.color}}>
                    <div className="scenario-card-top">
                      <span className="scenario-id-badge">{id}</span>
                      <span className="scenario-type-badge" style={{background:meta.bg,color:meta.color}}>
                        {meta.emoji} {scType}
                      </span>
                    </div>
                    <div className="scenario-card-title">{title}</div>
                    <div className="scenario-card-desc">{desc}</div>
                    
                    {conditions.length > 0 && (
                       <div style={{marginTop: 'auto', padding: '10px', background: 'var(--bg-app)', border: '1px solid var(--border)', borderRadius: '6px'}}>
                         <div style={{fontWeight: 600, fontSize: '0.8rem', marginBottom: '8px', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Test Conditions</div>
                         {conditions.map((tc, cIdx) => (
                           <div key={cIdx} style={{fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px'}}>
                             <span style={{color: 'var(--primary)', fontWeight: 'bold'}}>•</span> {tc.condition} <span style={{opacity: 0.5}}>➔</span> <span style={{color: '#10b981'}}>{tc.expected_outcome}</span>
                           </div>
                         ))}
                       </div>
                    )}
                    
                    <div className="scenario-card-footer" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <span className="scenario-story-link">📎 {reqId}</span>
                      {sc.coverage?.priority && (
                         <span style={{fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', background: 'var(--input-bg)', padding: '2px 8px', borderRadius: '4px'}}>
                            {sc.coverage.priority} • {sc.coverage.severity}
                         </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <pre className="scenario-raw-output">{JSON.stringify({test_scenarios:scenarios},null,2)}</pre>
          )}
        </div>
      )}
    </div>
  );
}

function Dashboard({ setView }) {
  return (
    <div className="fade-in">
      <div className="hero-banner">
        <h1><IconSparkles /> AI Test Plan Generator</h1>
        <div className="hero-subtitle">• LLM Powered • Auto Jira Tracking • DOCX Mapping</div>
        <div className="hero-desc">
          IntelliPlan drastically accelerates QA workflows. Establish your configurations in the connections tab, fetch a live Jira ticket, and let AI build comprehensive coverage into your templates instantly.
        </div>
      </div>

      <div className="steps-grid">
        <div className="step-card">
          <div className="step-icon-wrapper"><IconLink /></div>
          <div className="stepper-label" style={{marginBottom: '8px'}}>1. Configure Connections</div>
          <div className="stepper-sub">Save LLM provider & Tracker API details via the Connections tab.</div>
        </div>
        <div className="step-card">
          <div className="step-icon-wrapper"><IconSearch /></div>
          <div className="stepper-label" style={{marginBottom: '8px'}}>2. Fetch Live Ticket</div>
          <div className="stepper-sub">Pull down precise acceptance criteria and deep ticket specifics instantly.</div>
        </div>
        <div className="step-card">
          <div className="step-icon-wrapper"><IconPlan /></div>
          <div className="stepper-label" style={{marginBottom: '8px'}}>3. Context Analysis</div>
          <div className="stepper-sub">AI evaluates parameters and matches them with pre-loaded standards.</div>
        </div>
        <div className="step-card">
          <div className="step-icon-wrapper"><IconSparkles /></div>
          <div className="stepper-label" style={{marginBottom: '8px'}}>4. Format & Export</div>
          <div className="stepper-sub">Download a perfectly templated Docx document.</div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card purple">
          <div className="stat-header">
            <span>SAVED PROJECTS</span>
            <span className="stat-badge">Ready</span>
          </div>
          <div className="stat-value">1</div>
          <div className="stat-sub">Jira Connection Loaded</div>
        </div>
        <div className="stat-card pink">
          <div className="stat-header">
            <span>TEST PLANS EXPORTED</span>
          </div>
          <div className="stat-value">12</div>
          <div className="stat-sub">This week</div>
        </div>
        <div className="stat-card dark-purple">
          <div className="stat-header">
            <span>INTELLIGENCE</span>
            <span className="stat-badge">Active</span>
          </div>
          <div className="stat-value">Groq</div>
          <div className="stat-sub">llama-3.3-70b configured</div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [user, setUser] = useState(null);
  // Shared state: lifted up so GeneratePlan → TestScenarioGenerator → RequirementSpecification
  const [planContext, setPlanContext] = useState(null);
  const [sharedReqContext, setSharedReqContext] = useState(null);
  
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle system preference initially
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  if (!user) {
    return (
      <div className={isDarkMode ? 'dark' : ''}>
         <button 
           className="theme-toggle" 
           style={{position: 'absolute', top: 20, right: 20, zIndex: 100}} 
           onClick={() => setIsDarkMode(!isDarkMode)}
         >
           {isDarkMode ? '🌙' : '🌞'}
         </button>
         <AuthScreen onLogin={setUser} />
      </div>
    );
  }

  return (
    <div className={`app-root ${isDarkMode ? 'dark' : ''}`}>
       <Sidebar currentView={currentView} setCurrentView={setCurrentView} user={user} />
       <div className="main-content">
          <header className="top-header">
             <div className="header-title">
               {currentView === 'dashboard' ? 'Dashboard' : 
                currentView === 'settings' ? 'Settings' :
                currentView === 'requirements' ? 'Requirement Specification' :
                currentView === 'user-stories' ? 'User Stories Preview' :
                currentView === 'scenarios' ? 'Test Scenario Generator' : 'Generate Test Plan'}
             </div>
             <div className="header-actions">
               <div className="header-user-name">Welcome, {user.name} 👋</div>
               <button className="btn-secondary" style={{padding: '6px 16px', fontSize: '0.8rem', borderRadius: '8px'}} onClick={() => setUser(null)}>Logout</button>
               <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
                 {isDarkMode ? '🌙' : '🌞'}
               </button>
             </div>
          </header>
          <div className="page-container">
            {currentView === 'dashboard' ? 
               <Dashboard setView={setCurrentView} /> : 
             currentView === 'settings' ?
               <Settings /> :
             currentView === 'requirements' ?
               <RequirementSpecification setSharedReqContext={setSharedReqContext} setCurrentView={setCurrentView} /> :
             currentView === 'user-stories' ?
               <UserStoriesPreview sharedReqContext={sharedReqContext} /> :
             currentView === 'scenarios' ?
               <TestScenarioGenerator planContext={planContext} /> :
               <GeneratePlan onPlanReady={setPlanContext} setCurrentView={setCurrentView} sharedReqContext={sharedReqContext} />
            }
          </div>
       </div>
    </div>
  )
}
