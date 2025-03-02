<p align="center">
  <img src="https://res.cloudinary.com/dvy2e8yoz/image/upload/v1740946691/logo_mkskms.png" alt="EasyCar Logo" width="250">
</p>


## 📌 Descrição do Projeto

O **EasyCar Mobile** é um aplicativo de caronas que conecta passageiros e motoristas. Onde qualquer usuario pode tanto pedir quanto dar uma carona , oferecendo uma maneira conveniente e segura de se deslocar pela cidade. 🌍🚖

---

## 🛠 Tecnologias Utilizadas

### 🎨 Front-End

- **React Native**: Utilizado para desenvolver aplicativos móveis multiplataforma (Android e iOS) com código JavaScript/TypeScript.
- **Expo**: Um framework que simplifica o desenvolvimento, testes e build de apps React Native.
- **React Navigation**: Biblioteca para navegação entre telas no aplicativo.
- **Axios**: Utilizado para realizar requisições HTTP para a API.
- **React Native Maps**: Biblioteca para integração de mapas no app.
- **Expo Location**: Permite a obtenção da localização do usuário para funcionalidades baseadas em geolocalização.

### 💾 Back-End

- **Node.js**: Plataforma que permite executar JavaScript no servidor.
- **Express**: Framework para construção de APIs RESTful de forma simplificada.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar informações do sistema.
- **pg**: Biblioteca para conexão e execução de comandos SQL no PostgreSQL dentro da aplicação Node.js.
- **Cors**: Middleware que permite o compartilhamento de recursos entre diferentes origens (frontend e backend).

### 🚀 Estratégias e Funcionalidades

- **Gerenciamento de Estado**: Utilização dos hooks `useState`, `useEffect` e `useCallback` para controlar os estados do app.
- **Navegação entre telas**: Implementação da navegação de múltiplas telas usando `React Navigation`.
- **Mapas e Localização**: Integração de mapas e obtenção da localização do usuário em tempo real.
- **Comunicação com a API**: Conexão eficiente e segura entre frontend e backend utilizando `Axios`.
- **Segurança**: Implementação de autenticação e autorização para garantir a integridade das informações dos usuários.

---

## ▶ Como Executar o Projeto

### 🔧 Pré-requisitos

- **Node.js** instalado
- **VSCode** instalado
- **Expo CLI** instalado (`npm install -g expo-cli`)
- **PostgreSQL** instalado e configurado

### 🚀 Passos para Rodar

1️⃣ **Clone o Repositório**

```sh
git clone https://github.com/seu-usuario/easyCar-mobile.git
cd easyCar-mobile
```

2️⃣ **Configuração do Back-End**

```sh
cd easyCar-Back-end
npm install
```

- Configure o banco de dados PostgreSQL, crie o banco de dados e as tabelas atraves dos scripts [aqui](https://mysterious-approval-fa2.notion.site/Banco-de-Dados-1aa1c89527f380be8778ed73681d9d4c?pvs=4). 
- Inicie o servidor:
  ```sh
  node src/indes.js
  ```

3️⃣ **Configuração do Front-End**

```sh
cd ../easyCar-Front-End
npm install
npx expo start
```

- Isso gerará um **QR Code** para rodar o app no celular.

### 📱 Como rodar no celular

📲 **iOS**:

- Use a **câmera** do iPhone para escanear o QR Code exibido pelo Expo.
- Ou abra o link gerado no navegador do iPhone.

📱 **Android**:

- Baixe o **Expo Go** na Play Store.
- Abra o Expo Go e escaneie o QR Code.
- Você também pode usar um **emulador Android** para testar o app.

---

## ❗ Observações

- ✅ Certifique-se de que o servidor **back-end** está rodando antes de iniciar o **front-end**.
- 🔧 Atualize o **endereço IP da API** no arquivo `api.js` do front-end.

---

## 🤝 Contribuição

Quer contribuir? Siga os passos abaixo:

1. **Faça um fork** do projeto.
2. **Crie uma nova branch** (`git checkout -b feature/nova-feature`).
3. **Commit suas alterações** (`git commit -m 'Adiciona nova feature'`).
4. **Envie para o repositório** (`git push origin feature/nova-feature`).
5. **Abra um Pull Request**.

---

## 📜 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo `LICENSE` para mais detalhes. 📝

