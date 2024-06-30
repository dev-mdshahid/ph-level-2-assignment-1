import express, { Request, Response } from 'express';
import config from './config';
import cors from 'cors';
import { UserRouter } from './modules/user/user.route';

// creating an instance of app
const app = express();

// parsers
app.use(express.json());
app.use(cors());

// application routers
app.use('/api/users', UserRouter);

// root endpoint of the app
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is running at port ' + config.port,
  });
});

export default app;
