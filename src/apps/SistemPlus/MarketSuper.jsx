function MarketSuper({ onBack }) {
  return (
    <div className="app-container">
      <nav className="sidebar">
        <div className="sidebar-logo" onClick={onBack} style={{ cursor: 'pointer' }}>
          <span className="logo-icon">💠</span>
          <span className="logo-text">Suite Portal</span>
        </div>
        <div className="sidebar-app-name">
           <span className="logo-icon">🛒</span>
           <span className="logo-text">Supermarket</span>
        </div>
        <ul className="nav-links">
          <li className="active"><span className="nav-icon">🍎</span> <span className="nav-text">Secciones</span></li>
          <li><span className="nav-icon">🥫</span> <span className="nav-text">Almacén</span></li>
          <li><span className="nav-icon">🧾</span> <span className="nav-text">Cajas</span></li>
          <li><span className="nav-icon">📊</span> <span className="nav-text">Reportes</span></li>
        </ul>
      </nav>
      <main className="main-content">
        <header className="view-header">
          <h1>Gestión de Supermercado</h1>
          <p>Control inteligente de abastecimiento y ventas directas.</p>
        </header>
        <div className="empty-msg">
          <div style={{ fontSize: '5rem', marginBottom: '1.5rem', filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.4))' }}>🏪</div>
          <h2 style={{ color: '#fff', fontSize: '2rem' }}>Módulo en Construcción</h2>
          <p style={{ fontSize: '1.1rem' }}>Preparando el motor de búsqueda y escaneo de productos.</p>
        </div>
      </main>
    </div>
  )
}
export default MarketSuper
