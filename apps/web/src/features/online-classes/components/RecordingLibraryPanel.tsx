import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ClassRecording } from '../types';
import { 
  Video, 
  Play, 
  Share2, 
  Download, 
  Archive, 
  Eye, 
  Clock, 
  HardDrive, 
  CheckCircle2,
  Lock,
  Globe,
  X
} from 'lucide-react';

interface RecordingLibraryPanelProps {
  recordings: ClassRecording[];
  onShare: (rec: ClassRecording) => void;
  onDownload: (rec: ClassRecording) => void;
  onArchive: (id: string) => void;
}

export const RecordingLibraryPanel: React.FC<RecordingLibraryPanelProps> = ({
  recordings,
  onShare,
  onDownload,
  onArchive
}) => {
  const [previewVideo, setPreviewVideo] = useState<ClassRecording | null>(null);

  const getPublishBadge = (status: ClassRecording['publishStatus']) => {
    switch (status) {
      case 'Published':
        return { bg: '#ECFDF5', color: '#047857', border: '#A7F3D0', icon: <Globe size={11} /> };
      case 'Private':
        return { bg: '#FEF2F2', color: '#DC2626', border: '#FCA5A5', icon: <Lock size={11} /> };
      case 'Pending Review':
        return { bg: '#FEF3C7', color: '#B45309', border: '#FDE68A', icon: <Clock size={11} /> };
    }
  };

  return (
    <div style={{
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.03)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        paddingBottom: '16px',
        borderBottom: '1px solid #F1F5F9'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: '#CFFAFE',
            color: '#0891B2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Video size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Institutional Cloud Recording Library
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Automated video archiving, cloud storage quotas, LMS distribution, and supervisory content preview.
            </p>
          </div>
        </div>

        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0891B2', background: '#CFFAFE', padding: '6px 14px', borderRadius: '20px' }}>
          1.72 GB Used today (Cloud Sync)
        </div>
      </div>

      {/* Grid of Recordings */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        {recordings.map((rec) => {
          const publishBadge = getPublishBadge(rec.publishStatus);

          return (
            <motion.div
              key={rec.id}
              whileHover={{ y: -2 }}
              style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px'
              }}
            >
              {/* Top Row: Thumbnail Placeholder / Video Preview */}
              <div style={{
                position: 'relative',
                height: '130px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                overflow: 'hidden'
              }}>
                <div style={{ textAlign: 'center', padding: '12px' }}>
                  <Play size={32} style={{ opacity: 0.9, color: '#5FAF88' }} />
                  <div style={{ fontSize: '12px', fontWeight: 700, marginTop: '6px' }}>{rec.subject}</div>
                  <div style={{ fontSize: '10px', opacity: 0.7 }}>{rec.duration} • {rec.fileSize}</div>
                </div>

                <button
                  onClick={() => setPreviewVideo(rec)}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  title="Click to preview video"
                />

                {/* Publish Badge on top right */}
                <span style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: publishBadge.bg,
                  color: publishBadge.color,
                  border: `1px solid ${publishBadge.border}`,
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '10px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  {publishBadge.icon} {rec.publishStatus}
                </span>
              </div>

              {/* Details */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
                    {rec.topic}
                  </h4>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', fontSize: '12px', color: '#64748B' }}>
                  <span>{rec.teacherName}</span>
                  <span style={{ fontWeight: 700, color: '#3B7E5E' }}>{rec.gradeSection}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', fontSize: '11px', color: '#94A3B8' }}>
                  <span>{rec.date}</span>
                  <span>{rec.views} Views</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '6px' }}>
                <button
                  onClick={() => setPreviewVideo(rec)}
                  style={{
                    background: 'white',
                    border: '1px solid #CBD5E1',
                    borderRadius: '6px',
                    padding: '6px',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '3px'
                  }}
                >
                  <Eye size={12} /> Preview
                </button>

                <button
                  onClick={() => onShare(rec)}
                  style={{
                    background: 'white',
                    border: '1px solid #CBD5E1',
                    borderRadius: '6px',
                    padding: '6px',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '3px'
                  }}
                >
                  <Share2 size={12} /> Share
                </button>

                <button
                  onClick={() => onDownload(rec)}
                  style={{
                    background: 'white',
                    border: '1px solid #CBD5E1',
                    borderRadius: '6px',
                    padding: '6px',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '3px'
                  }}
                >
                  <Download size={12} /> Save
                </button>

                <button
                  onClick={() => onArchive(rec.id)}
                  style={{
                    background: '#FEF2F2',
                    color: '#EF4444',
                    border: '1px solid #FCA5A5',
                    borderRadius: '6px',
                    padding: '6px',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '3px'
                  }}
                >
                  <Archive size={12} /> Archive
                </button>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* Video Preview Modal */}
      <AnimatePresence>
        {previewVideo && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{
                background: 'white',
                borderRadius: '16px',
                maxWidth: '680px',
                width: '100%',
                overflow: 'hidden',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
              }}
            >
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                    Recording Preview: {previewVideo.subject}
                  </h3>
                  <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748B' }}>
                    {previewVideo.topic} ({previewVideo.gradeSection})
                  </p>
                </div>
                <button
                  onClick={() => setPreviewVideo(null)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}
                >
                  <X size={20} />
                </button>
              </div>

              <div style={{ padding: '20px', background: '#0F172A', color: 'white', textAlign: 'center' }}>
                {previewVideo.videoUrl ? (
                  <video controls src={previewVideo.videoUrl} style={{ width: '100%', borderRadius: '8px', maxHeight: '360px' }} />
                ) : (
                  <div style={{ padding: '40px' }}>Video currently processing in cloud pipeline...</div>
                )}
              </div>

              <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  onClick={() => setPreviewVideo(null)}
                  style={{
                    background: '#3B7E5E',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
