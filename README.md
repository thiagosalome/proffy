<!-- Logo -->
<p align="center">
  <img src="./.github/logo.png" alt="Proffy" title="Proffy">
</p>

<!-- Badges -->
<p align="center">
  <img src="https://img.shields.io/badge/Next%20Level%20Week-1.0-8257E5" alt="Next Level Week - 1.0" title="Next Level Week - 1.0">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/thiagosalome/proffy?color=8257E5">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/thiagosalome/proffy?color=8257E5">
  <img alt="GitHub package.json version badge" src="https://img.shields.io/github/downloads/thiagosalome/proffy/total?color=8257E5">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-8257E5?color=8257E5">
</p>

<!-- Indice-->
<p align="center">
 <a href="#computer-sobre">Sobre</a> •
 <a href="#gear-funcionalidades">Funcionalidades</a> •
 <a href="#wrench-tecnologias-utilizadas">Tecnologias</a> •
 <a href="#art-layout">Layout</a> •  
 <a href="#movie_camera-preview">Preview</a> •
 <a href="#rocket-executando-o-projeto">Executando</a> •
 <a href="#memo-licença">Licença</a>
</p>

## :computer: Sobre

O **Proffy** foi criado com o intuito de ser uma aplicação que conecta professores compartilhar seus conhecimentos em determinadas matérias, e alunos com interesse de aprendê-las. Ele foi um projeto desenvolvido durante a **Next Level Week 2**, um evento organizado pela Rocketseat que busca no período de uma semana a criação de uma aplicação completa, englobando as partes web, mobile e server.

## :gear: Funcionalidades

### Web

- [x] Cadastro de aulas
  - [x] Dados do professor
    - [x] Nome completo
    - [x] Avatar
    - [x] WhatsApp
    - [x] Biografia
  - [x] Sobre a aula
    - [x] Matéria - Artes, Biologia, Ciências, Educação Física, Geografia, História, Matemática, Português, Química
    - [x] Custo da hora por aula
  - [x] Horários disponíveis
    - [x] Dia da semana
    - [x] Horário inicial
    - [x] Horário final
- [x] Visualizar aulas
  - [x] Filtradas por
    - [x] Matéria
    - [x] Dia da semana
    - [x] Hora

### Mobile

- [x] Visualizar aulas
  - [x] Filtradas por
    - [x] Matéria
    - [x] Dia da semana
    - [x] Hora

## :wrench: Tecnologias Utilizadas

<table>
  <tbody>
    <tr>
      <td align="center">
        <img src="https://raw.githubusercontent.com/thiagosalome/technologies-icons/master/html.png" width='50' alt="HTML">
        <p>HTML</p>
      </td>
      <td align="center">
        <img src="https://raw.githubusercontent.com/thiagosalome/technologies-icons/master/css.png" width='50' alt="CSS">
        <p>CSS</p>
      </td>
      <td align="center">
        <img src="https://raw.githubusercontent.com/thiagosalome/technologies-icons/master/typescript.png" width='50' alt="TypeScript">
        <p>Typescript</p>
      </td>
      <td align="center">
        <img src="https://raw.githubusercontent.com/thiagosalome/technologies-icons/master/react-base.png" width='50' alt="React">
        <p>React</p>
      </td>
      <td align="center">
        <img src="https://raw.githubusercontent.com/thiagosalome/technologies-icons/master/react-native.png" width='50' alt="React Native">
        <p>React Native</p>
      </td>
      <td align="center">
        <img src="https://raw.githubusercontent.com/thiagosalome/technologies-icons/master/node.png" width='50' alt="Node.js">
        <p>Node.js</p>
      </td>
      <td align="center">
        <img src="https://raw.githubusercontent.com/thiagosalome/technologies-icons/master/sqlite.png" width='50' alt="SQLite">
        <p>SQLite</p>
      </td>
      <td align="center">
        <img src="https://raw.githubusercontent.com/thiagosalome/technologies-icons/master/knex.png" width='50' alt="knex">
        <p>knex</p>
      </td>
    </tr>
  </tbody>
</table>

## :art: Layout

### Web - [Figma](https://www.figma.com/file/piNqrtMXOnpbbiKD2RLazW/Proffy?node-id=302352%3A871)

<img src="./.github/layout-web.png" alt="Layout Web" title="Layout Web">

### Mobile - [Figma](https://www.figma.com/file/piNqrtMXOnpbbiKD2RLazW/Proffy?node-id=302352%3A1588)

<img src="./.github/layout-mobile.png" alt="Layout Mobile" title="Layout Mobile">

## :movie_camera: Preview

### Web

<img src="./.github/preview-web.gif" alt="Preview Web" title="Preview Web">

### Mobile

<img width="200" src="./.github/preview-mobile.gif" alt="Preview Mobile" title="Preview Mobile">

## :rocket: Executando o projeto

### Pré-requisitos

Para executar o projeto é necessário ter instalado as seguintes ferramentas:

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href='https://git-scm.com/downloads' target='_blank'>
          <img src="https://raw.githubusercontent.com/thiagosalome/technologies-icons/master/git.png" width='50' alt="React">
          <p>GIT</p>
        </a>
      </td>
      <td>
        <a href='https://git-scm.com/downloads' target='_blank'>
          <img src="https://raw.githubusercontent.com/thiagosalome/technologies-icons/master/node.png" width='50' alt="React">
          <p>Node.js</p>
        </a>
      </td>
    </tr>
  </tbody>
</table>

### Rodando o servidor

**OBS:** Necessário estar rodando para executar a parte web e mobile

```bash
# Clone este repositório
$ git clone https://github.com/thiagosalome/proffy

# Acesse a pasta do projeto
$ cd proffy

# Vá para a pasta server
$ cd server

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3333 - acesse http://localhost:3333
```

### Rodando aplicação web

```bash
# Clone este repositório
$ git clone https://github.com/thiagosalome/proffy

# Acesse a pasta do projeto no seu terminal/cmd
$ cd proffy

# Vá para a pasta da aplicação Front End
$ cd web

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run start

# A aplicação será aberta na porta:3000 - acesse http://localhost:3000
```

### Rodando aplicação mobile

**OBS:** Necessário ter o Expo instalado em seu dispositivo mobile ou no emulador.

```bash
# Clone este repositório
$ git clone https://github.com/thiagosalome/proffy

# Acesse a pasta do projeto no seu terminal/cmd
$ cd proffy

# Vá para a pasta da aplicação Front End
$ cd mobile

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run start

# A aplicação será aberta na porta:3000 - acesse http://localhost:3000
```

## :memo: Licença

Este projeto esta sobe a licença [MIT](./LICENCE).
