import { useState, useEffect } from 'react'
import { apiService } from '../services/api'

function RenderTest() {
  const [renderTestData, setRenderTestData] = useState(null)
  const [healthData, setHealthData] = useState(null)
  const [postTestData, setPostTestData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [testMessage, setTestMessage] = useState('')

  // Teste completo do Render
  const runRenderTest = async () => {
    setLoading(true)
    try {
      // Teste GET detalhado
      const renderResponse = await fetch('http://localhost:8000/api/render-test/')
      const renderData = await renderResponse.json()
      setRenderTestData(renderData)

      // Health check
      const healthResponse = await fetch('http://localhost:8000/api/health/')
      const healthDataResult = await healthResponse.json()
      setHealthData(healthDataResult)

    } catch (error) {
      console.error('Erro no teste:', error)
      setRenderTestData({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  // Teste POST
  const runPostTest = async () => {
    if (!testMessage.trim()) return

    try {
      const response = await fetch('http://localhost:8000/api/render-post-test/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: testMessage,
          test_type: 'render_deployment',
          timestamp: new Date().toISOString()
        })
      })
      
      const data = await response.json()
      setPostTestData(data)
    } catch (error) {
      setPostTestData({ error: error.message })
    }
  }

  // Executar teste automaticamente ao carregar
  useEffect(() => {
    runRenderTest()
  }, [])

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h2 className="text-center mb-4">
            <i className="bi bi-cloud-check me-2"></i>
            Teste de Deploy - Render
          </h2>

          {/* Botão de refresh */}
          <div className="text-center mb-4">
            <button 
              className="btn btn-primary"
              onClick={runRenderTest}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Testando...
                </>
              ) : (
                <>
                  <i className="bi bi-arrow-clockwise me-2"></i>
                  Executar Teste Completo
                </>
              )}
            </button>
          </div>

          {/* Health Check */}
          {healthData && (
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className="bi bi-heart-pulse me-2"></i>
                  Health Check
                </h5>
              </div>
              <div className="card-body">
                <div className={`alert ${healthData.status === 'healthy' ? 'alert-success' : 'alert-danger'} mb-0`}>
                  <strong>Status:</strong> {healthData.status}<br/>
                  <strong>Database:</strong> {healthData.database}<br/>
                  <strong>Timestamp:</strong> {healthData.timestamp}
                  {healthData.error && (
                    <>
                      <br/><strong>Erro:</strong> {healthData.error}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Informações do Sistema */}
          {renderTestData && !renderTestData.error && (
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className="bi bi-info-circle me-2"></i>
                  Informações do Sistema
                </h5>
              </div>
              <div className="card-body">
                <div className="alert alert-success mb-3">
                  <i className="bi bi-check-circle me-2"></i>
                  {renderTestData.message}
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <h6>Python & Django</h6>
                    <ul className="list-unstyled">
                      <li><strong>Python:</strong> {renderTestData.system_info?.python_version?.split(' ')[0]}</li>
                      <li><strong>Django:</strong> {renderTestData.system_info?.django_version}</li>
                      <li><strong>Ambiente:</strong> {renderTestData.system_info?.environment}</li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <h6>Banco de Dados</h6>
                    <ul className="list-unstyled">
                      <li><strong>Status:</strong> {renderTestData.system_info?.database?.status}</li>
                      <li><strong>Engine:</strong> PostgreSQL</li>
                      <li><strong>Host:</strong> {renderTestData.system_info?.database?.host}</li>
                    </ul>
                  </div>
                </div>

                {/* Detalhes técnicos (colapsível) */}
                <div className="mt-3">
                  <button 
                    className="btn btn-outline-secondary btn-sm"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#technicalDetails"
                  >
                    <i className="bi bi-gear me-2"></i>
                    Ver Detalhes Técnicos
                  </button>
                  
                  <div className="collapse mt-3" id="technicalDetails">
                    <div className="card card-body">
                      <pre className="mb-0" style={{fontSize: '0.8rem', maxHeight: '300px', overflow: 'auto'}}>
                        {JSON.stringify(renderTestData, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Teste POST */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-send me-2"></i>
                Teste de Requisição POST
              </h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="testMessage" className="form-label">
                  Mensagem de teste:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="testMessage"
                  value={testMessage}
                  onChange={(e) => setTestMessage(e.target.value)}
                  placeholder="Digite uma mensagem para testar o POST..."
                />
              </div>
              <button
                className="btn btn-secondary"
                onClick={runPostTest}
                disabled={!testMessage.trim()}
              >
                <i className="bi bi-send me-2"></i>
                Testar POST
              </button>

              {postTestData && (
                <div className="mt-3">
                  <div className={`alert ${postTestData.error ? 'alert-danger' : 'alert-success'}`}>
                    {postTestData.error ? (
                      <>
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        Erro: {postTestData.error}
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        {postTestData.message}
                      </>
                    )}
                  </div>
                  <pre className="bg-light p-3 rounded">
                    {JSON.stringify(postTestData, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Erro geral */}
          {renderTestData?.error && (
            <div className="alert alert-danger">
              <i className="bi bi-exclamation-triangle me-2"></i>
              <strong>Erro no teste:</strong> {renderTestData.error}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RenderTest
