function LoansApp({ onBack }) {
  return (
    <div className="app-container">
      <nav className="sidebar">
        <div className="sidebar-logo" onClick={onBack} style={{ cursor: 'pointer' }}>
          <span className="logo-icon">💠</span>
          <span className="logo-text">Suite Portal</span>
        </div>
        <div className="sidebar-app-name">
           <span className="logo-icon">💰</span>
           <span className="logo-text">Préstamos</span>
        </div>
        <ul className="nav-links">
          <li className="active"><span className="nav-icon">📈</span> <span className="nav-text">Cartera</span></li>
          <li><span className="nav-icon">📅</span> <span className="nav-text">Pagos</span></li>
          <li><span className="nav-icon">⚖️</span> <span className="nav-text">Riesgo</span></li>
          <li><span className="nav-icon">📁</span> <span className="nav-text">Historial</span></li>
        </ul>
      </nav>
      <main className="main-content">
        <header className="view-header">
          <h1>Sistema de Préstamos</h1>
          <p>Visibilidad total sobre tus activos y retornos.</p>
        </header>
        <div className="empty-msg">
          <div style={{ fontSize: '5rem', marginBottom: '1.5rem', filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.4))' }}>🏛️</div>
          <h2 style={{ color: '#fff', fontSize: '2rem' }}>Módulo en Construcción</h2>
          <p style={{ fontSize: '1.1rem' }}>Implementando algoritmos de amortización y cobranzas.</p>
        </div>
      </main>
    </div>
  )
}
export default LoansApp
