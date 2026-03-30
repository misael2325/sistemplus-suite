import { useState, useEffect, useMemo, useRef } from 'react'
import initialData from '../../data/data.json'

function VisitaTrack({ onBack }) {
  const [visitors, setVisitors] = useState(() => {
    const saved = localStorage.getItem('visitatrack_visitors')
    return saved ? JSON.parse(saved) : initialData.visitors
  })
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('visitatrack_config')
    return saved ? JSON.parse(saved) : initialData.config
  })
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [editingVisitor, setEditingVisitor] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const fileInputRef = useRef(null)

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('visitatrack_visitors', JSON.stringify(visitors))
    localStorage.setItem('visitatrack_config', JSON.stringify(config))
  }, [visitors, config])

  // Stats
  const stats = useMemo(() => {
    const total = visitors.length
    const registrados = visitors.filter(v => v.registrationNumber).length
    const llamados = visitors.filter(v => v.llamados.some(l => l === true)).length
    const attendanceCount = visitors.reduce((acc, v) => acc + v.attendance.filter(a => a === true).length, 0)
    const avg = total > 0 ? (attendanceCount / (total * 7) * 100).toFixed(1) : 0
    return { total, registrados, llamados, avg }
  }, [visitors])

  // Filtered visitors
  const filteredVisitors = useMemo(() => {
    return visitors.filter(v => 
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.registrationNumber.includes(searchQuery)
    ).sort((a, b) => {
      const numA = parseInt(a.registrationNumber) || 0
      const numB = parseInt(b.registrationNumber) || 0
      return numA - numB
    })
  }, [visitors, searchQuery])

  // Handlers
  const toggleAttendance = (visitorId, dayIndex) => {
    setVisitors(prev => prev.map(v => {
      if (v.id === visitorId) {
        const newAttendance = [...v.attendance]
        newAttendance[dayIndex] = !newAttendance[dayIndex]
        return { ...v, attendance: newAttendance }
      }
      return v
    }))
  }

  const handleSaveVisitor = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newVisitor = {
      id: editingVisitor?.id || Math.random().toString(36).substr(2, 9),
      registrationNumber: formData.get('regNum'),
      name: formData.get('name'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      attendance: editingVisitor?.attendance || Array(7).fill(false),
      llamados: editingVisitor?.llamados || Array(7).fill(false),
      createdAt: editingVisitor?.createdAt || new Date().toISOString()
    }

    if (editingVisitor) {
      setVisitors(prev => prev.map(v => v.id === editingVisitor.id ? newVisitor : v))
    } else {
      setVisitors(prev => [...prev, newVisitor])
    }
    setIsModalOpen(false)
    setEditingVisitor(null)
  }

  const nextRegNum = useMemo(() => {
    const nums = visitors.map(v => parseInt(v.registrationNumber)).filter(n => !isNaN(n))
    const max = nums.length > 0 ? Math.max(...nums) : 0
    return String(max + 1).padStart(3, '0')
  }, [visitors])

  const deleteVisitor = (id) => {
    if (window.confirm('¿Eliminar este registro?')) {
      setVisitors(prev => prev.filter(v => v.id !== id))
    }
  }

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-logo" onClick={onBack} style={{ cursor: 'pointer' }}>
          <span className="material-icons" style={{ color: 'var(--primary)' }}>church</span>
          <span className="logo-text">VisitaTrack</span>
        </div>
        
        <div className="sidebar-app-name">
          <span className="material-icons">diversity_3</span>
          <span>Gestión Iglesia</span>
        </div>

        <nav className="nav-links">
          <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
            <span className="material-icons nav-icon">dashboard</span>
            <span className="nav-text">Dashboard</span>
          </li>
          <li className={activeTab === 'registro' ? 'active' : ''} onClick={() => setActiveTab('registro')}>
            <span className="material-icons nav-icon">person_add</span>
            <span className="nav-text">Registro</span>
          </li>
          <li className={activeTab === 'config' ? 'active' : ''} onClick={() => setActiveTab('config')}>
            <span className="material-icons nav-icon">settings</span>
            <span className="nav-text">Configuración</span>
          </li>
          <li onClick={onBack}>
            <span className="material-icons nav-icon">arrow_back</span>
            <span className="nav-text">Portal</span>
          </li>
        </nav>
        
        <div className="sidebar-footer" style={{ marginTop: 'auto', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Suite Iglesia v3.1
        </div>
      </aside>

      <main className="main-content">
        {activeTab === 'dashboard' && (
          <div className="view">
            <header className="view-header">
              <div>
                <h1>{config.campaignName}</h1>
                <p>Métricas clave de la campaña actual en {config.zone}</p>
              </div>
            </header>
            
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-title">Total Visitantes</div>
                <div className="stat-value">{stats.total}</div>
              </div>
              <div className="stat-card">
                <div className="stat-title">Registrados</div>
                <div className="stat-value">{stats.registrados}</div>
              </div>
              <div className="stat-card">
                <div className="stat-title">Llamados Realizados</div>
                <div className="stat-value">{stats.llamados}</div>
              </div>
              <div className="stat-card">
                <div className="stat-title">Asistencia Media</div>
                <div className="stat-value">{stats.avg}%</div>
              </div>
            </div>

            <div className="table-container" style={{ padding: '2rem' }}>
              <h3 style={{ marginBottom: '1.5rem' }}>Detalles de la Campaña</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                <div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 700 }}>Predicador</p>
                  <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>{config.preacher}</p>
                </div>
                <div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 700 }}>Asociación</p>
                  <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>{config.association}</p>
                </div>
                <div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 700 }}>Rango de Fechas</p>
                  <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>{config.dateRange}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'registro' && (
          <div className="view">
            <header className="view-header">
              <div>
                <h1>Registro Maestro</h1>
                <div className="search-bar" style={{ marginTop: '1.5rem' }}>
                  <input 
                    type="text" 
                    placeholder="Buscar por nombre o ID..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <button className="btn-primary" onClick={() => { setEditingVisitor(null); setIsModalOpen(true); }}>
                <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '8px' }}>add</span>
                Nuevo Visitante
              </button>
            </header>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre y Dirección</th>
                    <th>Teléfono</th>
                    <th>Asistencia (7 días)</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVisitors.map(v => (
                    <tr key={v.id}>
                      <td className="col-reg">{v.registrationNumber}</td>
                      <td>
                        <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{v.name}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{v.address || 'Chile #...' }</div>
                      </td>
                      <td>{v.phone || '---'}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          {v.attendance.map((a, i) => (
                            <div 
                              key={i} 
                              onClick={() => toggleAttendance(v.id, i)}
                              style={{ 
                                width: '12px', 
                                height: '24px', 
                                borderRadius: '4px',
                                background: a ? 'var(--primary)' : 'var(--border-main)',
                                cursor: 'pointer',
                                transition: 'var(--transition)'
                              }}
                              title={`Día ${i+1}`}
                            />
                          ))}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button className="btn-secondary" style={{ padding: '0.5rem' }} onClick={() => { setEditingVisitor(v); setIsModalOpen(true); }}>
                             <span className="material-icons" style={{ fontSize: '1.2rem' }}>edit</span>
                          </button>
                          <button className="btn-secondary" style={{ padding: '0.5rem', color: 'var(--danger)' }} onClick={() => deleteVisitor(v.id)}>
                             <span className="material-icons" style={{ fontSize: '1.2rem' }}>delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'config' && (
          <div className="view">
             <header className="view-header">
                <div>
                  <h1>Configuración</h1>
                  <p>Ajustes globales y gestión de datos</p>
                </div>
             </header>
             <div className="sub-grid">
                <div className="portal-card" style={{ cursor: 'default' }}>
                   <span className="material-icons card-icon">cloud_download</span>
                   <div className="card-content">
                      <h3>Copia de Seguridad</h3>
                      <p>Descarga todos los datos actuales en formato JSON para respaldo.</p>
                      <button className="btn-primary" style={{ marginTop: '1rem', width: '100%' }}>Descargar Backup</button>
                   </div>
                </div>
                <div className="portal-card" style={{ cursor: 'default' }}>
                   <span className="material-icons card-icon">cloud_upload</span>
                   <div className="card-content">
                      <h3>Restaurar Datos</h3>
                      <p>Sube un archivo de respaldo previo para restaurar el sistema.</p>
                      <button className="btn-secondary" style={{ marginTop: '1rem', width: '100%' }}>Subir Archivo</button>
                   </div>
                </div>
             </div>
          </div>
        )}
      </main>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 style={{ marginBottom: '2rem' }}>{editingVisitor ? 'Editar Visitante' : 'Nuevo Registro'}</h2>
            <form onSubmit={handleSaveVisitor} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="search-bar" style={{ width: '100%' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700 }}>Número de Registro</label>
                <input name="regNum" style={{ width: '100%' }} defaultValue={editingVisitor?.registrationNumber || nextRegNum} required />
              </div>
              <div className="search-bar" style={{ width: '100%' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700 }}>Nombre Completo</label>
                <input name="name" style={{ width: '100%' }} defaultValue={editingVisitor?.name} required />
              </div>
              <div className="search-bar" style={{ width: '100%' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700 }}>Teléfono</label>
                <input name="phone" style={{ width: '100%' }} defaultValue={editingVisitor?.phone} />
              </div>
              <div className="search-bar" style={{ width: '100%' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700 }}>Dirección</label>
                <input name="address" style={{ width: '100%' }} defaultValue={editingVisitor?.address} />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>Guardar</button>
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)} style={{ flex: 1 }}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default VisitaTrack
