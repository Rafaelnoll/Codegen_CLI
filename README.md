# 🏗️ Codegen

O **Codegen** é uma ferramenta de linha de comando (CLI) que facilita a criação rápida de **domínios de repository, service e factory** em projetos Node.js.
Com apenas um comando, você pode gerar a estrutura base do seu projeto de forma padronizada e escalável.

---

## 📦 Instalação

Instale o pacote globalmente via NPM:

```bash
npm install -g codegen-cli
```

Agora o comando `codegen` estará disponível no seu terminal.

---

## 📖 Uso

A CLI possui o comando principal `skeleton`, que cria a estrutura de um domínio.

### Criar um único domínio

```bash
codegen skeleton --component-name product
```

ou de forma reduzida:

```bash
codegen skeleton -c product
```

Isso irá gerar a estrutura de **repository**, **service** e **factory** para o domínio `product`.

---

### Criar múltiplos domínios

Você pode criar vários domínios de uma vez:

```bash
codegen skeleton -c product -c person -c colors
```

---

## 📂 Estrutura gerada

Ao executar o comando, o Codegen cria a seguinte estrutura para cada domínio:

```
src/
 └── product/
      ├── product.repository.js
      ├── product.service.js
      └── product.factory.js
```

Para múltiplos domínios, cada um terá sua própria pasta:

```
src/
 ├── product/
 │    ├── product.repository.js
 │    ├── product.service.js
 │    └── product.factory.js
 │
 ├── person/
 │    ├── person.repository.js
 │    ├── person.service.js
 │    └── person.factory.js
 │
 └── colors/
      ├── colors.repository.js
      ├── colors.service.js
      └── colors.factory.js
```

---

## ⚙️ Opções disponíveis

| Opção             | Alias | Tipo   | Obrigatório | Descrição                                    |
|-------------------|-------|--------|-------------|----------------------------------------------|
| `--component-name` | `-c`  | array  | ✅          | Nome(s) dos componentes/domínios a serem criados |

---

## 📌 Exemplos de uso

- Criar um domínio chamado `order`:

```bash
codegen skeleton -c order
```

- Criar três domínios de uma vez (`order`, `user`, `invoice`):

```bash
codegen skeleton -c order -c user -c invoice
```

---

## 📜 Ajuda

Para ver todas as opções disponíveis:

```bash
codegen --help
```

---

## 🛠️ Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [Yargs](https://yargs.js.org/)


---

## 📄 Licença

Este projeto está sob a licença **MIT**.
