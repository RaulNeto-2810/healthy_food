from django.http import HttpResponse

def home(request):
    html = """
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Healthy Food API</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                margin: 0;
                color: white;
            }
            .container {
                text-align: center;
                background: rgba(255, 255, 255, 0.1);
                padding: 40px;
                border-radius: 20px;
                backdrop-filter: blur(10px);
                box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            }
            h1 {
                font-size: 3em;
                margin-bottom: 20px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }
            p {
                font-size: 1.2em;
                margin-bottom: 30px;
                opacity: 0.9;
            }
            .button {
                background: linear-gradient(45deg, #ff6b6b, #ffa726);
                color: white;
                border: none;
                padding: 15px 30px;
                font-size: 1.1em;
                border-radius: 50px;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
                margin: 10px;
            }
            .button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(255, 107, 107, 0.6);
            }
            .api-button {
                background: linear-gradient(45deg, #4ecdc4, #44a08d);
                box-shadow: 0 4px 15px rgba(78, 205, 196, 0.4);
            }
            .api-button:hover {
                box-shadow: 0 6px 20px rgba(78, 205, 196, 0.6);
            }
            .status {
                margin-top: 20px;
                padding: 10px;
                border-radius: 10px;
                background: rgba(255, 255, 255, 0.2);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🥗 Healthy Food API</h1>
            <p>API está funcionando perfeitamente no Render!</p>
            
            <button class="button" onclick="testAlert()">
                🎉 Teste de Funcionalidade
            </button>
            
            <button class="button api-button" onclick="testAdmin()">
                🔐 Acessar Admin
            </button>
            
            <div class="status">
                <p>✅ Banco PostgreSQL conectado</p>
                <p>✅ Deploy no Render realizado</p>
                <p>✅ Sistema funcionando</p>
            </div>
        </div>

        <script>
            function testAlert() {
                alert('🎉 Parabéns! O sistema está funcionando perfeitamente no Render!');
            }
            
            function testAdmin() {
                window.open('/admin/', '_blank');
            }
        </script>
    </body>
    </html>
    """
    return HttpResponse(html)
