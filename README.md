# World Cup 2026 Predictor — Simulador da Copa do Mundo FIFA 2026™ 🏆

Um simulador esportivo profissional, moderno e Responsivo para a **Copa do Mundo da FIFA 2026™** contendo todas as 48 seleções e calendário regulamentar no modelo oficial de 12 grupos e mata-mata expandido (32-avos até a Finalísima).

O projeto é **100% estático (client-side)** rodando integralmente no navegador com suporte a armazenamento local offline-first via `LocalStorage`.

---

## 🎨 Visual Preview & Design

* **Tema Cosmic Slate**: Canvas escuro escandinavo, projetado com contraste cirúrgico, realçado por paletas douradas, esmeraldas e cinzas técnicos esportivos.
* **Componentização Avançada**: Design responsivo Mobile-First, com cartões interativos em formato de tickets, tabelas de classificação clássicas e brackets de chaveamento do mata-mata conectados visualmente.
* **Interatividade Suave**: Transições elegantes em CSS para cliques de abas, hovers de tabelas e atualizações live de resultados.

---

## 🚀 Funcionalidades Principais

1. **Início (Dashboard)**:
   * Banner promocional interativo com as sedes oficiais (Canadá, México e EUA).
   * Atalhos para simulação automática completa em um único clique ou reset geral do simulador.
   * Tabela global em tempo real contendo todos os **12 grupos oficiais (A ao L)** com posições e desempates simulados.

2. **Palpites (Votos do Campeão)**:
   * Cadastro personalizado com nome e seleção favorita.
   * Ranking dinâmico em tempo real de contagem de votos e percentuais de favoritismo.
   * Feed de palpites salvo localmente no `LocalStorage` com opção de apagar/deletar entradas.

3. **Fase de Grupos**:
   * Filtro rápido por grupos de A a L para simulação ou listagem pautada.
   * Inputs independentes de gols com botões de salvamento manual ou auto-simulação probabilística individual (usa o "Fator de Força" de cada elenco).
   * Botão de Simulação em Lote para resolver toda a fase de grupos automaticamente.

4. **Chaveamento do Mata-Mata oficial (Jogos 73 a 104)**:
   * Algoritmo inteligente que calcula automaticamente o avanço das 32 equipes:
     * **Top 2 colocados** de cada grupo (24 equipes).
     * **Os 8 melhores terceiros colocados** avaliados pelo ranking geral inter-grupos.
   * Mapeamento fiel das semifinais, decisão de bronze e a grandiosa Final em Nova York.
   * Suporte completo a prorrogações/decisão por pênaltis interativas e manual em caso de empate nos playoffs.

5. **Estatísticas Avançadas**:
   * Métricas de artilharia: total de gols marcados e média geral de gols por partida.
   * Identificador do Melhor Ataque (mais gols feitos) e Pior Defesa (mais gols vazados).
   * Gráfico de Forças Técnicas das 5 melhores seleções no ranking oficial.

---

## 💻 Estrutura Tecnológica

* **React 19** com **TypeScript** para máxima tipagem estática e segurança do código.
* **Vite** para empacotamento ultrarrápido com Hot Reloading nativo.
* **Tailwind CSS v4** para construção de layouts responsivos sem arquivos adicionais de folha de estilo.
* **Lucide React** para vetorização e entrega de ícones nítidos de interface.
* **LocalStorage** para controle persistente das partidas e previsões registradas.

---

## 🛠️ Como rodar o projeto localmente

Siga o passo a passo abaixo para executar o simulador na sua máquina:

### 1. Clonar o repositório
```bash
git clone <url-do-seu-repositorio>
cd world-cup-2026-predictor
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
```
O projeto abrirá automaticamente na porta configurada pelo Vite (Geralmente `http://localhost:3000`).

### 4. Executar testes e checagem de tipos (Linter)
```bash
npm run lint
```

### 5. Compilar para Produção
```bash
npm run build
```
Os arquivos estáticos compilados serão salvos na pasta `/dist`, prontos para distribuição.

---

## ☁️ Guia de Deploy na Vercel

Por ser um projeto puramente estático, o deploy na Vercel é extremamente rápido e gratuito.

### Método 1: Via Vercel CLI (Prompt de Comando)
1. Instale a CLI globalmente:
   ```bash
   npm install -g vercel
   ```
2. Na raiz do projeto, execute o comando:
   ```bash
   vercel
   ```
3. Responda às perguntas no terminal (vincule à sua conta, confirme o nome do projeto).
4. O build estático da Vercel identificará automaticamente as configurações do Vite e fará o upload dos arquivos contidos em `/dist`.
5. Para publicar em ambiente de produção definitivo, execute:
   ```bash
   vercel --prod
   ```

### Método 2: Integrando com o GitHub (Recomendado)
1. Crie um repositório no seu GitHub pessoal e envie o código para lá.
2. Acesse o painel da [Vercel](https://vercel.com/) e faça login com sua conta do GitHub.
3. Clique em **"Add New" > "Project"**.
4. Importe o repositório do predictor que você criou.
5. Nas configurações do projeto, certifique-se que o framework está listado como **Vite** e os comandos definidos são:
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
6. Clique em **"Deploy"**. Prontinho! Cada push na sua branch principal atualizará o site automaticamente de forma instantânea.
