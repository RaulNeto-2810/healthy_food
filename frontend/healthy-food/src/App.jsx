import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [backendStatus, setBackendStatus] = useState('Conectando...')
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(true)

  // URL do backend - altere para sua URL do Render quando fizer deploy
  const BACKEND_URL = 'http://127.0.0.1:8000'

  useEffect(() => {
    testBackendConnection()
  }, [])

  const testBackendConnection = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${BACKEND_URL}/`)
      if (response.ok) {
        setBackendStatus('✅ Backend conectado com sucesso!')
        setIsConnected(true)
      } else {
        setBackendStatus('❌ Erro na conexão com o backend')
        setIsConnected(false)
      }
    } catch (error) {
      setBackendStatus('❌ Backend offline ou inacessível')
      setIsConnected(false)
      console.error('Erro ao conectar com backend:', error)
    } finally {
      setLoading(false)
    }
  }

  const openAdminPanel = () => {
    window.open(`${BACKEND_URL}/admin/`, '_blank')
  }

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>🥗 Healthy Food</h1>
          <p>Sistema de Alimentação Saudável</p>
        </header>

        <div className="status-card">
          <h2>Status da Conexão</h2>
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Testando conexão...</p>
            </div>
          ) : (
            <div className={`status ${isConnected ? 'connected' : 'disconnected'}`}>
              <p>{backendStatus}</p>
            </div>
          )}
        </div>

        <div className="actions">
          <button 
            className="btn btn-primary" 
            onClick={testBackendConnection}
            disabled={loading}
          >
            🔄 Testar Conexão
          </button>
          
          <button 
            className="btn btn-secondary" 
            onClick={openAdminPanel}
            disabled={!isConnected}
          >
            🔐 Painel Admin
          </button>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <h3>🚀 Frontend</h3>
            <p>React + Vite</p>
            <p>Status: ✅ Online</p>
          </div>
          
          <div className="info-card">
            <h3>⚙️ Backend</h3>
            <p>Django + PostgreSQL</p>
            <p>Status: {isConnected ? '✅ Online' : '❌ Offline'}</p>
          </div>
          
          <div className="info-card">
            <h3>🗄️ Banco de Dados</h3>
            <p>PostgreSQL (Render)</p>
            <p>Status: {isConnected ? '✅ Conectado' : '❌ Desconectado'}</p>
          </div>
        </div>

        <div className="deployment-info">
          <h3>📡 Informações de Deploy</h3>
          <p><strong>Frontend:</strong> Pronto para deploy no Render/Vercel/Netlify</p>
          <p><strong>Backend:</strong> Configurado para Render com PostgreSQL</p>
          <p><strong>CORS:</strong> Configurado para permitir requests do frontend</p>
        </div>
      </div>
    </div>
  )
}

export default App
