function SchoolApp({ onBack }) {
  return (
    <div className="app-container">
      <nav className="sidebar">
        <div className="sidebar-logo" onClick={onBack} style={{ cursor: 'pointer' }}>
          <span className="logo-icon">💠</span>
          <span className="logo-text">Suite Portal</span>
        </div>
        <div className="sidebar-app-name">
           <span className="logo-icon">🎓</span>
           <span className="logo-text">Escuela</span>
        </div>
        <ul className="nav-links">
          <li className="active"><span className="nav-icon">🧑‍🎓</span> <span className="nav-text">Estudiantes</span></li>
          <li><span className="nav-icon">📚</span> <span className="nav-text">Académico</span></li>
          <li><span className="nav-icon">🏫</span> <span className="nav-text">Docentes</span></li>
          <li><span className="nav-icon">💳</span> <span className="nav-text">Pagos</span></li>
        </ul>
      </nav>
      <main className="main-content">
        <header className="view-header">
          <h1>Gestión Académica</h1>
          <p>Administración eficiente del ciclo escolar.</p>
        </header>
        <div className="empty-msg">
          <div style={{ fontSize: '5rem', marginBottom: '1.5rem', filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.4))' }}>📖</div>
          <h2 style={{ color: '#fff', fontSize: '2rem' }}>Módulo en Construcción</h2>
          <p style={{ fontSize: '1.1rem' }}>Desarrollando los módulos de inscripción y evaluación horaria.</p>
        </div>
      </main>
    </div>
  )
}
export default SchoolApp
