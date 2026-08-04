import React from 'react';
import { mockReadingPrograms } from '../shared/mockLibraryData';
import { Award, BookOpen, Trophy, Users, Star } from 'lucide-react';

export default function ReadingProgramsModule() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Student Reading Challenges & Programs</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Promote literacy goals, track student reading badges, and celebrate top readers.</p>
        </div>
        <button style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#10B981', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
          + Launch New Reading Challenge
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {mockReadingPrograms.map(prg => (
          <div key={prg.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, padding: '3px 8px', borderRadius: '12px', background: '#DCFCE7', color: '#166534' }}>{prg.status}</span>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Goal: {prg.goalBooksCount} Books</span>
            </div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{prg.title}</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>Audience: {prg.targetAudience} • {prg.startDate} to {prg.endDate}</p>
            
            <div style={{ borderTop: '1px dashed var(--border-subtle)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
              <span><Users size={14} style={{ display: 'inline', marginRight: '4px' }} /> {prg.participantsCount} Students</span>
              <span style={{ fontWeight: 800, color: '#4F46E5' }}>🏆 {prg.topReader}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
