function SchoolApp({ onBack }) {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-logo" onClick={onBack} style={{ cursor: 'pointer' }}>
          <span className="material-icons" style={{ color: 'var(--primary)' }}>school</span>
          <span className="logo-text">Registro Escolar</span>
        </div>
        <div className="sidebar-app-name">
          <span className="material-icons">history_edu</span>
          <span>Académico</span>
        </div>
        <nav className="nav-links">
          <li className="active">
            <span className="material-icons nav-icon">groups_2</span>
            <span className="nav-text">Estudiantes</span>
          </li>
          <li>
            <span className="material-icons nav-icon">auto_stories</span>
            <span className="nav-text">Materias</span>
          </li>
          <li onClick={onBack}>
            <span className="material-icons nav-icon">arrow_back</span>
            <span className="nav-text">Portal</span>
          </li>
        </nav>
      </aside>

      <main className="main-content">
        <header className="view-header">
          <h1>Gestión Académica</h1>
          <p>Control centralizado de notas, asistencia y matrículas.</p>
        </header>
        <div className="portal-card" style={{ padding: '5rem', textAlign: 'center', cursor: 'default' }}>
          <span className="material-icons" style={{ fontSize: '8rem', color: 'var(--border-main)', marginBottom: '2rem' }}>draw</span>
          <h2>Módulo en Desarrollo</h2>
          <p>Próximamente: Registro de calificaciones y boletines electrónicos.</p>
        </div>
      </main>
    </div>
  )
}
export default SchoolApp;
