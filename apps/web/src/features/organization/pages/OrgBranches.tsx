import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Plus, Search, School, MapPin } from 'lucide-react';
import { orgMocks } from '../../../mock/organization/orgMocks';

export default function OrgBranches() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [branches, setBranches] = useState(orgMocks.branches);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (!query.trim()) {
      setBranches(orgMocks.branches);
    } else {
      const filtered = orgMocks.branches.filter((b) =>
        b.name.toLowerCase().includes(query.toLowerCase()) ||
        b.location.toLowerCase().includes(query.toLowerCase())
      );
      setBranches(filtered);
    }
  };

  const handleCreateBranch = () => {
    const name = prompt('Enter new branch name:');
    if (!name) return;
    const location = prompt('Enter branch location:');
    if (!location) return;

    const newBranch = {
      id: `branch-${name.toLowerCase().replace(/\s+/g, '-')}`,
      name: `${name} Branch`,
      logo: '🏫',
      principal: 'To Be Appointed',
      location: location || 'Karnataka',
      students: 0,
      teachers: 0,
      nonTeaching: 0,
      parents: 0,
      attendance: '0%',
      revenue: '₹0',
      expenses: '₹0',
      performanceScore: 'N/A',
      status: 'Active' as const,
      recentActivities: ['Branch initialized.'],
      announcements: ['Welcome to the new branch portal.'],
    };

    setBranches([...branches, newBranch]);
    alert('Branch created successfully!');
  };

  return (
    <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Building2 size={24} /> School Branches Overview
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: 4 }}>
            Manage and view academic & financial performance profiles of all group branches.
          </p>
        </div>
        <button
          onClick={handleCreateBranch}
          className="btn btn-primary"
          style={{ padding: '10px 20px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <Plus size={16} /> Create Branch
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)', padding: '16px 20px', display: 'flex', gap: 16, alignItems: 'center',
      }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            type="search"
            value={searchQuery}
            onChange={handleSearch}
            className="form-input"
            placeholder="Search branches by name or location..."
            style={{ width: '100%', height: 38, paddingLeft: 36, fontSize: 13 }}
          />
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
            <Search size={14} />
          </span>
        </div>
      </div>

      {/* Branch Cards Grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px',
      }}>
        {branches.map((branch) => (
          <div
            key={branch.id}
            className="dashboard-card"
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', flexShrink: 0 }}>
                <School size={20} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  {branch.name}
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <MapPin size={11} /> {branch.location} · <span style={{ color: 'var(--accent-success)', fontWeight: 600 }}>{branch.status}</span>
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Principal: </span>
                <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{branch.principal}</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Students: </span>
                <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{branch.students}</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Staff: </span>
                <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{branch.teachers + branch.nonTeaching}</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Attendance: </span>
                <span style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>{branch.attendance}</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Revenue: </span>
                <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{branch.revenue}</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Score: </span>
                <span style={{ fontWeight: 600, color: 'var(--accent-violet)' }}>{branch.performanceScore}</span>
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => navigate(`/org/branches/${branch.id}`)}
              style={{ width: '100%', padding: '10px 0', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
