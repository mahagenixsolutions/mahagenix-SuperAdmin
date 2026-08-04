import { useState, useEffect } from 'react';
import BusTrackingDrawer from './BusTrackingDrawer';

interface BusTrackingFABProps {
  role: 'PARENT' | 'ADMIN';
}

export default function BusTrackingFAB({ role }: BusTrackingFABProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener('open-bus-tracker', handleOpen);
    return () => window.removeEventListener('open-bus-tracker', handleOpen);
  }, []);

  // Floating transport button completely removed per user request
  return (
    <>
      {open && (
        <BusTrackingDrawer 
          open={open} 
          onClose={() => setOpen(false)} 
          role={role}
        />
      )}
    </>
  );
}
