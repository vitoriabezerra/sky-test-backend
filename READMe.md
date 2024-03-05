# Sky Test Backend

**Autoria:** Vitória Bezerra

## Descrição

O Sky Test Backend é uma aplicação Node.js com MongoDB e TypeScript. Esta aplicação oferece funcionalidades básicas como criação de novo usuário, login e busca de usuário no banco de dados.

## Configuração do Ambiente

Certifique-se de ter o Node.js instalado em seu sistema

## Clonando e excutando o Repositório

```bash
git clone https://github.com/vitoriabezerra/sky-test-backend.git
```

Crie um arquivo .env na raíz do projeto

```.env
PORT=3000
MONGODB_URI=sua-chave-de-conexao-do-mongodb
```

Installe as dependências

```bash
npm install
```

Inicie o projeto

```bash
npm start
```

## Rotas

### Sign Up (Criar novo usuário)

-   **Endpoint:** `/signup`
-   **Método:** `POST`

#### Corpo da Requisição:

```json
{
    "nome": "Novo user",
    "email": "user@example.com",
    "senha": "senha_teste",
    "telefones": [
        {
            "numero": "998877665",
            "ddd": "32"
        },
        {
            "numero": "112233445",
            "ddd": "21"
        }
    ]
}
```

### Sign In (Login)

-   **Endpoint:** `/signin`
-   **Método:** `POST`

#### Corpo da Requisição:

```json
{
    "email": "emailcadastrado",
    "password": "senhacadastrada123"
}
```

### Buscar Usuário

-   **Endpoint:** `/buscar-usuario/:id`
-   **Método:** `GET`
-   **Parâmetros da Requisição:**
    -   `id`: ID do usuário a ser pesquisado

**Autenticação:** A autenticação é realizada via Bearer Token. O mesmo token é gerado durante a criação ou login do usuário.

**Validade do Token:** Se o login/criação ocorreu há mais de 30 minutos, será necessário fazer o login novamente para obter um token válido.

Exemplo:

```bash
curl -X GET -H "Authorization: Bearer SEU_TOKEN_AQUI" http://localhost3000.com/buscar-usuario/123
```
