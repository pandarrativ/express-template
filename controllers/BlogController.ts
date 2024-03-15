import { Request, Response } from 'express';
import Blog, { IBlog } from '../models/Blog';

class BlogController {
  public async getAllBlogs(req: Request, res: Response): Promise<void> {
    try {
      const blogs: IBlog[] = await Blog.find() || [];
      res.json(blogs);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message || err.toString()});
    }
  };
  
  public async createBlog(req: Request, res: Response): Promise<void> {
    try {
      const { title, content } = req.body;
      const newBlog: IBlog = new Blog({ title, content });
      await newBlog.save();
      res.status(201).json(newBlog);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message || err.toString()});
    }
  };
}

export default BlogController;
