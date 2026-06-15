'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    label: 'Vue générale',
    href: '/',
    icon: '⊞',
    color: '#4F6EF7',
  },
  {
    label: 'Élèves',
    href: '/students',
    icon: '👤',
    color: '#4F6EF7',
  },
  {
    label: 'Classes',
    href: '/classes',
    icon: '🏫',
    color: '#A78BFA',
  },
  {
    label: 'Catégories',
    href: '/categories',
    icon: '🏷️',
    color: '#A78BFA',
  },
  {
    label: 'Matières',
    href: '/subjects',
    icon: '📚',
    color: '#FB923C',
  },
  {
    label: 'Inscriptions',
    href: '/enrollments',
    icon: '🔗',
    color: '#22C55E',
  },
  {
    label: 'Années scolaires',
    href: '/school-years',
    icon: '📅',
    color: '#F87171',
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: 240,
        minHeight: '100vh',
        background: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 100,
        padding: '24px 0',
      }}
    >
      {/* Logo */}
      <div style={{ padding: '0 20px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'var(--accent-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: 14,
              color: '#fff',
            }}
          >
            S
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)' }}>
            SmartSchool
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 12px',
                borderRadius: 8,
                background: isActive ? 'rgba(79,110,247,0.15)' : 'transparent',
                color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
                fontWeight: isActive ? 600 : 400,
                fontSize: 13.5,
                transition: 'all 0.15s',
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  background: isActive ? 'rgba(79,110,247,0.2)' : 'rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 15,
                }}
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: '16px 20px 0',
          borderTop: '1px solid var(--border)',
          marginTop: 8,
        }}
      >
        <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>SmartSchool v1.0</p>
      </div>
    </aside>
  );
}