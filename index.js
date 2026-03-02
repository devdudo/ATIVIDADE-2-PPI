import express from 'express';

const host = '0.0.0.0'; //permite que todas interfaces de rede possam acessar a nossa aplicação
const porta = 3000; //aplicação identificada pelo número 3000

const app = express();

var listaPagamentos = [];

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.write(`
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <title>Página Inicial</title>
            </head>
            <body>
                <h1>Bem-vindo a Página Inicial</h1>
                <a href="/pagamento">Simular Pagamento</a>
            </body>
        </html>
    `);
    res.end();
});

// diferentemente do método GET, que exigia do usuário a passagem de parâmetros por meio da URL
// iremos nesta aula utilizar o método POST.
// o método POST cria um novo recurso no servidor (um registro, uma imagem, um comentário, etc.)

// poder enviar dados de um jogador utilizando um formulário HTML
// a aplicação deverá entregar ou oferecer tal formulário HTML
app.get('/pagamento', (req, res) => {
    res.write(`
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <title>Simulação de Pagamento</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background: linear-gradient(135deg, #141e30, #243b55);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                    }

                    .container {
                        background: #ffffff;
                        padding: 30px;
                        border-radius: 10px;
                        width: 340px;
                        box-shadow: 0 8px 20px rgba(0,0,0,0.2);
                    }

                    h2 {
                        text-align: center;
                        margin-bottom: 20px;
                        color: #243b55;
                    }

                    input {
                        width: 100%;
                        padding: 10px;
                        margin-bottom: 15px;
                        border: 1px solid #ccc;
                        border-radius: 6px;
                        font-size: 14px;
                    }

                    button {
                        width: 100%;
                        padding: 12px;
                        background-color: #243b55;
                        color: white;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: bold;
                        transition: 0.3s;
                    }
                    button:hover {
                        background-color: #1b2d42;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Pagamento</h2>
                    <form method="POST" action="/pagamento">
                        <input type="text" id="nomeCartao" name="nomeCartao" placeholder="Nome no cartão" required>
                        <input type="text" id="numeroCartao" name="numeroCartao" placeholder="Número do cartão" required maxlength="16">
                        <input type="number" id="valor" name="valor" placeholder="Valor (R$)" required>
                        <button type="submit">Pagar</button>
                    </form>
                </div>
            </body>
        </html>
    `);
    res.end();
});

// espera por dados de um formulário HTML
app.post('/pagamento', (req, res) => {
    // deve adicionar um novo jogador, criando um novo estado da aplicação.
    // usando o método POST, o formulário HTML envia os seus dados no corpo da requisição.
    const nomeCartao = req.body.nomeCartao;
    const numeroCartao = req.body.numeroCartao;
    const valor = req.body.valor;

    listaPagamentos.push(
        {
            "nomeCartao": nomeCartao,
            "numeroCartao": numeroCartao,
            "valor": valor
        }
    );
    res.redirect("/relatorioPagamento");
});

app.get("/relatorioPagamento", (req, res) => {
    res.write(`
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <title>Relatório de Pagamentos</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f0f0f0;
                        display: flex;
                        justify-content: center;
                        padding: 40px;
                    }
                    .container {
                        background-color: white;
                        padding: 20px;
                        border-radius: 8px;
                        width: 500px;
                        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                    }
                    h2 {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    th, td {
                        border: 1px solid #ccc;
                        padding: 8px;
                        text-align: center;
                    }
                    th {
                        background-color: #ddd;
                    }
                    a {
                        display: block;
                        text-align: center;
                        margin-top: 15px;
                        padding: 10px;
                        background-color: #4CAF50;
                        color: white;
                        text-decoration: none;
                        border-radius: 5px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Relatório de Pagamentos</h2>
                    <table>
                        <tr>
                            <th>Nome</th>
                            <th>Cartão</th>
                            <th>Valor</th>
                        </tr>
    `);

    for (let i = 0; i < listaPagamentos.length; i++) {
        res.write(`
            <tr>
                <td>${listaPagamentos[i].nomeCartao}</td>
                <td>${listaPagamentos[i].numeroCartao}</td>
                <td>${listaPagamentos[i].valor}</td>
            </tr>
        `);
    }

    res.write(`
                    </table>
                    <a href="/pagamento">Novo Pagamento</a>
                    <a href="/">Voltar para o início</a>
                </div>
            </body>
        </html>
    `);

    res.end();
});

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});