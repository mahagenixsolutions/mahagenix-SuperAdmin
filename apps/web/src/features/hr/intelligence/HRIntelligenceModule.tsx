import React from 'react';
import { Sparkles, TrendingUp, Users, Award, ShieldCheck, Activity } from 'lucide-react';
import { KPICard } from '../../../components/erp/KPICard';

export default function HRIntelligenceModule() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', fontFamily: "'Inter', sans-serif" }}>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: 14 }}>
        <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', borderRadius: 16, padding: 18, color: 'white' }}>
          <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.9 }}>EMPLOYEE HEALTH SCORE</span>
          <div style={{ fontSize: 32, fontWeight: 800, marginTop: 8 }}>96 <span style={{ fontSize: 14, opacity: 0.8 }}>/ 100</span></div>
          <span style={{ fontSize: 11, opacity: 0.9, marginTop: 4, display: 'block' }}>High Engagement & Satisfaction</span>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', borderRadius: 16, padding: 18, color: 'white' }}>
          <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.9 }}>ATTRITION PREDICTION</span>
          <div style={{ fontSize: 24, fontWeight: 800, marginTop: 8 }}>Low Risk</div>
          <span style={{ fontSize: 11, opacity: 0.9, marginTop: 4, display: 'block' }}>98.2% Annual Retention</span>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)', borderRadius: 16, padding: 18, color: 'white' }}>
          <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.9 }}>HIRING PIPELINE EFFICIENCY</span>
          <div style={{ fontSize: 24, fontWeight: 800, marginTop: 8 }}>14 Days</div>
          <span style={{ fontSize: 11, opacity: 0.9, marginTop: 4, display: 'block' }}>Average Time-to-Hire</span>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', borderRadius: 16, padding: 18, color: 'white' }}>
          <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.9 }}>TRAINING EFFECTIVENESS</span>
          <div style={{ fontSize: 24, fontWeight: 800, marginTop: 8 }}>94.5%</div>
          <span style={{ fontSize: 11, opacity: 0.9, marginTop: 4, display: 'block' }}>Post-Skill Score Gain</span>
        </div>
      </div>

      <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 18, padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#4F46E5', fontWeight: 800, marginBottom: 14 }}>
          <Sparkles size={18} />
          AI HR Workforce Intelligence & Skill Gap Analysis
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: 14 }}>
          <div style={{ background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: 12, padding: 14 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#F59E0B' }}>⚡ Overtime & Workload Risk</span>
            <p style={{ fontSize: 12, color: '#4B5563', margin: '6px 0 0 0', lineHeight: 1.5 }}>
              Senior SysAdmin logged 18 hours overtime in last 14 days. Rebalance task allocation to prevent burnout.
            </p>
          </div>
          <div style={{ background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: 12, padding: 14 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#059669' }}>🟢 High Performance Spotlight</span>
            <p style={{ fontSize: 12, color: '#4B5563', margin: '6px 0 0 0', lineHeight: 1.5 }}>
              Mathematics Department achieved 96.2% student pass rate. Recommended for annual faculty recognition.
            </p>
          </div>
          <div style={{ background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: 12, padding: 14 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#6366F1' }}>🎓 Recommended Workshop</span>
            <p style={{ fontSize: 12, color: '#4B5563', margin: '6px 0 0 0', lineHeight: 1.5 }}>
              AI Tools for Smart Classrooms recommended for 12 Academic Teachers in Q3 development cycle.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
