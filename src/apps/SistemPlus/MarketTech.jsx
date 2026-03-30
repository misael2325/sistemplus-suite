import React, { useState, useEffect } from 'react';

const MarketTech = ({ onBack, isPublic = false, isAdmin = false }) => {
  const [view, setView] = useState('models'); // 'models' or 'devices'
  const [selectedModel, setSelectedModel] = useState(null);
  const [models, setModels] = useState([]);
  const [devices, setDevices] = useState([]);

  // Form states
  const [newModel, setNewModel] = useState({ name: '', brand: '', image: '' });
  const [newDevice, setNewDevice] = useState({ capacity: '', batteryGrade: '', condition: '', price: '' });
  const [showModal, setShowModal] = useState(null); // 'model' or 'device'

  useEffect(() => {
    const saved = localStorage.getItem('sistemplus_market_tech');
    if (saved) {
      const parsed = JSON.parse(saved);
      setModels(parsed.models || []);
      setDevices(parsed.devices || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sistemplus_market_tech', JSON.stringify({ models, devices }));
  }, [models, devices]);

  const handleAddModel = () => {
    if (!newModel.name) return;
    const model = { ...newModel, id: Date.now().toString() };
    setModels([...models, model]);
    setNewModel({ name: '', brand: '', image: '' });
    setShowModal(null);
  };

  const handleAddDevice = () => {
    if (!newDevice.price || !selectedModel) return;
    const modelDevices = devices.filter(d => d.modelId === selectedModel.id);
    const unitNumber = modelDevices.length + 1;
    const device = { 
      ...newDevice, 
      id: Date.now().toString(), 
      modelId: selectedModel.id,
      unitNumber 
    };
    setDevices([...devices, device]);
    setNewDevice({ capacity: '', batteryGrade: '', condition: '', price: '' });
    setShowModal(null);
  };

  const handleDeleteModel = (id) => {
    setModels(models.filter(m => m.id !== id));
    setDevices(devices.filter(d => d.modelId !== id));
  };

  const handleDeleteDevice = (id) => {
    setDevices(devices.filter(d => d.id !== id));
  };

  const renderSidebar = () => (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="material-icons text-3xl" style={{ color: 'var(--primary)' }}>devices</span>
        <span className="logo-text">Market Tech</span>
      </div>
      
      <div className="sidebar-app-name">
        <span className="material-icons">vibration</span>
        <span>Inventario</span>
      </div>

      <nav className="nav-links">
        <li className={view === 'models' ? 'active' : ''} onClick={() => setView('models')}>
          <span className="material-icons nav-icon">grid_view</span>
          <span className="nav-text">Modelos</span>
        </li>
        {!isPublic && isAdmin && (
          <li className="active" style={{cursor: 'default'}}>
            <span className="material-icons nav-icon">verified_user</span>
            <span className="nav-text">Cuenta Admin</span>
          </li>
        )}
        <li onClick={onBack}>
          <span className="material-icons nav-icon">arrow_back</span>
          <span className="nav-text">Salir</span>
        </li>
      </nav>

      <div className="sidebar-footer" style={{ marginTop: 'auto', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        Market Tech v1.1
      </div>
    </aside>
  );

  const renderModels = () => (
    <div className="models-view">
      <div className="view-header">
        <div>
          <h1>Catálogo de Equipos</h1>
          <p>Explora los modelos disponibles en nuestra tienda</p>
        </div>
        {isAdmin && !isPublic && (
          <button className="btn-primary" onClick={() => setShowModal('model')}>
            <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '8px' }}>add</span>
            Nuevo Modelo
          </button>
        )}
      </div>

      <div className="sub-grid">
        {models.map(model => (
          <div key={model.id} className="portal-card" onClick={() => { setSelectedModel(model); setView('devices'); }}>
            {isAdmin && (
              <button 
                className="card-badge" 
                style={{ background: 'var(--danger)', border: 'none', cursor: 'pointer' }}
                onClick={(e) => { e.stopPropagation(); handleDeleteModel(model.id); }}
              >
                Eliminar
              </button>
            )}
            <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
              {model.image ? (
                <img src={model.image} alt={model.name} style={{ maxHeight: '100%', maxWidth: '100%' }} />
              ) : (
                <span className="material-icons" style={{ fontSize: '5rem', color: 'var(--border-main)' }}>smartphone</span>
              )}
            </div>
            <div className="card-content">
              <h3>{model.name}</h3>
              <p>{model.brand}</p>
              <div style={{ marginTop: '1rem', color: 'var(--primary)', fontWeight: '700', fontSize: '0.9rem' }}>
                {devices.filter(d => d.modelId === model.id).length} unidades en stock
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDevices = () => {
    const list = devices.filter(d => d.modelId === selectedModel.id);
    return (
      <div className="devices-view">
        <div className="view-header">
          <div>
            <button className="btn-secondary" onClick={() => setView('models')} style={{ marginBottom: '1rem' }}>
              <span className="material-icons" style={{ verticalAlign: 'middle', fontSize: '1.2rem', marginRight: '4px' }}>arrow_back</span>
              Volver
            </button>
            <h1>{selectedModel.name}</h1>
            <p>Listado de unidades únicas disponibles</p>
          </div>
          {isAdmin && !isPublic && (
            <button className="btn-primary" onClick={() => setShowModal('device')}>
              <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '8px' }}>add</span>
              Agregar Unidad
            </button>
          )}
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Capacidad</th>
                <th>Batería</th>
                <th>Estado</th>
                <th>Precio</th>
                {isAdmin && <th>Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {list.map(device => (
                <tr key={device.id}>
                  <td className="col-reg">{device.unitNumber}</td>
                  <td>{device.capacity}</td>
                  <td><span className="badge-llamado active">{device.batteryGrade}</span></td>
                  <td>{device.condition}</td>
                  <td style={{ fontWeight: '800', color: 'var(--primary)' }}>${device.price}</td>
                  {isAdmin && (
                    <td>
                      <button className="btn-secondary" onClick={() => handleDeleteDevice(device.id)} style={{ padding: '0.5rem 1rem', color: 'var(--danger)' }}>
                        Eliminar
                      </button>
                    </td>
                  )}
                </tr>
              ))}
              {list.length === 0 && (
                <tr>
                  <td colSpan={isAdmin ? 6 : 5} style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                    No hay unidades registradas para este modelo.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderModals = () => {
    if (!showModal) return null;
    return (
      <div className="modal-overlay" onClick={() => setShowModal(null)}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <h2 style={{ marginBottom: '2rem' }}>{showModal === 'model' ? 'Registrar Nuevo Modelo' : `Agregar Unidad a ${selectedModel.name}`}</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {showModal === 'model' ? (
              <>
                <div className="search-bar" style={{ width: '100%' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700' }}>Nombre del Modelo</label>
                  <input style={{ width: '100%' }} value={newModel.name} onChange={e => setNewModel({...newModel, name: e.target.value})} placeholder="Ej: iPhone 15 Pro Max" />
                </div>
                <div className="search-bar" style={{ width: '100%' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700' }}>Marca</label>
                  <input style={{ width: '100%' }} value={newModel.brand} onChange={e => setNewModel({...newModel, brand: e.target.value})} placeholder="Ej: Apple" />
                </div>
                <div className="search-bar" style={{ width: '100%' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700' }}>URL Imagen (Link)</label>
                  <input style={{ width: '100%' }} value={newModel.image} onChange={e => setNewModel({...newModel, image: e.target.value})} placeholder="https://..." />
                </div>
                <button className="btn-primary" onClick={handleAddModel}>Guardar Modelo</button>
              </>
            ) : (
              <>
                <div className="search-bar" style={{ width: '100%' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700' }}>Capacidad</label>
                  <input style={{ width: '100%' }} value={newDevice.capacity} onChange={e => setNewDevice({...newDevice, capacity: e.target.value})} placeholder="Ej: 256GB" />
                </div>
                <div className="search-bar" style={{ width: '100%' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700' }}>Grado Batería</label>
                  <input style={{ width: '100%' }} value={newDevice.batteryGrade} onChange={e => setNewDevice({...newDevice, batteryGrade: e.target.value})} placeholder="Ej: A, B o C" />
                </div>
                <div className="search-bar" style={{ width: '100%' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700' }}>Condición Física</label>
                  <input style={{ width: '100%' }} value={newDevice.condition} onChange={e => setNewDevice({...newDevice, condition: e.target.value})} placeholder="Ej: Como Nuevo" />
                </div>
                <div className="search-bar" style={{ width: '100%' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700' }}>Precio (USD)</label>
                  <input style={{ width: '100%' }} type="number" value={newDevice.price} onChange={e => setNewDevice({...newDevice, price: e.target.value})} placeholder="Ej: 999" />
                </div>
                <button className="btn-primary" onClick={handleAddDevice}>Guardar Unidad</button>
              </>
            )}
            <button className="btn-secondary" onClick={() => setShowModal(null)}>Cancelar</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
      {renderSidebar()}
      <main className="main-content">
        {view === 'models' ? renderModels() : renderDevices()}
      </main>
      {renderModals()}
    </div>
  );
};

export default MarketTech;
