import { useState, useEffect } from 'react'
import { apiService } from './services/api'
import RenderTest from './components/RenderTest'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [apiStatus, setApiStatus] = useState(null)
  const [healthyFoods, setHealthyFoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [testData, setTestData] = useState('')
  const [testResponse, setTestResponse] = useState(null)

  // Verificar status da API ao carregar o componente
  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        setLoading(true)
        const statusResponse = await apiService.checkStatus()
        setApiStatus(statusResponse)
        
        const foodsResponse = await apiService.getHealthyFoods()
        setHealthyFoods(foodsResponse.foods)
        
        setError(null)
      } catch (err) {
        setError('Erro ao conectar com a API: ' + err.message)
        console.error('Erro na API:', err)
      } finally {
        setLoading(false)
      }
    }

    checkApiConnection()
  }, [])

  // Testar conexão POST
  const handleTestConnection = async () => {
    try {
      const response = await apiService.testConnection({
        message: testData,
        timestamp: new Date().toISOString()
      })
      setTestResponse(response)
    } catch (err) {
      setTestResponse({ error: err.message })
    }
  }

  // Renderizar página atual
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'render-test':
        return <RenderTest />
      default:
        return renderHomePage()
    }
  }

  // Página principal
  const renderHomePage = () => (
    <>
      {/* Status da API */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">
            <i className="bi bi-wifi me-2"></i>
            Status da Conexão
          </h5>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="d-flex align-items-center">
              <div className="spinner-border spinner-border-sm me-2" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
              Verificando conexão...
            </div>
          ) : error ? (
            <div className="alert alert-danger mb-0">
              <i className="bi bi-exclamation-triangle me-2"></i>
              {error}
            </div>
          ) : (
            <div className="alert alert-success mb-0">
              <i className="bi bi-check-circle me-2"></i>
              {apiStatus?.message} (v{apiStatus?.version})
            </div>
          )}
        </div>
      </div>

      {/* Lista de Comidas Saudáveis */}
      {!loading && !error && (
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">
              <i className="bi bi-list-ul me-2"></i>
              Comidas Saudáveis ({healthyFoods.length})
            </h5>
          </div>
          <div className="card-body">
            <div className="row">
              {healthyFoods.map((food) => (
                <div key={food.id} className="col-md-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="card-title">
                        {food.nome}
                        <span className="badge bg-primary ms-2">{food.categoria}</span>
                      </h6>
                      <p className="card-text">{food.beneficios}</p>
                      <small className="text-muted">
                        <i className="bi bi-lightning me-1"></i>
                        {food.calorias} calorias
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Teste de Conexão POST */}
      {!loading && !error && (
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">
              <i className="bi bi-send me-2"></i>
              Testar Conexão POST
            </h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="testInput" className="form-label">
                Mensagem de teste:
              </label>
              <input
                type="text"
                className="form-control"
                id="testInput"
                value={testData}
                onChange={(e) => setTestData(e.target.value)}
                placeholder="Digite uma mensagem para testar..."
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={handleTestConnection}
              disabled={!testData.trim()}
            >
              <i className="bi bi-send me-2"></i>
              Enviar Teste
            </button>
            
            {testResponse && (
              <div className="mt-3">
                <h6>Resposta do servidor:</h6>
                <pre className="bg-light p-3 rounded">
                  {JSON.stringify(testResponse, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          {/* Header com navegação */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="text-center mb-0">
              <i className="bi bi-heart-fill text-success me-2"></i>
              Healthy Food
            </h1>
            
            <div className="btn-group" role="group">
              <button
                type="button"
                className={`btn ${currentPage === 'home' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setCurrentPage('home')}
              >
                <i className="bi bi-house me-2"></i>
                Início
              </button>
              <button
                type="button"
                className={`btn ${currentPage === 'render-test' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setCurrentPage('render-test')}
              >
                <i className="bi bi-cloud-check me-2"></i>
                Teste Render
              </button>
            </div>
          </div>
          
          {/* Conteúdo da página atual */}
          {renderCurrentPage()}
        </div>
      </div>
    </div>
  )
}

export default App
