import { Router } from "express";

const todoRoutes = () => {
  const router = new Router();
  const todos = [{ id: 1, text: "server-fetched todo" }];

  router.get("/api/todos", (_req: any, res: any) => {
    setTimeout(() => {
      res.json(todos);
    }, 300);
  });

  router.post("/api/todos", (req: any, res: any) => {
    const newTodo = req.body;
    newTodo.id = Date.now();

    todos.push(newTodo);

    setTimeout(() => {
      res.json(newTodo);
    }, 100);
  });

  return router;
};

export default todoRoutes;
