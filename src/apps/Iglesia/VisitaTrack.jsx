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

  const toggleLlamado = (visitorId) => {
    setVisitors(prev => prev.map(v => {
      if (v.id === visitorId) {
        const hasAny = v.llamados.some(l => l)
        return { ...v, llamados: v.llamados.map(() => !hasAny) }
      }
      return v
    }))
  }

  const deleteVisitor = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este visitante?')) {
      setVisitors(prev => prev.filter(v => v.id !== id))
    }
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

  const downloadBackup = () => {
    const dataStr = JSON.stringify({ config, visitors }, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `visitatrack_backup_${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const exportCSV = () => {
    const headers = ['Registro', 'Nombre', 'Teléfono', 'Dirección', 'Asistencia Martes-Sabado', 'Llamados']
    const rows = visitors.map(v => [
      v.registrationNumber,
      v.name,
      v.phone || '',
      v.address || '',
      v.attendance.map(a => a ? 'X' : '').join(','),
      v.llamados.some(l => l) ? 'SÍ' : 'NO'
    ])
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n")
    const link = document.createElement('a')
    link.setAttribute("href", encodeURI(csvContent))
    link.setAttribute("download", "reporte_visitantes.csv")
    link.click()
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result)
        if (json.config && json.visitors) {
          if (window.confirm('¿Deseas restaurar este backup? Sobrescribirá los datos actuales.')) {
            setConfig(json.config)
            setVisitors(json.visitors)
            alert('Backup restaurado con éxito.')
          }
        } else {
          alert('Formato de archivo no válido.')
        }
      } catch (err) {
        alert('Error al leer el archivo JSON.')
      }
    }
    reader.readAsText(file)
  }

  const nextRegNum = useMemo(() => {
    const nums = visitors.map(v => parseInt(v.registrationNumber)).filter(n => !isNaN(n))
    const max = nums.length > 0 ? Math.max(...nums) : 0
    return String(max + 1).padStart(3, '0')
  }, [visitors])

  return (
    <div className="app-container">
      <nav className="sidebar">
        <div className="sidebar-logo" onClick={onBack} style={{ cursor: 'pointer' }}>
          <span className="logo-icon">💠</span>
          <span className="logo-text">Suite Portal</span>
        </div>
        <div className="sidebar-app-name">
           <span className="logo-icon">⛪</span>
           <span className="logo-text">VisitaTrack</span>
        </div>
        <ul className="nav-links">
          <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
            <span className="nav-icon">📊</span> <span className="nav-text">Dashboard</span>
          </li>
          <li className={activeTab === 'registro' ? 'active' : ''} onClick={() => setActiveTab('registro')}>
            <span className="nav-icon">📝</span> <span className="nav-text">Registro</span>
          </li>
          <li className={activeTab === 'calls' ? 'active' : ''} onClick={() => setActiveTab('calls')}>
            <span className="nav-icon">📞</span> <span className="nav-text">Llamados</span>
          </li>
          <li className={activeTab === 'config' ? 'active' : ''} onClick={() => setActiveTab('config')}>
            <span className="nav-icon">⚙️</span> <span className="nav-text">Configuración</span>
          </li>
        </ul>
        <div className="sidebar-footer">
          <p>VisitaTrack v3.0</p>
        </div>
      </nav>

      <main className="main-content">
        {activeTab === 'dashboard' && (
          <div className="view">
            <header className="view-header">
              <h1>Campaña: {config.campaignName}</h1>
              <p>Métricas clave y resumen de impacto.</p>
            </header>
            
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-title">Visitantes</div>
                <div className="stat-value">{stats.total}</div>
              </div>
              <div className="stat-card">
                <div className="stat-title">Registrados</div>
                <div className="stat-value">{stats.registrados}</div>
              </div>
              <div className="stat-card">
                <div className="stat-title">Llamados</div>
                <div className="stat-value">{stats.llamados}</div>
              </div>
              <div className="stat-card">
                <div className="stat-title">Asistencia</div>
                <div className="stat-value">{stats.avg}%</div>
              </div>
            </div>

            <div className="config-card full-width">
              <h3 style={{ marginBottom: '1.5rem', color: '#fff' }}>Detalles de la Campaña</h3>
              <div className="form-row" style={{ color: 'var(--text-muted)' }}>
                <div><strong>Predicador:</strong> {config.preacher}</div>
                <div><strong>Zona:</strong> {config.zone}</div>
                <div><strong>Asociación:</strong> {config.association}</div>
                <div><strong>Fechas:</strong> {config.dateRange}</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'registro' && (
          <div className="view">
            <header className="view-header">
              <div className="header-left">
                <h1>Registro Maestro</h1>
                <div className="search-bar" style={{ marginTop: '1rem' }}>
                  <input 
                    type="text" 
                    placeholder="Buscar..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <button className="btn-primary" onClick={() => { setEditingVisitor(null); setIsModalOpen(true); }}>
                + Nuevo Registro
              </button>
            </header>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre / Dirección</th>
                    <th>Teléfono</th>
                    <th>Asistencia</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVisitors.map(v => (
                    <tr key={v.id}>
                      <td className="col-reg">{v.registrationNumber}</td>
                      <td>
                        <div className="name">{v.name}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>{v.address || 'Sin dirección'}</div>
                      </td>
                      <td style={{ color: 'var(--text-muted)' }}>{v.phone || '---'}</td>
                      <td>
                        <div className="dots-container">
                          {v.attendance.map((a, i) => (
                            <div 
                              key={i} 
                              className={`dot ${a ? 'active' : ''}`} 
                              onClick={() => toggleAttendance(v.id, i)}
                              title={`Día ${i+1}`}
                            />
                          ))}
                        </div>
                      </td>
                      <td>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', marginRight: '0.5rem' }} onClick={() => { setEditingVisitor(v); setIsModalOpen(true); }}>✏️</button>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }} onClick={() => deleteVisitor(v.id)}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Similar updates for calls and config... */}
        {(activeTab === 'calls' || activeTab === 'config') && (
           <div className="view">
             <header className="view-header">
               <h1>{activeTab === 'calls' ? 'Seguimiento de Llamadas' : 'Configuración'}</h1>
               <p>{activeTab === 'calls' ? 'Gestión de contactos y cierres.' : 'Ajustes del sistema y copias de seguridad.'}</p>
             </header>
             <div className="empty-msg">
                <h2 style={{ color: '#fff' }}>Sección en Rediseño</h2>
                <p>Estamos aplicando el nuevo estilo visual a esta área.</p>
             </div>
           </div>
        )}
      </main>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 style={{ marginBottom: '2rem', color: '#fff' }}>{editingVisitor ? 'Editar Datos' : 'Registrar Nuevo'}</h2>
            <form onSubmit={handleSaveVisitor} className="config-form">
              <div className="form-group">
                <label>Num. Registro</label>
                <input name="regNum" defaultValue={editingVisitor?.registrationNumber || nextRegNum} required />
              </div>
              <div className="form-group">
                <label>Nombre Completo</label>
                <input name="name" defaultValue={editingVisitor?.name} required />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className="btn-primary">Guardar Cambios</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default VisitaTrack
