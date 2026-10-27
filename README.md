# Portfólio Profissional — Marco Leone Merini

Aplicação web full stack do portfólio profissional de **Marco Leone Merini** (Desenvolvedor de Software | Bacharel em Engenharia de Software), projetada para apresentar sua trajetória profissional na **WTTI Sistemas** e na **Conta Azul**, suas competências técnicas categorizadas por contexto real de uso e uma análise arquitetural aprofundada do seu projeto autoral **NutrIA** (plataforma clínica em .NET 8 com Inteligência Artificial e arquitetura RAG).

---

## 1. Tecnologias Utilizadas

### Frontend (`frontend/`)
- **React 19** + **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Lucide React** (iconografia acessível)
- Alternância real entre **modo claro e modo escuro** com persistência em `localStorage` e respeito à preferência inicial do sistema operacional (`prefers-color-scheme`)
- Design responsivo (375 px, 430 px, 768 px, 1366 px e 1920 px), sem rolagem horizontal indevida e com respeito a `prefers-reduced-motion`

### Backend (`backend/`)
- **Java JDK 27** (`27.0.1.0.3`)
- **Spring Boot 4.1.2** (`spring-boot-starter-webmvc`, `spring-boot-starter-validation`)
- **Maven Wrapper** (`./mvnw`)
- Testes automatizados com **JUnit 5** e **MockMvc**

---

## 2. Estrutura de Diretórios

```text
meu-portfolio/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/marco/portfolio/
│   │   │   │   ├── PortfolioApiApplication.java
│   │   │   │   ├── config/
│   │   │   │   │   └── CorsConfig.java
│   │   │   │   ├── controller/
│   │   │   │   │   └── PortfolioController.java
│   │   │   │   ├── dto/
│   │   │   │   │   ├── ApiErrorResponseDto.java
│   │   │   │   │   ├── ContatoRequestDto.java
│   │   │   │   │   ├── ContatoResponseDto.java
│   │   │   │   │   ├── HealthResponseDto.java
│   │   │   │   │   └── PortfolioResponseDto.java
│   │   │   │   ├── exception/
│   │   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   │   │   └── RateLimitExceededException.java
│   │   │   │   └── service/
│   │   │   │       ├── ContatoService.java
│   │   │   │       └── PortfolioService.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   │       └── java/com/marco/portfolio/
│   │           └── PortfolioApiApplicationTests.java
│   ├── .env.example
│   ├── mvnw
│   └── pom.xml
├── frontend/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── AboutSection.jsx
│   │   │   ├── ContactSection.jsx
│   │   │   ├── ExperienceSection.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── ProjectsSection.jsx
│   │   │   └── SkillsSection.jsx
│   │   ├── data/
│   │   │   └── portfolioFallback.js
│   │   ├── hooks/
│   │   │   └── useTheme.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

---

## 3. Pré-requisitos

- **Java JDK 27** instalado e configurado no `JAVA_HOME` / `PATH`
- **Node.js 20+** e **npm 10+**

### Como selecionar o Java 27 no Linux

Verifique a versão ativa:
```bash
java -version
```

Caso haja múltiplas versões do JDK instaladas na máquina, selecione o JDK 27 antes de compilar ou iniciar o backend:
```bash
export JAVA_HOME=/usr/lib/jvm/jdk-27.0.1.0.3-oracle-x64
export PATH="$JAVA_HOME/bin:$PATH"
```

---

## 4. Como Executar o Projeto Localmente

### 4.1. Iniciar o Backend (Porta `8080`)
Em um terminal, acesse o diretório `backend/` e execute com o Maven Wrapper:
```bash
cd backend
./mvnw spring-boot:run
```

Para executar a suíte de testes automatizados do backend:
```bash
cd backend
./mvnw clean test
```

### 4.2. Iniciar o Frontend (Porta `5173`)
Em outro terminal, acesse o diretório `frontend/`, instale as dependências (se necessário) e inicie o servidor de desenvolvimento do Vite:
```bash
cd frontend
npm install
npm run dev
```

Acesse no navegador: **`http://localhost:5173`**

---

## 5. Endpoints Disponíveis na API (`http://localhost:8080`)

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/portfolio` | Retorna os dados públicos estruturados do portfólio (perfil, formação concluída, experiências na WTTI Sistemas e Conta Azul, habilidades categorizadas, projeto em destaque NutrIA, outros projetos, idiomas e contatos públicos). |
| `GET` | `/api/health` | Retorna o estado operacional da API (`status: "UP"`, versão do Java em execução, timestamp e indicador `servicoEmailConfigurado`). |
| `POST` | `/api/contato` | Recebe `nome`, `email`, `assunto` e `mensagem`. Realiza validação via Bean Validation, proteção contra abuso por IP (rate limit) e honeypot, e retorna status honesto sobre o envio de e-mail junto a links alternativos pré-preenchidos (`mailto:` e WhatsApp). |

---

## 6. Variáveis de Ambiente e Configuração de Envio de E-mail

### Frontend (`frontend/.env`)
Baseado em `frontend/.env.example`:
```env
VITE_API_BASE_URL=http://localhost:8080
```

### Backend (`backend/.env` ou variáveis do sistema)
Baseado em `backend/.env.example`:
```env
PORT=8080
PORTFOLIO_CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
PORTFOLIO_MAIL_ENABLED=false
PORTFOLIO_MAIL_WEBHOOK_URL=
PORTFOLIO_MAIL_API_TOKEN=
PORTFOLIO_MAIL_FROM=
```

### Como configurar o serviço de e-mails
Por padrão (`PORTFOLIO_MAIL_ENABLED=false`), a aplicação opera com **transparência total**: o endpoint `POST /api/contato` valida a mensagem, retorna `HTTP 202 Accepted` com `emailEnviado: false` e fornece links diretos (`mailto:` e WhatsApp) com o texto já formatado, sem fingir que um e-mail foi disparado em background.

Para ativar o disparo automático via provedor HTTP/Webhook de e-mail em produção:
1. Defina `PORTFOLIO_MAIL_ENABLED=true`.
2. Informe o endpoint HTTP do serviço de entrega em `PORTFOLIO_MAIL_WEBHOOK_URL`.
3. Configure o token de autenticação em `PORTFOLIO_MAIL_API_TOKEN` (nunca insira credenciais diretamente no código-fonte) e o remetente em `PORTFOLIO_MAIL_FROM`.

---

## 7. Como Gerar o Build de Produção e Publicar

### Build do Frontend
```bash
cd frontend
npm run lint
npm run build
```
Os arquivos estáticos otimizados serão gerados em `frontend/dist/`.

### Build do Backend
```bash
cd backend
./mvnw clean package
```
O artefato executável será gerado em `backend/target/portfolio-api-0.0.1-SNAPSHOT.jar` e pode ser iniciado com:
```bash
java -jar backend/target/portfolio-api-0.0.1-SNAPSHOT.jar
```

### Orientações para Publicação (Deploy)
- **Frontend:** Pode ser publicado em serviços de hospedagem estática/CDN (Vercel, Netlify, Cloudflare Pages ou Nginx) definindo `VITE_API_BASE_URL` com a URL HTTPS pública da API.
- **Backend:** Pode ser empacotado em container com imagem base JDK 27 e executado em serviços de nuvem, configurando `PORTFOLIO_CORS_ALLOWED_ORIGINS` exclusivamente com o domínio oficial do frontend em produção.
