import App from './app';

const app = new App();

app.init().listen(process.env.PORT ?? 5000, () => {
  console.info(`App starting at http://localhost:${process.env.PORT ?? 5000}`);
  console.info(`Envs: ${process.env.TARGET ?? 'local'}`);
});
