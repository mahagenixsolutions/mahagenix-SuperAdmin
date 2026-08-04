import type { RoleDashboardConfig } from './types';

export const academicCoordinatorDashboard: RoleDashboardConfig = {
  roleLabel: 'Academic Coordinator',
  roleColor: '#0EA5E9',
  greeting: "Here is your academic operations overview.",
  stats: [
    { label: 'Today\'s Classes', value: 142, icon: '🎓', color: 'primary', change: '4 require cover', changeDir: 'neutral' },
    { label: 'Syllabus Progress', value: '68%', icon: '📈', color: 'success', change: '+2.5% this week', changeDir: 'up' },
    { label: 'Pending Lesson Plans', value: 12, icon: '📝', color: 'warning', change: '8 need approval', changeDir: 'down' },
    { label: 'Student Attendance', value: '92.4%', icon: '📋', color: 'info', change: 'On track', changeDir: 'up' },
    { label: 'Teacher Attendance', value: '96.5%', icon: '👩‍🏫', color: 'success', change: '3 on leave', changeDir: 'neutral' },
    { label: 'Upcoming Exams', value: 3, icon: '⏳', color: 'violet', change: 'Next in 2 days', changeDir: 'neutral' },
  ],
  quickActions: [
    { label: 'Review Lesson Plans', icon: '✅', to: '/academic/lesson-plans', color: '#0EA5E9' },
    { label: 'Schedule Exam', icon: '📝', to: '/exams', color: '#10B981' },
    { label: 'Teacher Allocation', icon: '👩‍🏫', to: '/teachers', color: '#4F46E5' },
    { label: 'Syllabus Tracker', icon: '📊', to: '/academic', color: '#F59E0B' },
  ],
  activities: [
    { id: 'ac1', text: 'Mr. Sharma submitted Class 10 Science Lesson Plan', time: '10 min ago', icon: '📝', type: 'info' },
    { id: 'ac2', text: 'Mid-term examination schedule published', time: '1 hour ago', icon: '📅', type: 'success' },
    { id: 'ac3', text: 'Class 8B Mathematics syllabus is 5% behind schedule', time: '2 hours ago', icon: '⚠️', type: 'warning' },
    { id: 'ac4', text: 'Ms. Gupta requested substitute teacher for tomorrow', time: '3 hours ago', icon: '👩‍🏫', type: 'warning' },
    { id: 'ac5', text: 'Principal approved the updated Academic Calendar', time: '5 hours ago', icon: '✅', type: 'success' },
  ],
  widgets: [
    {
      id: 'curriculum-progress', title: 'Curriculum Progress by Grade', type: 'list',
      items: [
        { label: 'Grade 10', value: '75%', status: 'success' },
        { label: 'Grade 12', value: '72%', status: 'success' },
        { label: 'Grade 8', value: '60%', status: 'warning' },
        { label: 'Grade 9', value: '62%', status: 'neutral' },
      ],
    },
    {
      id: 'classroom-observations', title: 'Pending Academic Audits', type: 'list',
      items: [
        { label: 'Grade 10 Science', value: 'Mr. Sharma', status: 'warning' },
        { label: 'Grade 12 Math', value: 'Ms. Gupta', status: 'warning' },
        { label: 'Grade 8 English', value: 'Mrs. Rao', status: 'info' },
      ],
    },
  ],
};
