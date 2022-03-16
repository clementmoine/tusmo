import express from 'express';

const PORT = 8000;
const HOST = '0.0.0.0';

const app = express();

export interface DemoResponse {
  foo: string;
}

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/demo', (_, res) => {
  const response: DemoResponse = { foo: 'bar' };

  res.json(response);
});

app.listen(8000, () => {
  console.log(`[server] Listening at http://${HOST}:${PORT}`);
});
