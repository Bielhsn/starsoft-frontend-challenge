FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para instalar as dependências
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia os arquivos que faltam para o diretório de trabalho
COPY . .

# Compilando a aplicação
RUN npm run build

# Porta 3000 para acesso externo
EXPOSE 3000

# Comando para iniciar o Next.js
CMD ["npm", "start"]
