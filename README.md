# **Marketplace NFT**

Este é um projeto desenvolvido em Next.js para a compra e visualização de NFTs, realizado para a Starsoft e enviado a mim para teste, utilizando Redux, React Query e Docker para otimizar a experiência do usuário e a organização do código.

## 📌 **Instruções de Configuração e Execução**
### **Pré-requisitos**
- Node.js (versão 18 ou superior)
- Docker e Docker Compose
- Gerenciador de pacotes (npm ou yarn)

### **Passos para rodar a aplicação**
1. **Clone o repositório**:
   ```sh
   git clone https://github.com/seu-repositorio.git
   cd marketplace-nft
   ```
2. **Rodar com Docker**:
   ```sh
   docker-compose up -d
   ```
   A aplicação estará acessível em `http://localhost:3000`.

3. **Rodar sem Docker**:
   ```sh
   npm install
   npm run dev
   ```
   Acesse `http://localhost:3000` no navegador.

---

## 🚀 **Funcionalidades Implementadas**
- **Listagem de NFTs** consumindo API externa.
- **Página de detalhes do NFT** com informações individuais.
- **Carrinho de compras** gerenciado via Redux.
- **SSR (Server-Side Rendering)** e **SSG (Static Site Generation)** para otimização.
- **Rotas dinâmicas** para cada NFT (`/nfts/[id]`).
- **Tratamento de estados** de loading, erro e sucesso nas requisições.
- **Integração com Docker** para facilitar a execução.
- **Animações com Framer Motion** para melhor experiência do usuário.

---

## 🛠 **Tecnologias Utilizadas e Justificativas**
- **Next.js** → Framework React que facilita SSR e SSG.
- **Redux** → Gerenciamento global do estado do carrinho.
- **React Query** → Manipulação eficiente de dados assíncronos.
- **TypeScript** → Tipagem estática para evitar erros em tempo de execução.
- **Docker & Docker Compose** → Padronização do ambiente de desenvolvimento.
- **ESLint & Prettier** → Código mais limpo e padronizado.
- **Framer Motion** → Suavização das animações e transições.

---

## 📂 **Estrutura do Projeto**
```
marketplace-nft
│── public/assets/icons           # Imagens e assets estáticos
    |── ETH.png 
│── src/                          # Código-fonte principal
│   ├── components/               # Componentes reutilizáveis
│   ├── pages/                    # Páginas do Next.js
        ├── _app.tsx              #Persistência de Estado Global e Estilização Global
│       ├── index.tsx             # Página inicial
│       ├── cart.tsx              # Página do carrinho
        ├── cart.test.tsx         # Página para teste do carrinho
│       ├── api/nfts/             # API interna para NFTs
    |── nfts/                     # API para localizar NFTs com sua página dedicada
│   ├── redux/                    # Store e Slices do Redux
│   ├── styles/                   # Estilos da aplicação
│── docker-compose.yml            # Orquestração do Docker
│── Dockerfile                    # Configuração do Docker
│── package.json                  # Dependências do projeto
│── tsconfig.json                 # Configuração do TypeScript
│── .eslintrc.js                  # Regras do ESLint
│── .prettierrc                   # Configuração do Prettier
|── .babelrc                      #Configurações do babel
|── jest.config.js                #Configurações do Jest
|── jest.setup.js                 #Configurações do setup do Jest
```

---

## 🛠 **Arquitetura e Fluxo de Dados**
### **1. [id].tsx → Página do Next.js (Front-end)**
- **Localização:** `/pages/nfts/[id].tsx`
- **Executado no navegador** (client-side).
- Faz requisição para `/api/nfts/[id]` para buscar os dados do NFT.

### **2. [id].ts → API Route do Next.js (Back-end)**
- **Localização:** `/pages/api/nfts/[id].ts`
- **Executado no servidor** (server-side).
- Filtra os NFTs da API externa e retorna apenas os dados necessários.

### **Fluxo de Dados**
1. Usuário acessa `/nfts/1`.
2. A página `[id].tsx` requisita `/api/nfts/1`.
3. `[id].ts` busca os dados da API externa e retorna o NFT específico.
4. A página recebe os dados e exibe no front-end.

---

## 🐳 **Configuração com Docker**
A aplicação pode ser iniciada via Docker para facilitar a configuração do ambiente.

### **1. Construir e rodar a aplicação com Docker**
```sh
docker-compose build --no-cache
docker-compose up -d
```
A aplicação estará acessível em `http://localhost:3000`.

### **2. Parar os containers**
```sh
docker-compose down
```

### **3. Ver logs dos containers**
```sh
docker logs -f marketplace-nft
```

---

## 📌 **Possíveis Melhorias Futuras**
- **Adicionar autenticação** para permitir login e favoritos.
- **Integração com Web3** para permitir compras com carteiras digitais.
- **Melhorar acessibilidade** com ARIA e melhores contrastes.
- **Testes automatizados** para garantir estabilidade do projeto.

---

## 📄 **Conclusão**
O projeto foi desenvolvido seguindo boas práticas de **Clean Code**, utilizando **Redux** para gerenciar estados, **Next.js API Routes** para consumir e processar dados e **Docker** para simplificar a execução. Todas as funcionalidades foram testadas e validadas.

🔹 Para rodar a aplicação, basta executar:
```sh
docker-compose up -d
```

---
