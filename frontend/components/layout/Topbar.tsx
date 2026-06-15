'use client';

import { usePathname } from 'next/navigation';

const titles: Record<string, string> = {
  '/': 'Tableau de bord',
  '/students': 'Élèves',
  '/classes': 'Classes',
  '/categories': 'Catégories',
  '/subjects': 'Matières',
  '/enrollments': 'Inscriptions',
  '/school-years': 'Années scolaires',
};

export default function Topbar() {
  const pathname = usePathname();
  const title = titles[pathname] ?? 'SmartSchool';

  return (
    <header
      style={{
        height: 60,
        background: 'var(--bg-base)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(8px)',
      }}
    >
      <h1 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>
        {title}
      </h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'var(--accent-blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: 13,
            color: '#fff',
          }}
        >
          A
        </div>
      </div>
    </header>
  );
}