# TELEGRAM DATING APP

DEMO: https://match-tg.netlify.app/  (resize screen for smarphone size)
[![match-tg-netlify-app-i-Phone-12-Pro-3.png](https://i.postimg.cc/kgg03Tdv/match-tg-netlify-app-i-Phone-12-Pro-3.png)](https://postimg.cc/yk2Q0XxD)
[![match-tg-netlify-app-i-Phone-12-Pro.png](https://i.postimg.cc/QNnNyK7P/match-tg-netlify-app-i-Phone-12-Pro.png)](https://postimg.cc/V5ncS6DB)
[![match-tg-netlify-app-i-Phone-12-Pro-1.png](https://i.postimg.cc/c4y1WyDM/match-tg-netlify-app-i-Phone-12-Pro-1.png)](https://postimg.cc/yWjCh5Ck)
[![match-tg-netlify-app-i-Phone-12-Pro-2.png](https://i.postimg.cc/3wdQpnSx/match-tg-netlify-app-i-Phone-12-Pro-2.png)](https://postimg.cc/8FQYgBg2)

to run

```bash
npm i
npm run dev
```


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
