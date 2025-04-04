# 🎓 Gestão de Cursos (Frontend - Angular)

Aplicação web desenvolvida em **Angular** para gerenciar **alunos** e **cursos**, com integração a uma API backend (Quarkus). Permite listar, cadastrar e excluir cursos e alunos, bem como gerenciar a relação entre eles.

## 🚀 Tecnologias Utilizadas

- [Angular CLI 19.2.5](https://github.com/angular/angular-cli)
- [TypeScript](https://www.typescriptlang.org/)
- [RxJS](https://rxjs.dev/)
- [Bootstrap](https://getbootstrap.com/)
- [Angular Material](https://material.angular.io/)
- Integração com API REST (Quarkus)

---

## 📦 Funcionalidades

- 🔍 Listar cursos e alunos
- ➕ Cadastrar novos alunos e cursos
- ❌ Excluir com validação (ex: não remover cursos com alunos vinculados)
- 🔗 Associar múltiplos cursos a um aluno e vice-versa (relacionamento muitos-para-muitos)
- 📢 Exibir modais de confirmação para ações sensíveis

---

## 🛠️ Como executar o projeto

### 1. Clone o repositório
```bash
git clone https://github.com/leanford/gestao-cursos-web
cd gestao-cursos-app
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o ambiente

Edite o arquivo `src/environments/environment.ts` com a URL da API backend:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

### 4. Inicie o servidor de desenvolvimento

```bash
ng serve
```

Acesse no navegador:  
[http://localhost:4200](http://localhost:4200)

---

## 🌐 Backend (Quarkus)

### 5. Clone e execute o backend

```bash
git clone https://github.com/leanford/gestao-cursos-api
cd gestao-cursos-api
./mvnw quarkus:dev
```

A API ficará disponível em:  
[http://localhost:8080/api](http://localhost:8080/api)

---

## ✍️ Autor

Desenvolvido por Leandro Alves (https://github.com/leanford) com 💙  
Contribuições, sugestões e melhorias são sempre bem-vindas!
