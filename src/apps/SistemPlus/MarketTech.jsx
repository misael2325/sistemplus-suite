import { useState, useEffect, useMemo } from 'react'
import initialData from '../../data/data.json'

function MarketTech({ onBack, isPublic = false }) {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('sistemplus_market_tech')
    return saved ? JSON.parse(saved) : initialData.marketTech
  })
  
  const [view, setView] = useState('models') // 'models' or 'devices'
  const [selectedModel, setSelectedModel] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState('model') // 'model' or 'device'

  // Persist
  useEffect(() => {
    localStorage.setItem('sistemplus_market_tech', JSON.stringify(data))
  }, [data])

  // Handlers
  const handleAddModel = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newModel = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.get('name'),
      brand: formData.get('brand'),
      image: formData.get('image') || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop'
    }
    setData(prev => ({ ...prev, models: [...prev.models, newModel] }))
    setIsModalOpen(false)
  }

  const handleAddDevice = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const modelDevices = data.devices.filter(d => d.modelId === selectedModel.id)
    const nextUnit = modelDevices.length + 1
    
    const newDevice = {
      id: Math.random().toString(36).substr(2, 9),
      modelId: selectedModel.id,
      unitNumber: nextUnit,
      capacity: formData.get('capacity'),
      batteryGrade: formData.get('batteryGrade'),
      condition: formData.get('condition'),
      price: parseFloat(formData.get('price'))
    }
    setData(prev => ({ ...prev, devices: [...prev.devices, newDevice] }))
    setIsModalOpen(false)
  }

  const filteredDevices = useMemo(() => {
    if (!selectedModel) return []
    return data.devices.filter(d => d.modelId === selectedModel.id)
  }, [data.devices, selectedModel])

  return (
    <div className="app-container">
      <nav className="sidebar">
        <div className="sidebar-logo" onClick={onBack} style={{ cursor: 'pointer' }}>
          <span className="logo-icon">💠</span>
          <span className="logo-text">Suite Portal</span>
        </div>
        <div className="sidebar-app-name">
           <span className="logo-icon">{isPublic ? '📱' : '💻'}</span>
           <span className="logo-text">{isPublic ? 'Catálogo Tech' : 'Tech Market'}</span>
        </div>
        <ul className="nav-links">
          <li className={view === 'models' ? 'active' : ''} onClick={() => { setView('models'); setSelectedModel(null); }}>
            <span className="nav-icon">📱</span> <span className="nav-text">Modelos</span>
          </li>
          {!isPublic && (
            <li className={isAdmin ? 'active' : ''} onClick={() => setIsAdmin(!isAdmin)}>
              <span className="nav-icon">🔐</span> <span className="nav-text">{isAdmin ? 'Admin: ON' : 'Admin: OFF'}</span>
            </li>
          )}
        </ul>
        <div className="sidebar-footer">
          <p>Market Tech v1.0</p>
        </div>
      </nav>

      <main className="main-content">
        {view === 'models' ? (
          <div className="view">
            <header className="view-header">
              <div className="header-left">
                <h1>{isPublic ? 'Catálogo de Equipos' : 'Catálogo de Modelos'}</h1>
                <p>{isPublic ? 'Explora nuestra selección de equipos premium.' : 'Selecciona un modelo para ver unidades disponibles.'}</p>
              </div>
              {!isPublic && isAdmin && (
                <button className="btn-primary" onClick={() => { setModalType('model'); setIsModalOpen(true); }}>
                  + Registrar Modelo
                </button>
              )}
            </header>

            <div className="sub-grid">
              {data.models.map(model => (
                <div key={model.id} className="portal-card" style={{ padding: '0', overflow: 'hidden' }} onClick={() => { setSelectedModel(model); setView('devices'); }}>
                   <div style={{ height: '200px', width: '100%', overflow: 'hidden' }}>
                      <img src={model.image} alt={model.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="model-img" />
                   </div>
                   <div style={{ padding: '1.5rem' }}>
                      <h3 style={{ margin: '0' }}>{model.name}</h3>
                      <p style={{ color: 'var(--accent)', fontWeight: '700', marginTop: '0.25rem' }}>{model.brand}</p>
                      <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {data.devices.filter(d => d.modelId === model.id).length} unidades disponibles
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="view">
            <header className="view-header">
              <div className="header-left">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }} onClick={() => { setView('models'); setSelectedModel(null); }}>← Volver</button>
                  <h1 style={{ margin: '0' }}>{selectedModel.name}</h1>
                </div>
                <p>{isPublic ? 'Equipos disponibles en esta categoría.' : 'Listado de dispositivos únicos disponibles bajo este modelo.'}</p>
              </div>
              {!isPublic && isAdmin && (
                <button className="btn-primary" onClick={() => { setModalType('device'); setIsModalOpen(true); }}>
                  + Nueva Unidad
                </button>
              )}
            </header>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Capacidad</th>
                    <th>Batería</th>
                    <th>Estado</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDevices.length === 0 ? (
                    <tr><td colSpan="5" className="empty-msg">No hay unidades registradas para este modelo.</td></tr>
                  ) : (
                    filteredDevices.map(device => (
                      <tr key={device.id}>
                        <td className="col-reg">{device.unitNumber}</td>
                        <td style={{ fontWeight: '600' }}>{device.capacity}</td>
                        <td>
                          <span className={`badge-llamado ${device.batteryGrade === 'A' ? 'active' : ''}`} style={{ borderColor: device.batteryGrade === 'A' ? 'var(--success)' : '' }}>
                            {device.batteryGrade}
                          </span>
                        </td>
                        <td style={{ color: 'var(--text-muted)' }}>{device.condition}</td>
                        <td style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--success)' }}>
                          ${device.price.toLocaleString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 style={{ marginBottom: '2rem', color: '#fff' }}>{modalType === 'model' ? 'Registrar Modelo' : 'Nueva Unidad'}</h2>
            <form onSubmit={modalType === 'model' ? handleAddModel : handleAddDevice} className="config-form">
              {modalType === 'model' ? (
                <>
                  <div className="form-group">
                    <label>Nombre del Modelo</label>
                    <input name="name" placeholder="Ej. iPhone 15 Pro" required />
                  </div>
                  <div className="form-group">
                    <label>Marca</label>
                    <input name="brand" placeholder="Ej. Apple" required />
                  </div>
                  <div className="form-group">
                    <label>URL Imagen (Opcional)</label>
                    <input name="image" placeholder="https://..." />
                  </div>
                </>
              ) : (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Capacidad</label>
                      <input name="capacity" placeholder="Ej. 128GB" required />
                    </div>
                    <div className="form-group">
                      <label>Grado Batería (A/B/C)</label>
                      <input name="batteryGrade" placeholder="Ej. A" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Estado del Dispositivo</label>
                    <input name="condition" placeholder="Ej. Como Nuevo, Cristal Dañado" required />
                  </div>
                  <div className="form-group">
                    <label>Precio (USD)</label>
                    <input name="price" type="number" step="0.01" required />
                  </div>
                </>
              )}
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className="btn-primary">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .portal-card:hover .model-img {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  )
}
export default MarketTech
