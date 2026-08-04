import React from 'react';
import { Sparkles, TrendingUp, AlertTriangle, ShieldCheck, DollarSign } from 'lucide-react';
import { KPICard } from '../../../components/erp/KPICard';

export default function FinanceIntelligenceModule() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', fontFamily: "'Inter', sans-serif" }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: 14 }}>
        <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', borderRadius: 16, padding: 18, color: 'white' }}>
          <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.9 }}>AI FINANCIAL HEALTH SCORE</span>
          <div style={{ fontSize: 32, fontWeight: 800, marginTop: 8 }}>94 <span style={{ fontSize: 14, opacity: 0.8 }}>/ 100</span></div>
          <span style={{ fontSize: 11, opacity: 0.9, marginTop: 4, display: 'block' }}>Optimal Fiscal Stability</span>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', borderRadius: 16, padding: 18, color: 'white' }}>
          <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.9 }}>CASH FLOW FORECAST</span>
          <div style={{ fontSize: 24, fontWeight: 800, marginTop: 8 }}>+₹14.2 L</div>
          <span style={{ fontSize: 11, opacity: 0.9, marginTop: 4, display: 'block' }}>Next 30 Days Surplus</span>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)', borderRadius: 16, padding: 18, color: 'white' }}>
          <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.9 }}>REVENUE PREDICTION</span>
          <div style={{ fontSize: 24, fontWeight: 800, marginTop: 8 }}>96.8% Target</div>
          <span style={{ fontSize: 11, opacity: 0.9, marginTop: 4, display: 'block' }}>ML Model Confidence: High</span>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)', borderRadius: 16, padding: 18, color: 'white' }}>
          <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.9 }}>EXPENSE ANOMALIES</span>
          <div style={{ fontSize: 24, fontWeight: 800, marginTop: 8 }}>0 Anomalies</div>
          <span style={{ fontSize: 11, opacity: 0.9, marginTop: 4, display: 'block' }}>All Vouchers Audit Verified</span>
        </div>
      </div>

      <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 18, padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#3B82F6', fontWeight: 800, marginBottom: 14 }}>
          <Sparkles size={18} />
          Executive Financial Intelligence & AI Cost Optimization
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: 14 }}>
          <div style={{ background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: 12, padding: 14 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#D97706' }}>⚡ Fee Collection Prediction</span>
            <p style={{ fontSize: 12, color: '#4B5563', margin: '6px 0 0 0', lineHeight: 1.5 }}>
              Predictive models indicate 96.8% of outstanding Grade 10 fees (₹8.4L) will be received before final term exams.
            </p>
          </div>
          <div style={{ background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: 12, padding: 14 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#059669' }}>🟢 Cost Optimization Suggestion</span>
            <p style={{ fontSize: 12, color: '#4B5563', margin: '6px 0 0 0', lineHeight: 1.5 }}>
              Consolidating campus telecom and internet lease lines with a single provider saves ₹42,000 annually.
            </p>
          </div>
          <div style={{ background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: 12, padding: 14 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#6366F1' }}>🎓 GST Input Tax Credit (ITC)</span>
            <p style={{ fontSize: 12, color: '#4B5563', margin: '6px 0 0 0', lineHeight: 1.5 }}>
              ₹34,500 ITC available for claim on recent lab hardware and computer server purchases.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
