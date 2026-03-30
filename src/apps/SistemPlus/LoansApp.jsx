function LoansApp({ onBack }) {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-logo" onClick={onBack} style={{ cursor: 'pointer' }}>
          <span className="material-icons" style={{ color: 'var(--primary)' }}>account_balance</span>
          <span className="logo-text">Suite Préstamos</span>
        </div>
        <div className="sidebar-app-name">
          <span className="material-icons">payments</span>
          <span>Créditos</span>
        </div>
        <nav className="nav-links">
          <li className="active">
            <span className="material-icons nav-icon">group</span>
            <span className="nav-text">Clientes</span>
          </li>
          <li>
            <span className="material-icons nav-icon">history_edu</span>
            <span className="nav-text">Pagos</span>
          </li>
          <li onClick={onBack}>
            <span className="material-icons nav-icon">arrow_back</span>
            <span className="nav-text">Portal</span>
          </li>
        </nav>
      </aside>

      <main className="main-content">
        <header className="view-header">
          <h1>Control de Préstamos</h1>
          <p>Gestión eficiente de carteras y cronogramas de pago.</p>
        </header>
        <div className="portal-card" style={{ padding: '5rem', textAlign: 'center', cursor: 'default' }}>
          <span className="material-icons" style={{ fontSize: '8rem', color: 'var(--border-main)', marginBottom: '2rem' }}>monetization_on</span>
          <h2>Módulo en Desarrollo</h2>
          <p>Próximamente: Calculadora de intereses y reportes de mora.</p>
        </div>
      </main>
    </div>
  )
}
export default LoansApp;
