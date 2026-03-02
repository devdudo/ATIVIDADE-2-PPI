import express from 'express';

const host = '0.0.0.0'; //permite que todas interfaces de rede possam acessar a nossa aplicação
const porta = 3000; //aplicação identificada pelo número 3000

const app = express();

var listaJogadores = [];

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('<h1>Bem-vindo a Página Inicial</h1>');
});

// diferentemente do método GET, que exigia do usuário a passagem de parâmetros por meio da URL
// iremos nesta aula utilizar o método POST.
// o método POST cria um novo recurso no servidor (um registro, uma imagem, um comentário, etc.)

// poder enviar dados de um jogador utilizando um formulário HTML
// a aplicação deverá entregar ou oferecer tal formulário HTML
app.get('/jogador', (req, res) => {
    res.write(`
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <title>Formulário de Jogador</title>
            </head>
            <body>
                <div class="container">
                    <!-- Montar formulário com método POST e com AÇÃO para onde serão enviados. -->
                </div>
            </body>
        </html>
    `);
    res.end();
});

// espera por dados de um formulário HTML
app.post('/jogador', (req, res) => {
    // deve adicionar um novo jogador, criando um novo estado da aplicação.
    // usando o método POST, o formulário HTML envia os seus dados no corpo da requisição.
    const nome = req.body.nome;
    const apelido = req.body.apelido;
    const nivel = req.body.nivel;

    listaJogadores.push(
        {
            "nome": nome,
            "apelido": apelido,
            "nivel": nivel
        }
    );
    res.redirect("/listaJogadores");
});

app.get("/listaJogadores", (req, res) => {
    res.write(`
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <title>Lista de jogadores</title>
            </head>
            <body>
                <div class="container mt-5">
                    
                </div>
            </body>
        </html>
    `);
    res.end();
});

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});