function MarketSuper({ onBack }) {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-logo" onClick={onBack} style={{ cursor: 'pointer' }}>
          <span className="material-icons" style={{ color: 'var(--primary)' }}>shopping_basket</span>
          <span className="logo-text">Market Super</span>
        </div>
        <div className="sidebar-app-name">
          <span className="material-icons">storefront</span>
          <span>Gestión Super</span>
        </div>
        <nav className="nav-links">
          <li className="active">
            <span className="material-icons nav-icon">inventory_2</span>
            <span className="nav-text">Productos</span>
          </li>
          <li>
            <span className="material-icons nav-icon">receipt_long</span>
            <span className="nav-text">Ventas</span>
          </li>
          <li onClick={onBack}>
            <span className="material-icons nav-icon">arrow_back</span>
            <span className="nav-text">Portal</span>
          </li>
        </nav>
      </aside>

      <main className="main-content">
        <header className="view-header">
          <h1>Gestión de Supermercado</h1>
          <p>Control inteligente de abastecimiento y retail.</p>
        </header>
        <div className="portal-card" style={{ padding: '5rem', textAlign: 'center', cursor: 'default' }}>
          <span className="material-icons" style={{ fontSize: '8rem', color: 'var(--border-main)', marginBottom: '2rem' }}>construction</span>
          <h2>Módulo en Desarrollo</h2>
          <p>Estamos adaptando las herramientas de inventario al nuevo sistema Stitch.</p>
        </div>
      </main>
    </div>
  )
}
export default MarketSuper;
