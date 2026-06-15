import Link from "next/link"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={styles.container}>
      
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={styles.logo}>
          🏫 SmartSchool
        </div>

        <nav style={styles.nav}>
          <Link style={styles.link} href="/dashboard">
            📊 Dashboard
          </Link>

          <Link style={styles.link} href="/students">
            👨‍🎓 Students
          </Link>

          <Link style={styles.link} href="/classes">
            🏫 Classes
          </Link>

          <Link style={styles.link} href="/categories">
            🏷️ Categories
          </Link>

          <Link style={styles.link} href="/subjects">
            📚 Subjects
          </Link>

          <Link style={styles.link} href="/enrollments">
            🔗 Enrollments
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main style={styles.main}>
        {children}
      </main>

    </div>
  )
}

/* SIMPLE SAAS STYLES */
const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Arial",
  },

  sidebar: {
    width: "260px",
    background: "#0f172a", // dark SaaS style
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },

  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "30px",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  link: {
    color: "white",
    textDecoration: "none",
    padding: "10px",
    borderRadius: "8px",
    background: "rgba(255,255,255,0.05)",
  },

  main: {
    flex: 1,
    padding: "30px",
    background: "#aac8e1",
    color: "#0f172a",
  },
}