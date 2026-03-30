import { useState } from 'react'
import VisitaTrack from './apps/Iglesia/VisitaTrack'
import MarketTech from './apps/SistemPlus/MarketTech'
import MarketSuper from './apps/SistemPlus/MarketSuper'
import LoansApp from './apps/SistemPlus/LoansApp'
import SchoolApp from './apps/SistemPlus/SchoolApp'
import Login from './components/Login'
import './index.css'

function App() {
  const [activeApp, setActiveApp] = useState('portal')
  const [user, setUser] = useState(null)

  const apps = [
    { id: 'iglesia', section: 'Ambiente Iglesia', name: 'VisitaTrack Iglesia', desc: 'Gestión de visitantes y asistencia.', icon: 'church', badge: 'Activo' },
    { id: 'tech', section: 'Ambiente Sistem Plus', name: 'Market Tech (Admin)', desc: 'Inventario y registro de dispositivos.', icon: 'devices' },
    { id: 'tech-public', section: 'Ambiente Sistem Plus', name: 'Catálogo Público', desc: 'Vista para clientes y ventas.', icon: 'shopping_bag' },
    { id: 'market', section: 'Ambiente Sistem Plus', name: 'Market Super', desc: 'Gestión de supermercados.', icon: 'shopping_cart' },
    { id: 'loans', section: 'Ambiente Sistem Plus', name: 'Préstamos', desc: 'Control de créditos y pagos.', icon: 'payments' },
    { id: 'school', section: 'Ambiente Sistem Plus', name: 'Registro Escolar', desc: 'Control de notas y estudiantes.', icon: 'school' },
  ];

  const renderApp = () => {
    switch (activeApp) {
      case 'iglesia': return <VisitaTrack onBack={() => setActiveApp('portal')} />;
      case 'tech': return <MarketTech onBack={() => setActiveApp('portal')} isPublic={false} isAdmin={user?.isAdmin} />;
      case 'tech-public': return <MarketTech onBack={() => setActiveApp('portal')} isPublic={true} isAdmin={user?.isAdmin} />;
      case 'market': return <MarketSuper onBack={() => setActiveApp('portal')} />;
      case 'loans': return <LoansApp onBack={() => setActiveApp('portal')} />;
      case 'school': return <SchoolApp onBack={() => setActiveApp('portal')} />;
      default: return (
        <div className="portal-container">
          <header className="portal-header">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
                <h1>Sistem Plus Suite</h1>
                <p>Selecciona un ambiente de trabajo para comenzar</p>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <span className="user-email" style={{color: 'var(--text-muted)'}}>{user.email} {user.isAdmin ? '(Admin)' : ''}</span>
                <button 
                  onClick={() => setUser(null)}
                  style={{background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-main)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'}}
                >
                  <span className="material-icons" style={{fontSize: '1.2rem'}}>logout</span>
                  Salir
                </button>
              </div>
            </div>
          </header>

          <div className="portal-grid">
            <section className="portal-section">
              <h2>Ambiente Iglesia</h2>
              <div className="sub-grid">
                {apps.filter(a => a.section === 'Ambiente Iglesia').map(app => (
                  <div key={app.id} className="portal-card" onClick={() => setActiveApp(app.id)}>
                    {app.badge && <span className="card-badge">{app.badge}</span>}
                    <span className="material-icons card-icon">{app.icon}</span>
                    <div className="card-content">
                      <h3>{app.name}</h3>
                      <p>{app.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="portal-section">
              <h2>Ambiente Sistem Plus</h2>
              <div className="sub-grid">
                {apps.filter(a => a.section === 'Ambiente Sistem Plus').map(app => (
                  <div key={app.id} className="portal-card" onClick={() => setActiveApp(app.id)}>
                    <span className="material-icons card-icon">{app.icon}</span>
                    <div className="card-content">
                      <h3>{app.name}</h3>
                      <p>{app.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="app-root">
      {!user ? <Login onLogin={setUser} /> : renderApp()}
    </div>
  );
}

export default App;
