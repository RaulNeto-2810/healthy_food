import { useState, useEffect } from 'react'
import { apiService } from './services/api'
import RenderTest from './components/RenderTest'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [healthyFoods, setHealthyFoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Verificar status da API ao carregar o componente
  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        setLoading(true)
        await apiService.checkStatus()
        
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
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Healthy Food</h1>
          <p className="hero-subtitle">Descubra o poder da alimentação saudável</p>
          <p className="hero-description">
            Transforme sua vida com escolhas alimentares nutritivas e deliciosas. 
            Explore nossos conteúdos sobre nutrição, receitas e dicas para uma vida mais saudável.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">
              <i className="bi bi-play-circle me-2"></i>
              Começar Agora
            </button>
            <button className="btn btn-outline">
              <i className="bi bi-book me-2"></i>
              Saiba Mais
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-card">
            <i className="bi bi-heart-pulse hero-icon"></i>
            <h3>Vida Saudável</h3>
            <p>Alimente-se bem, viva melhor</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Por que escolher alimentação saudável?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="bi bi-heart-fill"></i>
              </div>
              <h3>Saúde do Coração</h3>
              <p>Alimentos ricos em nutrientes que fortalecem o sistema cardiovascular</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="bi bi-lightning-charge-fill"></i>
              </div>
              <h3>Mais Energia</h3>
              <p>Combustível natural para seu corpo funcionar no máximo desempenho</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="bi bi-shield-check"></i>
              </div>
              <h3>Imunidade</h3>
              <p>Fortaleça suas defesas naturais com vitaminas e minerais essenciais</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="bi bi-flower1"></i>
              </div>
              <h3>Bem-estar</h3>
              <p>Sinta-se bem por dentro e por fora com uma alimentação equilibrada</p>
            </div>
          </div>
        </div>
      </section>

      {/* Healthy Foods Section */}
      {!loading && !error && healthyFoods.length > 0 && (
        <section className="healthy-foods">
          <div className="container">
            <h2 className="section-title">Alimentos Recomendados</h2>
            <div className="foods-grid">
              {healthyFoods.slice(0, 6).map((food) => (
                <div key={food.id} className="food-card">
                  <div className="food-category">{food.categoria}</div>
                  <h3 className="food-name">{food.nome}</h3>
                  <p className="food-benefits">{food.beneficios}</p>
                  <div className="food-calories">
                    <i className="bi bi-lightning me-1"></i>
                    {food.calorias} cal
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Pronto para começar sua jornada saudável?</h2>
            <p>Junte-se a milhares de pessoas que já transformaram suas vidas</p>
            <button className="btn btn-primary btn-lg">
              <i className="bi bi-rocket me-2"></i>
              Começar Agora
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>
                <i className="bi bi-heart-fill text-success me-2"></i>
                Healthy Food
              </h4>
              <p>Sua jornada para uma vida mais saudável começa aqui.</p>
            </div>
            <div className="footer-section">
              <h5>Links Úteis</h5>
              <ul>
                <li><a href="#sobre">Sobre Nós</a></li>
                <li><a href="#receitas">Receitas</a></li>
                <li><a href="#dicas">Dicas</a></li>
                <li><a href="#contato">Contato</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Redes Sociais</h5>
              <div className="social-links">
                <a href="#" className="social-link">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="bi bi-youtube"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Healthy Food. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  )

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <i className="bi bi-heart-fill text-success me-2"></i>
            <span>Healthy Food</span>
          </div>
          
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <button
              className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => {
                setCurrentPage('home')
                setIsMenuOpen(false)
              }}
            >
              <i className="bi bi-house me-2"></i>
              Início
            </button>
            <button
              className={`nav-link ${currentPage === 'render-test' ? 'active' : ''}`}
              onClick={() => {
                setCurrentPage('render-test')
                setIsMenuOpen(false)
              }}
            >
              <i className="bi bi-cloud-check me-2"></i>
              Teste API
            </button>
          </div>

          <button
            className="nav-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'}`}></i>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {renderCurrentPage()}
      </main>
    </div>
  )
}

export default App
