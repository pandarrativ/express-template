import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import DBConnector from './db/DBConnector';
import BlogController from './controllers/BlogController';

const PORT = process.env.PORT || 5050;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();
app.use('/api/v1', router);

const blogController = new BlogController();
router.get('/blogs', blogController.getAllBlogs);
router.post('/blogs', blogController.createBlog);

async function start() {
  try {
    const dbConnector = new DBConnector(MONGODB_URI);
    await dbConnector.connect();
    app.listen(PORT, () => {
      console.log(`⚡️Listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

start();
