import { useState } from 'react'
import VisitaTrack from './apps/Iglesia/VisitaTrack'
import MarketTech from './apps/SistemPlus/MarketTech'
import MarketSuper from './apps/SistemPlus/MarketSuper'
import LoansApp from './apps/SistemPlus/LoansApp'
import SchoolApp from './apps/SistemPlus/SchoolApp'
import './index.css'

function App() {
  const [activeApp, setActiveApp] = useState('portal')

  const renderApp = () => {
    switch (activeApp) {
      case 'iglesia': return <VisitaTrack onBack={() => setActiveApp('portal')} />
      case 'tech': return <MarketTech onBack={() => setActiveApp('portal')} />
      case 'tech-public': return <MarketTech onBack={() => setActiveApp('portal')} isPublic={true} />
      case 'super': return <MarketSuper onBack={() => setActiveApp('portal')} />
      case 'loans': return <LoansApp onBack={() => setActiveApp('portal')} />
      case 'school': return <SchoolApp onBack={() => setActiveApp('portal')} />
      default: return renderPortal()
    }
  }

  const renderPortal = () => (
    <div className="portal-container">
      <header className="portal-header">
        <h1>Sistem Plus Suite</h1>
        <p>Selecciona un ambiente de trabajo para comenzar</p>
      </header>

      <div className="portal-grid">
        <section className="portal-section">
          <h2>Ambiente Iglesia</h2>
          <div className="portal-card iglesia" onClick={() => setActiveApp('iglesia')}>
            <div className="card-icon">⛪</div>
            <div className="card-content">
              <h3>VisitaTrack Iglesia</h3>
              <p>Gestión de visitantes, asistencia y seguimiento de campañas.</p>
              <span className="card-badge">Activo</span>
            </div>
          </div>
        </section>

        <section className="portal-section">
          <h2>Ambiente Sistem Plus</h2>
          <div className="sub-grid">
            <div className="portal-card tech" onClick={() => setActiveApp('tech')}>
              <div className="card-icon">🔐</div>
              <div className="card-content">
                <h3>Market Tech (Admin)</h3>
                <p>Gestión de inventario y modelos.</p>
              </div>
            </div>
            <div className="portal-card tech public" onClick={() => setActiveApp('tech-public')}>
              <div className="card-icon">📱</div>
              <div className="card-content">
                <h3>Catálogo Público</h3>
                <p>Vista para clientes.</p>
              </div>
            </div>
            <div className="portal-card market" onClick={() => setActiveApp('super')}>
              <div className="card-icon">🛒</div>
              <div className="card-content">
                <h3>Supermarket</h3>
                <p>Gestión de insumos.</p>
              </div>
            </div>
            <div className="portal-card loans" onClick={() => setActiveApp('loans')}>
              <div className="card-icon">💰</div>
              <div className="card-content">
                <h3>Péstamos</h3>
                <p>Control financiero.</p>
              </div>
            </div>
            <div className="portal-card school" onClick={() => setActiveApp('school')}>
              <div className="card-icon">🎓</div>
              <div className="card-content">
                <h3>Escuela</h3>
                <p>Registro escolar.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <footer className="portal-footer">
        <p>Antigravity Multi-App Environment &copy; 2026</p>
      </footer>
    </div>
  )

  return (
    <div className="root-layout">
      {renderApp()}
    </div>
  )
}

export default App
