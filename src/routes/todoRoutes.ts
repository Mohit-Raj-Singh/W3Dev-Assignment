import express, { Request, Response } from 'express';
import ToDo, { IToDo } from '../models/ToDo';

const router = express.Router();


router.get('/', async (req: Request, res: Response) => {
  try {
    const todos: IToDo[] = await ToDo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/', async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const newTodo: IToDo = new ToDo({ title });
    const savedTodo: IToDo = await newTodo.save();
    res.json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const updatedTodo: IToDo | null = await ToDo.findByIdAndUpdate(
      id,
      { completed },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTodo: IToDo | null = await ToDo.findByIdAndRemove(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
