import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconSearch, IconSparkles, IconCoverage, IconStories, IconScenario, IconDashboard, IconAnalyze } from '../components/Icons';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

/* ─── Inline SVGs ─── */
const Ic = {
  Alert: ()=><svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  Trace: ()=><svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
  Plus:  ()=><svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>,
  Check: ()=><svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>,
  Eye:   ()=><svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
};

export default function Coverage() {
   const navigate = useNavigate();

   React.useEffect(() => {
     if (sessionStorage.getItem('guestMode') === 'true') {
       navigate('/login');
     }
   }, [navigate]);

   /* ── Source Data Ingestion ── */
   const stories   = useMemo(() => JSON.parse(sessionStorage.getItem('us_stories')   || '[]'), []);
   const scenarios = useMemo(() => JSON.parse(sessionStorage.getItem('ts_scenarios') || '[]'), []);
   const cases     = useMemo(() => JSON.parse(sessionStorage.getItem('tc_cases')     || '[]'), []);
   
   /* ── State ── */
   const [filterModule, setFilterModule] = useState('All');
   const [searchQ, setSearchQ] = useState('');

   /* ── Computed Metrics & Logic ── */
   const modules = [...new Set(stories.map(s => s.module || 'Uncategorized'))];
   
   // Map scenarios to stories
   const traceability = stories.map(story => {
      const storyScenarios = scenarios.filter(sc => 
         sc.linkedStory === story.id || (sc.tags && sc.tags.includes(story.id))
      );
      const storyCases = cases.filter(tc => 
         tc.linkedStory === story.id || storyScenarios.some(sc => sc.id === tc.linkedScenario)
      );

      return {
         ...story,
         scenarios: storyScenarios,
         cases: storyCases,
         coveragePct: storyScenarios.length > 0 ? (storyCases.length > 0 ? 100 : 50) : 0,
         status: storyScenarios.length > 0 ? (storyCases.length > 0 ? 'Covered' : 'Partial') : 'Gap'
      };
   });

   const overallCoverage = traceability.length > 0 
      ? Math.round((traceability.filter(t => t.status === 'Covered').length / traceability.length) * 100)
      : 0;

   const gapCount = traceability.filter(t => t.status === 'Gap').length;
   const partialCount = traceability.filter(t => t.status === 'Partial').length;

   /* ── Shared Styles ── */
   const card = { background:'rgba(15,23,42,0.7)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'12px', backdropFilter:'blur(12px)' };
   const tag = (c) => ({ background:`${c}15`, color:c, border:`1px solid ${c}25`, padding:'2px 8px', borderRadius:'6px', fontSize:'0.65rem', fontWeight:700 });

   return (
      <div style={{ display:'flex', height:'100vh', background:'#080c14', color:'white', overflow:'hidden', fontFamily:'"Inter", sans-serif' }}>
         <Sidebar active="coverage" />

         <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
            
            {/* Header */}
            <Header searchPlaceholder="Search traceability..." />

            <div style={{ flex:1, overflowY:'auto', padding:'2rem' }}>
               <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem' }}>
                 <h1 style={{fontSize:'1.75rem', fontWeight:700, margin:0}}>Traceability Matrix</h1>
                 <div style={{ display:'flex', gap:'8px' }}>
                     <button onClick={()=>navigate('/user-stories')} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'white', padding:'8px 16px', borderRadius:'8px', fontSize:'0.8rem', fontWeight:600, cursor:'pointer' }}>+ Add Stories</button>
                     <button style={{ background:'linear-gradient(135deg, #3b82f6, #2563eb)', border:'none', color:'white', padding:'8px 18px', borderRadius:'8px', fontSize:'0.8rem', fontWeight:700, cursor:'pointer', boxShadow:'0 4px 12px rgba(59,130,246,0.3)' }}>Export Audit Log</button>
                 </div>
               </div>
               
               {/* Dashboard Hero Metrics */}
               <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'1.25rem', marginBottom:'2rem' }}>
                  {[
                     { label:'Requirement Coverage', val: `${overallCoverage}%`, color:'#3b82f6', icon:<IconCoverage/>, sub:'High confidence' },
                     { label:'Identified Coverage Gaps', val: gapCount, color:'#ef4444', icon:<Ic.Alert/>, sub:'Requires attention' },
                     { label:'Functional Density', val: `${(cases.length / (stories.length || 1)).toFixed(1)}x`, color:'#10b981', icon:<IconScenario/>, sub:'Cases per requirement' },
                     { label:'Risk Concentration', val:'Medium', color:'#f59e0b', icon:<IconAnalyze/>, sub:'Top: Authentication' },
                  ].map((m, i) => (
                     <div key={i} style={{ ...card, padding:'1.25rem' }}>
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'0.75rem' }}>
                           <div style={{ background:`${m.color}15`, color:m.color, padding:'8px', borderRadius:'10px' }}>{m.icon}</div>
                           <span style={{ fontSize:'0.65rem', color:'#475569', fontWeight:700, letterSpacing:'0.05em' }}>SNAPSHOT</span>
                        </div>
                        <div style={{ fontSize:'1.75rem', fontWeight:800, color:'white', marginBottom:'2px' }}>{m.val}</div>
                        <div style={{ fontSize:'0.75rem', fontWeight:600, color:'#94a3b8', marginBottom:'4px' }}>{m.label}</div>
                        <div style={{ fontSize:'0.65rem', color:'#475569' }}>{m.sub}</div>
                     </div>
                  ))}
               </div>

               <div style={{ display:'grid', gridTemplateColumns:'1fr 340px', gap:'1.5rem' }}>
                  
                  {/* Traceability Matrix */}
                  <section style={{ ...card, display:'flex', flexDirection:'column' }}>
                     <div style={{ padding:'1.25rem', borderBottom:'1px solid rgba(255,255,255,0.05)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                        <div>
                           <h3 style={{ fontSize:'1.1rem', margin:0, fontWeight:700 }}>E2E Traceability Matrix</h3>
                           <p style={{ margin:0, color:'#64748b', fontSize:'0.75rem' }}>Tracking requirement fulfillment from Story to executable Test Case</p>
                        </div>
                        <div style={{ display:'flex', gap:'8px' }}>
                           <select 
                              value={filterModule}
                              onChange={(e)=>setFilterModule(e.target.value)}
                              style={{ background:'rgba(15,23,42,0.8)', border:'1px solid rgba(255,255,255,0.1)', color:'white', padding:'6px 12px', borderRadius:'6px', fontSize:'0.75rem', outline:'none' }}
                           >
                              <option value="All">All Modules</option>
                              {modules.map(m => <option key={m} value={m}>{m}</option>)}
                           </select>
                        </div>
                     </div>

                     <div style={{ padding:0 }}>
                        <table style={{ width:'100%', borderCollapse:'collapse', textAlign:'left' }}>
                           <thead style={{ background:'rgba(0,0,0,0.2)', color:'#475569', fontSize:'0.65rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.05em' }}>
                              <tr>
                                 <th style={{ padding:'12px 20px' }}>User Story</th>
                                 <th style={{ padding:'12px 20px' }}>Scenarios</th>
                                 <th style={{ padding:'12px 20px' }}>Test Cases</th>
                                 <th style={{ padding:'12px 20px' }}>Coverage</th>
                                 <th style={{ padding:'12px 20px' }}>Actions</th>
                              </tr>
                           </thead>
                           <tbody style={{ fontSize:'0.85rem' }}>
                              {traceability
                                 .filter(t => (filterModule === 'All' || t.module === filterModule))
                                 .filter(t => t.title.toLowerCase().includes(searchQ.toLowerCase()) || t.id.toLowerCase().includes(searchQ.toLowerCase()))
                                 .map((item, idx) => (
                                 <tr key={idx} style={{ borderBottom:'1px solid rgba(255,255,255,0.03)', transition:'background 0.2s' }} onMouseEnter={(e)=>e.currentTarget.style.background='rgba(255,255,255,0.02)'} onMouseLeave={(e)=>e.currentTarget.style.background='transparent'}>
                                    <td style={{ padding:'15px 20px' }}>
                                       <div style={{ fontWeight:600, color:'white', marginBottom:'2px' }}>{item.id}: {item.title}</div>
                                       <div style={{ fontSize:'0.7rem', color:'#64748b' }}>Module: {item.module || 'General'}</div>
                                    </td>
                                    <td style={{ padding:'15px 20px' }}>
                                       <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                                          <span style={{ fontWeight:700, color:item.scenarios.length > 0 ? '#a78bfa' : '#ef4444' }}>{item.scenarios.length}</span>
                                          <div style={{ height:'4px', width:'40px', background:'rgba(255,255,255,0.05)', borderRadius:'2px', overflow:'hidden' }}>
                                             <div style={{ height:'100%', width:`${Math.min(100, item.scenarios.length * 30)}%`, background:'#a78bfa' }} />
                                          </div>
                                       </div>
                                    </td>
                                    <td style={{ padding:'15px 20px' }}>
                                       <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                                          <span style={{ fontWeight:700, color:item.cases.length > 0 ? '#3b82f6' : '#64748b' }}>{item.cases.length}</span>
                                          <div style={{ height:'4px', width:'40px', background:'rgba(255,255,255,0.05)', borderRadius:'2px', overflow:'hidden' }}>
                                             <div style={{ height:'100%', width:`${Math.min(100, item.cases.length * 20)}%`, background:'#3b82f6' }} />
                                          </div>
                                       </div>
                                    </td>
                                    <td style={{ padding:'15px 20px' }}>
                                       {item.status === 'Gap' && <span style={tag('#ef4444')}>● NO COVERAGE</span>}
                                       {item.status === 'Partial' && <span style={tag('#f59e0b')}>◐ PARTIAL</span>}
                                       {item.status === 'Covered' && <span style={tag('#10b981')}>✓ FULLY LINKED</span>}
                                    </td>
                                    <td style={{ padding:'15px 20px' }}>
                                       <div style={{ display:'flex', gap:'8px' }}>
                                          <button style={{ background:'transparent', border:'none', color:'#94a3b8', cursor:'pointer' }} title="Trace Logs"><Ic.Trace/></button>
                                          <button style={{ background:'transparent', border:'none', color:'#94a3b8', cursor:'pointer' }} title="Suggest Cases"><IconSparkles/></button>
                                       </div>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                        {traceability.length === 0 && (
                           <div style={{ padding:'4rem', textAlign:'center' }}>
                              <div style={{ color:'#1e293b', marginBottom:'1rem' }}><IconCoverage /></div>
                              <h4 style={{ color:'#94a3b8', margin:0 }}>No data flows detected in the current pipeline.</h4>
                              <p style={{ color:'#475569', fontSize:'0.8rem', margin:'8px 0 0' }}>Start by generating User Stories in Stage 1.</p>
                           </div>
                        )}
                     </div>
                  </section>

                  {/* Sidebar - Insights & Suggestions */}
                  <aside style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
                     
                     {/* Circular Coverage Chart */}
                     <div style={{ ...card, padding:'1.5rem', textAlign:'center' }}>
                        <h4 style={{ fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.07em', color:'#64748b', margin:'0 0 1.5rem' }}>OVERALL COMPLIANCE</h4>
                        <div style={{ position:'relative', display:'inline-flex', justifyContent:'center', alignItems:'center' }}>
                           <svg width="140" height="140" style={{ transform:'rotate(-90deg)' }}>
                              <circle cx="70" cy="70" r="60" stroke="rgba(255,255,255,0.03)" strokeWidth="12" fill="none" />
                              <circle cx="70" cy="70" r="60" stroke="#3b82f6" strokeWidth="12" fill="none" strokeDasharray={`${(overallCoverage/100) * 377} 377`} strokeLinecap="round" style={{ transition:'stroke-dasharray 1s ease' }} />
                           </svg>
                           <div style={{ position:'absolute', textAlign:'center' }}>
                              <div style={{ fontSize:'1.75rem', fontWeight:800 }}>{overallCoverage}%</div>
                              <div style={{ fontSize:'0.65rem', color:'#475569', fontWeight:700 }}>VERIFIED</div>
                           </div>
                        </div>
                        <div style={{ marginTop:'1.5rem', display:'flex', justifyContent:'space-around' }}>
                           <div>
                              <div style={{ color:'#10b981', fontWeight:800 }}>{traceability.filter(t => t.status === 'Covered').length}</div>
                              <div style={{ fontSize:'0.6rem', color:'#475569', fontWeight:600 }}>COVERED</div>
                           </div>
                           <div>
                              <div style={{ color:'#ef4444', fontWeight:800 }}>{gapCount}</div>
                              <div style={{ fontSize:'0.6rem', color:'#475569', fontWeight:600 }}>GAP</div>
                           </div>
                        </div>
                     </div>

                     {/* AI Risk Analysis */}
                     <div style={{ ...card, padding:'1.25rem', border:'1px solid rgba(245,158,11,0.2)', background:'rgba(245,158,11,0.03)' }}>
                        <div style={{ display:'flex', gap:'8px', alignItems:'flex-start', marginBottom:'1rem' }}>
                           <div style={{ color:'#f59e0b' }}><IconSparkles/></div>
                           <div>
                              <h4 style={{ margin:0, fontSize:'0.85rem', fontWeight:700, color:'#f59e0b' }}>AI Risk Assessment</h4>
                              <p style={{ margin:0, fontSize:'0.7rem', color:'#92400e' }}>Immediate priorities for Stage 7</p>
                           </div>
                        </div>
                        <ul style={{ padding:0, margin:0, listStyle:'none' }}>
                           {[
                              { txt:'Authentication has 3 high-risk gaps.', level:'Critical' },
                              { txt:'Edge case coverage is below 15% globally.', level:'High' },
                              { txt:'Manual verification suggested for 2 flows.', level:'Med' }
                           ].map((item, i) => (
                              <li key={i} style={{ display:'flex', gap:'8px', marginBottom:'0.65rem', fontSize:'0.73rem', color:'#92400e' }}>
                                 <span style={{ marginTop:'3px' }}><Ic.Alert/></span>
                                 <span>{item.txt}</span>
                              </li>
                           ))}
                        </ul>
                        <button style={{ width:'100%', marginTop:'0.5rem', background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.2)', color:'#f59e0b', padding:'8px', borderRadius:'8px', fontSize:'0.75rem', fontWeight:700, cursor:'pointer' }}>Execute Gap Analysis Run</button>
                     </div>

                     {/* Coverage Trends (Empty state for now) */}
                     <div style={{ ...card, padding:'1.25rem' }}>
                        <h4 style={{ fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.07em', color:'#64748b', margin:'0 0 1rem' }}>MODULE HEALTH</h4>
                        <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                           {modules.length > 0 ? modules.slice(0, 4).map((m, i) => {
                              const moduleCoverage = Math.round((traceability.filter(t => t.module === m && t.status === 'Covered').length / (traceability.filter(t => t.module === m).length || 1)) * 100);
                              return (
                                 <div key={i}>
                                    <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.7rem', marginBottom:'4px' }}>
                                       <span style={{ color:'#94a3b8', fontWeight:600 }}>{m}</span>
                                       <span style={{ color:'white' }}>{moduleCoverage}%</span>
                                    </div>
                                    <div style={{ height:'4px', width:'100%', background:'rgba(255,255,255,0.05)', borderRadius:'2px', overflow:'hidden' }}>
                                       <div style={{ height:'100%', width:`${moduleCoverage}%`, background:moduleCoverage > 70 ? '#10b981' : moduleCoverage > 40 ? '#f59e0b' : '#ef4444' }} />
                                    </div>
                                 </div>
                              );
                           }) : (
                              <div style={{ padding:'1rem 0', textAlign:'center', color:'#475569', fontSize:'0.75rem' }}>No modules mapped.</div>
                           )}
                        </div>
                     </div>

                  </aside>
               </div>
            </div>
         </div>
      </div>
   );
}
