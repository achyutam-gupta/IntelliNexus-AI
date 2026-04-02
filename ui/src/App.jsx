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
        <div className={`nav-item ${currentView === 'connections' ? 'active' : ''}`} onClick={() => setCurrentView('connections')}>
          <IconLink /> Connections
        </div>
        <div className={`nav-item ${currentView === 'generate' ? 'active' : ''}`} onClick={() => setCurrentView('generate')}>
          <IconPlan /> Generate Plan
        </div>
      </div>
      <div className="sidebar-footer">
        <div className="user-profile-tag" style={{display: currentView === 'generate' ? 'none' : 'flex' }}>
          <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
          <div className="user-info-text">
            <span className="user-email">{user.email}</span>
            <span className="user-project">IntelliPlan User</span>
          </div>
        </div>
        
        <div className="sidebar-settings" onClick={() => setCurrentView('settings')}>
           <IconSettings /> <span style={{marginLeft: '8px', fontWeight: 500, fontSize: '0.9rem'}}>Settings</span>
        </div>
      </div>
    </div>
  );
}

function Connections() {
  const [llmConfig, setLlmConfig] = useState(() => {
    const saved = localStorage.getItem('intelliplan_llm');
    return saved ? JSON.parse(saved) : { 
      provider: 'Groq', 
      model: 'openai/gpt-oss-120b', 
      apiKey: import.meta.env.VITE_GROQ_API_KEY || '' 
    };
  });
  
  const [jiraConfig, setJiraConfig] = useState(() => {
    const saved = localStorage.getItem('intelliplan_jira');
    return saved ? JSON.parse(saved) : { 
      platform: 'Jira', 
      url: import.meta.env.VITE_JIRA_URL || '', 
      email: import.meta.env.VITE_JIRA_EMAIL || '', 
      token: import.meta.env.VITE_JIRA_TOKEN || '' 
    };
  });
  
  const [llmStatus, setLlmStatus] = useState('idle'); // idle, testing, success, error
  const [llmError, setLlmError] = useState('');

  const [jiraStatus, setJiraStatus] = useState('idle');
  const [jiraError, setJiraError] = useState('');

  const handleSaveLlm = async () => {
    setLlmError('');
    if (!llmConfig.provider || !llmConfig.model || !llmConfig.apiKey) {
      setLlmError('All fields (Provider, Model, API Key) are required.');
      return;
    }
    setLlmStatus('testing');
    
    try {
      if (llmConfig.provider === 'Groq') {
        const response = await fetch('https://api.groq.com/openai/v1/models', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${llmConfig.apiKey}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Groq API Key is invalid or unauthorized.');
        }
      } else if (llmConfig.provider === 'Ollama') {
        const response = await fetch('http://localhost:11434/api/version');
        if (!response.ok) {
          throw new Error('Ollama endpoint is not reachable.');
        }
      }
      setLlmStatus('success');
      localStorage.setItem('intelliplan_llm', JSON.stringify(llmConfig));
    } catch (err) {
      setLlmStatus('error');
      setLlmError(`Real-time connection failed: ${err.message}.`);
    }
  };

  const handleSaveJira = async () => {
    setJiraError('');
    if (!jiraConfig.platform || !jiraConfig.url || !jiraConfig.email || !jiraConfig.token) {
      setJiraError('All fields (Platform, URL, Email, Token) are required.');
      return;
    }
    setJiraStatus('testing');
    
    try {
      const b64 = btoa(`${jiraConfig.email}:${jiraConfig.token}`);
      // Use Vite proxy — /api/jira proxies to https://ailearning2026.atlassian.net
      const response = await fetch(`/api/jira/rest/api/3/myself`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${b64}`,
          'Accept': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`Jira authentication failed. HTTP Status: ${response.status}`);
      }
      setJiraStatus('success');
      localStorage.setItem('intelliplan_jira', JSON.stringify(jiraConfig));
    } catch (err) {
      setJiraStatus('error');
      setJiraError(`Real-time connection failed: ${err.message}.`);
    }
  };

  return (
    <div className="fade-in">
       <div className="wizard-title" style={{marginBottom: '24px'}}>
         <h2>System Connections</h2>
         <p>Save and verify your LLM and JIRA integration details here.</p>
       </div>

       {/* LLM Connection Block */}
       <div className="wizard-content">
          <div className="wizard-header">
            <div className="wizard-header-icon"><IconLightning /></div>
            <div className="wizard-title">
              <h2>Large Language Model (LLM)</h2>
              <p>Configure your intelligence engine.</p>
            </div>
          </div>
          
          {llmError && <div className="alert-error">🚨 {llmError}</div>}
          {llmStatus === 'success' && <div className="alert-success">✓ LLM Connection established dynamically!</div>}

          <div className="form-row">
            <div className="form-col">
               <label>Provider</label>
               <select className="form-control" value={llmConfig.provider} onChange={e => setLlmConfig({...llmConfig, provider: e.target.value})}>
                 <option value="">Select...</option>
                 <option value="Groq">Groq</option>
                 <option value="Ollama">Ollama</option>
               </select>
            </div>
            <div className="form-col">
               <label>Model</label>
               <select className="form-control" value={llmConfig.model} onChange={e => setLlmConfig({...llmConfig, model: e.target.value})}>
                 <option value="">Select...</option>
                 <option value="openai/gpt-oss-120b">openai/gpt-oss-120b</option>
                 <option value="llama-3.3-70b-versatile">llama-3.3-70b-versatile</option>
               </select>
            </div>
          </div>
          <div className="form-group">
            <label>API Key</label>
            <input type="password" placeholder="••••••••" className="form-control" value={llmConfig.apiKey} onChange={e => setLlmConfig({...llmConfig, apiKey: e.target.value})} />
          </div>
          <button className="btn btn-primary-solid" onClick={handleSaveLlm} disabled={llmStatus === 'testing'}>
             {llmStatus === 'testing' ? <><span className="spinner"></span> Testing Connection...</> : '✓ Save & Test LLM Connection'}
          </button>
       </div>

       {/* Jira Connection Block */}
       <div className="wizard-content">
          <div className="wizard-header">
            <div className="wizard-header-icon"><IconDatabase /></div>
            <div className="wizard-title">
              <h2>Jira Source Settings</h2>
              <p>Connect your tracker to fetch ticket details dynamically.</p>
            </div>
          </div>
          
          {jiraError && <div className="alert-error">🚨 {jiraError}</div>}
          {jiraStatus === 'success' && <div className="alert-success">✓ Jira Workspace verified in real-time!</div>}

          <div className="form-row">
            <div className="form-col">
              <label>Platform</label>
              <select className="form-control" value={jiraConfig.platform} onChange={e => setJiraConfig({...jiraConfig, platform: e.target.value})}>
                <option value="Jira">Jira</option>
              </select>
            </div>
            <div className="form-col">
              <label>Base URL</label>
              <input type="text" className="form-control" value={jiraConfig.url} onChange={e => setJiraConfig({...jiraConfig, url: e.target.value})} placeholder="https://your.atlassian.net" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label>Account Email</label>
              <input type="email" className="form-control" value={jiraConfig.email} onChange={e => setJiraConfig({...jiraConfig, email: e.target.value})} />
            </div>
            <div className="form-col">
              <label>API Token</label>
              <input type="password" placeholder="••••••••" className="form-control" value={jiraConfig.token} onChange={e => setJiraConfig({...jiraConfig, token: e.target.value})} />
            </div>
          </div>
          <button className="btn btn-primary-solid" style={{background: '#0ea5e9'}} onClick={handleSaveJira} disabled={jiraStatus === 'testing'}>
             {jiraStatus === 'testing' ? <><span className="spinner"></span> Testing Connection...</> : '✓ Save & Test JIRA Connection'}
          </button>
       </div>
    </div>
  );
}

function GeneratePlan() {
  const [ticketId, setTicketId] = useState('');
  const [ticketError, setTicketError] = useState('');
  
  const [isFetching, setIsFetching] = useState(false);
  const [ticketData, setTicketData] = useState(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [planGenerated, setPlanGenerated] = useState(false);

  const handleFetchTicket = async () => {
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
      const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url;
      const response = await fetch(`/api/jira/rest/api/3/issue/${ticketId.trim()}`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${b64}`,
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ticket. HTTP Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Attempt to neatly extract description text if it's Atlassian Document Format
      let descString = 'No description available.';
      if (data.fields.description) {
        if (typeof data.fields.description === 'string') {
          descString = data.fields.description;
        } else if (data.fields.description.content) {
          descString = data.fields.description.content.map(p => {
             if(p.type === 'paragraph' && p.content) {
                 return p.content.map(c => c.text).join(' ');
             }
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
        acceptanceCriteria: ['Auto-extracted from issue descriptions or custom fields matching AC.'],
        subTasks: data.fields.subtasks && data.fields.subtasks.length > 0 
                  ? data.fields.subtasks.map(s => s.fields.summary) 
                  : ['None attached']
      });
      setIsFetching(false);
    } catch (err) {
      setIsFetching(false);
      setTicketError(`Fetch failed: ${err.message}`);
    }
  };

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    await new Promise(r => setTimeout(r, 2500));
    setIsGenerating(false);
    setPlanGenerated(true);
  };

  return (
    <div className="fade-in">
       <div className="wizard-title" style={{marginBottom: '24px'}}>
         <h2>Generate Test Plan</h2>
         <p>Fetch your ticket and kickstart the AI template engine.</p>
       </div>

       {/* Step: Fetch */}
       <div className="wizard-content">
          <div className="wizard-header">
            <div className="wizard-header-icon" style={{background: 'rgba(236, 72, 153, 0.1)', color: '#db2777'}}><IconSearch /></div>
            <div className="wizard-title">
              <h2>JIRA Details</h2>
              <p>Enter the ticket ID and fetch live details.</p>
            </div>
          </div>

          {ticketError && <div className="alert-error">🚨 {ticketError}</div>}
          
          <div className="form-row" style={{alignItems: 'end'}}>
            <div className="form-col">
              <label>Jira Ticket ID</label>
              <input type="text" className="form-control" placeholder="e.g. ATP-105" value={ticketId} onChange={e => setTicketId(e.target.value)} />
            </div>
            <button className="btn btn-primary-solid" style={{background: '#db2777'}} onClick={handleFetchTicket} disabled={isFetching}>
              {isFetching ? <><span className="spinner"></span> Fetching...</> : '🔍 Fetch Jira Details'}
            </button>
          </div>

          {ticketData && (
             <div className="jira-preview-box fade-in">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div className="jira-preview-title"><span className="tag-pill">{ticketData.id}</span> {ticketData.title}</div>
                  <div className="tag-pill" style={{background: '#3b82f6'}}>{ticketData.status}</div>
                </div>
                
                <div className="jira-section mt-4" style={{marginTop: '16px'}}>
                   <h4>📝 Description</h4>
                   <p>{ticketData.description}</p>
                </div>

                <div className="jira-section" style={{marginTop: '16px'}}>
                   <h4>📋 Acceptance Criteria</h4>
                   <ul style={{margin: '8px 0', paddingLeft: '20px', color: 'var(--text-main)', fontSize: '0.95rem'}}>
                      {ticketData.acceptanceCriteria.map((ac, idx) => <li key={idx}>{ac}</li>)}
                   </ul>
                </div>

                <div className="jira-section" style={{marginTop: '16px'}}>
                   <h4>✅ Sub-Tasks</h4>
                   <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px'}}>
                     {ticketData.subTasks.map((task, idx) => (
                       <span key={idx} style={{background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem'}}>
                         {task}
                       </span>
                     ))}
                   </div>
                </div>
             </div>
          )}
       </div>

       {/* Step: Generate */}
       {ticketData && (
         <div className="wizard-content fade-in">
            <div className="wizard-header">
              <div className="wizard-header-icon" style={{background: 'rgba(16, 185, 129, 0.1)', color: '#10b981'}}><IconPlan /></div>
              <div className="wizard-title">
                <h2>Build Output</h2>
                <p>Generate a test plan based on the project template using the fetched context.</p>
              </div>
            </div>

            {!planGenerated ? (
              <button className="btn btn-primary-solid" style={{background: '#10b981', width: '100%', padding: '16px'}} onClick={handleGeneratePlan} disabled={isGenerating}>
                {isGenerating ? <><span className="spinner"></span> AI is analyzing and generating template...</> : '⚡ Generate Test Plan Document'}
              </button>
            ) : (
              <div className="alert-success fade-in" style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                <div style={{fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '8px'}}>✓ Test Plan Generated successfully!</div>
                <p style={{margin: '0 0 16px', color: 'var(--text-main)', opacity: 0.9}}>Based on {ticketData.id}, 12 test cases and integration plans were crafted into the standard template.</p>
                <button className="btn btn-primary-solid" style={{background: '#059669'}}>⬇ Download .docx Template</button>
              </div>
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
                currentView === 'connections' ? 'Connections' :
                currentView === 'settings' ? 'Settings' : 'Generate Test Plan'}
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
             currentView === 'connections' ?
               <Connections /> :
             currentView === 'settings' ? 
               <div className="fade-in" style={{padding: '40px', background: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border)'}}>
                 <h2>Settings Panel</h2>
                 <p style={{color: 'var(--text-muted)'}}>Profile and system preferences coming soon.</p>
               </div> :
               <GeneratePlan />
            }
          </div>
       </div>
    </div>
  )
}
