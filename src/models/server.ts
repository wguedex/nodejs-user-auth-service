import express, { Request, Response } from 'express';

class Server {
  private app: express.Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

    this.configureRoutes();
    this.startServer();
  }

  private configureRoutes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      res.send('Hello, world!');
    });
  }

  private startServer(): void {
    this.app.listen(this.port, () => {
      console.log(`Express server listening on port ${this.port}`);
    });
  }
}

export default Server;
