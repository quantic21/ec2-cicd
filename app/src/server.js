const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello from ECS Fargate + GitHub Actions!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});