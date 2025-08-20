# 🏗️ Codegen

**Codegen** is a command line interface (CLI) tool that helps you quickly create **repository, service, and factory domains** in Node.js projects.
With just one command, you can generate the base structure of your project in a standardized and scalable way.

---

## 📦 Installation

Install the package globally via NPM:

```bash
npm install -g @rafaelnoll/codegen
```

Now the `codegen` command will be available in your terminal.

---

## 📖 Usage

The CLI provides the main command `skeleton`, which creates the structure for one or more domains.

### Create a single domain

```bash
codegen skeleton --component-name product
```

or using the short alias:

```bash
codegen skeleton -c product
```

This will generate the **repository**, **service**, and **factory** for the `product` domain inside the default folder `src`.

---

### Create multiple domains

```bash
codegen skeleton -c product -c person -c colors
```

This will generate **multiple domains** (`product`, `person`, `colors`) inside the default folder `src`.

---

### Specify a custom main folder

You can override the default `src` folder using the `--main-folder` (or `-f`) option.

- Example with a single domain:

```bash
codegen skeleton -c product --main-folder main
```

- Example with multiple domains:

```bash
codegen skeleton -c product -c person -f main
```

This will generate the domains inside the folder `main` instead of `src`.

---

## 📂 Generated structure

When executing the command, Codegen generates the following structure for each domain:

```
src/
 └── product/
      ├── product.repository.js
      ├── product.service.js
      └── product.factory.js
```

For multiple domains:

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

If you pass `--main-folder main`, the structure will be:

```
main/
 └── product/
      ├── product.repository.js
      ├── product.service.js
      └── product.factory.js
```

---

## ⚙️ Available options

| Option             | Alias | Type   | Required | Default | Description                                                  |
|--------------------|-------|--------|----------|---------|--------------------------------------------------------------|
| `--component-name` | `-c`  | array  | ✅        | -       | Name(s) of the component(s)/domain(s) to be created          |
| `--main-folder`    | `-f`  | string | ❌        | `src`   | Name of the main folder where the domains will be generated  |

---

## 📌 Examples

- Create a single domain named `order` inside `src`:

```bash
codegen skeleton -c order
```

- Create three domains (`order`, `user`, `invoice`) inside `src`:

```bash
codegen skeleton -c order -c user -c invoice
```

- Create a domain inside a custom folder `main`:

```bash
codegen skeleton -c order -f main
```

---

## 📜 Help

To see all available options:

```bash
codegen --help
```

---

## 🛠️ Built with

- [Node.js](https://nodejs.org/)
- [Yargs](https://yargs.js.org/)

---

## 🤝 Contributing

Contributions are welcome!
Feel free to open an **issue** or submit a **pull request**.

---

## 📄 License

This project is licensed under the **MIT License**.
