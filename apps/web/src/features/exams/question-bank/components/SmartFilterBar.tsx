import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';

interface SmartFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedSubject: string;
  onSubjectChange: (s: string) => void;
  selectedGrade: string;
  onGradeChange: (g: string) => void;
  selectedType: string;
  onTypeChange: (t: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (d: string) => void;
  selectedBlooms: string;
  onBloomsChange: (b: string) => void;
  selectedStatus: string;
  onStatusChange: (st: string) => void;
  onResetFilters: () => void;
}

export const SmartFilterBar: React.FC<SmartFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedSubject,
  onSubjectChange,
  selectedGrade,
  onGradeChange,
  selectedType,
  onTypeChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedBlooms,
  onBloomsChange,
  selectedStatus,
  onStatusChange,
  onResetFilters
}) => {
  return (
    <div style={{
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '14px',
      padding: '16px 20px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      {/* Top Search Input */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: 11, color: '#94A3B8' }} />
          <input
            type="text"
            placeholder="Search questions by keyword, topic, formula, or author..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 38px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontSize: '13px',
              outline: 'none',
              transition: 'border-color 0.15s'
            }}
          />
        </div>

        <button
          onClick={onResetFilters}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: '#F8FAFC',
            color: '#475569',
            border: '1px solid #CBD5E1',
            padding: '9px 14px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <RotateCcw size={13} /> Reset Filters
        </button>
      </div>

      {/* Dropdown Filters Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '10px'
      }}>
        {/* Subject */}
        <select
          value={selectedSubject}
          onChange={(e) => onSubjectChange(e.target.value)}
          style={{ padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px', fontWeight: 600 }}
        >
          <option value="All">All Subjects</option>
          <option value="Physics">Physics</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Biology">Biology</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Social Studies">Social Studies</option>
        </select>

        {/* Grade */}
        <select
          value={selectedGrade}
          onChange={(e) => onGradeChange(e.target.value)}
          style={{ padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px', fontWeight: 600 }}
        >
          <option value="All">All Grades</option>
          <option value="Grade 8">Grade 8</option>
          <option value="Grade 9">Grade 9</option>
          <option value="Grade 10">Grade 10</option>
          <option value="Grade 11">Grade 11</option>
          <option value="Grade 12">Grade 12</option>
        </select>

        {/* Question Type */}
        <select
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
          style={{ padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px', fontWeight: 600 }}
        >
          <option value="All">All Types</option>
          <option value="MCQ">MCQ</option>
          <option value="Descriptive">Descriptive</option>
          <option value="Coding">Coding</option>
          <option value="Case Study">Case Study</option>
          <option value="Diagram">Diagram</option>
        </select>

        {/* Difficulty */}
        <select
          value={selectedDifficulty}
          onChange={(e) => onDifficultyChange(e.target.value)}
          style={{ padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px', fontWeight: 600 }}
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
          <option value="HOTS">HOTS</option>
        </select>

        {/* Bloom's Taxonomy */}
        <select
          value={selectedBlooms}
          onChange={(e) => onBloomsChange(e.target.value)}
          style={{ padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px', fontWeight: 600 }}
        >
          <option value="All">Bloom's Level</option>
          <option value="Remembering">Remembering</option>
          <option value="Understanding">Understanding</option>
          <option value="Applying">Applying</option>
          <option value="Analyzing">Analyzing</option>
          <option value="Evaluating">Evaluating</option>
          <option value="Creating">Creating</option>
        </select>

        {/* Approval Status */}
        <select
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          style={{ padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px', fontWeight: 600 }}
        >
          <option value="All">All Statuses</option>
          <option value="Approved">Approved</option>
          <option value="Under Review">Under Review</option>
          <option value="Submitted">Submitted</option>
          <option value="Draft">Draft</option>
        </select>
      </div>
    </div>
  );
};
