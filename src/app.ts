import cors from 'cors';
import express from 'express';
import { StudentRoute } from './app/config/modules/student/student.route';
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/students', StudentRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
