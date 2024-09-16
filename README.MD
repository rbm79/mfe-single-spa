# Projeto Single-SPA Micro Frontend

Este projeto demonstra uma arquitetura de Micro Frontend utilizando o framework Single-SPA. Ele consiste em uma aplicação principal que orquestra múltiplas aplicações menores (micro frontends), permitindo o desenvolvimento, teste e implantação independentes de cada parte da aplicação.

## Estrutura do Projeto

```plaintext
single-spa-project/
│
├── root-config/        # Configuração principal do Single-SPA
├── navbar/             # Micro frontend para a barra de navegação
├── app1/               # Micro frontend da Aplicação 1
├── app2/               # Micro frontend da Aplicação 2
└── shared/             # Componentes e utilidades compartilhadas
```

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (geralmente vem com Node.js)

## Instalação

1. Clone o repositório:

   ```bash
   git clone [URL DESSE REPOSITORIO]
   cd single-spa-project
   ```

2. Instale as dependências para cada aplicação:

   ```bash
   cd root-config && npm install
   cd ../navbar && npm install
   cd ../app1 && npm install
   cd ../app2 && npm install
   cd ../shared && npm install
   ```

## Configuração

Cada micro frontend e a configuração root têm seus próprios arquivos de configuração. Certifique-se de que os arquivos `webpack.config.js` e `package.json` estejam configurados corretamente em cada diretório.

## Executando o Projeto

1. Inicie cada aplicação em um terminal separado:

   **Terminal 1 (Root Config):**
   ```bash
   cd root-config
   npm start
   ```

   **Terminal 2 (Navbar):**
   ```bash
   cd navbar
   npm start
   ```

   **Terminal 3 (App1):**
   ```bash
   cd app1
   npm start
   ```

   **Terminal 4 (App2):**
   ```bash
   cd app2
   npm start
   ```

2. Acesse a aplicação em [http://localhost:9000](http://localhost:9000) no seu navegador.

## Arquitetura Single-SPA

O Single-SPA permite a criação de micro frontends que coexistem na mesma página. Principais conceitos:

1. **Root Config**: Orquestra os micro frontends, definindo rotas e carregando as aplicações.
2. **Micro Frontends**: Aplicações independentes que são montadas/desmontadas pelo Single-SPA.
3. **Shared Dependencies**: Dependências compartilhadas entre as aplicações para evitar duplicação.

## Configuração do Single-SPA

### Root Config (root-config/src/index.ejs)

```html
<script type="systemjs-importmap">
{
 "imports": {
   "@org/root-config": "//localhost:9000/org-root-config.js",
   "@org/navbar": "//localhost:8080/org-navbar.js",
   "@org/app1": "//localhost:8081/org-app1.js",
   "@org/app2": "//localhost:8082/org-app2.js"
 }
}
</script>
```

Esta configuração define onde cada micro frontend pode ser encontrado.

### Registrando Aplicações (root-config/src/org-root-config.js)

```javascript
registerApplication({
  name: "@org/navbar",
  app: () => System.import("@org/navbar"),
  activeWhen: ["/"]
});

registerApplication({
  name: "@org/app1",
  app: () => System.import("@org/app1"),
  activeWhen: ["/app1"]
});

registerApplication({
  name: "@org/app2",
  app: () => System.import("@org/app2"),
  activeWhen: ["/app2"]
});
```

Isso registra cada micro frontend com o Single-SPA, definindo quando cada um deve ser ativo.

### Desenvolvimento de Micro Frontends

Cada micro frontend é uma aplicação independente que exporta funções de ciclo de vida do Single-SPA:

```javascript
export function bootstrap(props) { ... }
export function mount(props) { ... }
export function unmount(props) { ... }
```

## Próximos Passos

- Implementar autenticação e autorização centralizadas.
- Adicionar testes end-to-end para a integração dos micro frontends.
- Configurar um pipeline de CI/CD para cada micro frontend e para o root config.

## Contribuindo

Contribuições são bem-vindas! Por favor, leia as [diretrizes de contribuição](CONTRIBUTING.md) antes de submeter pull requests.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
