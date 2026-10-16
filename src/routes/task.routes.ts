import { Router } from "express";
import prisma from "../lib/prisma"; 

const router = Router();

// Router for creating tasks

router.post('/', async (req, res) => {

    try {
        const { title, description, priority, dueDate } = req.body;
    
        if(!title || typeof title !== "string" || !title.trim) {
            return res.status(400).json({ error : "Title is required"})
        }
    
        const task = await prisma.task.create({
            data: {
                title: title.trim(),
                description,
                priority,
                dueDate: dueDate ? new Date(dueDate) : undefined,
            },
        })
    
        return res.status(201).json(task)
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Failed to creat task" })
    }
});

// Router for previewing the tasks

router.get('/', async (_req, res) => {
    try {
        const tasks = await prisma.task.findMany()
    
        return res.status(200).json(tasks)
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Failed to fetch tasks"})
    }

})

// Router for previewing the specific tasks

router.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)
        if(!Number.isInteger(id) || id <= 0){
            return res.status(400).json({ error: "Invalid task Id"})
        }

        const task = await prisma.task.findUnique({
            where: { id }
        })

        if(!task) {
            return res.status(404).json({ error: "Task not found"})
        }

        return res.status(200).json(task)

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to fetch task"})
    }
})

// Router for updating tasks

router.patch('/:id', async (req, res) => {
    try {
        
        const id = Number(req.params.id);
        if(!Number.isInteger(id) || id <= 0){
            return res.status(400).json({ error: "Invalid task Id "})
        }

        const {title, description, status, priority, dueDate} = req.body;
        const task =await prisma.task.update({
            where: { id },
            data: {
                ...(title !== undefined && { title }),
                ...(description !== undefined && { description }),
                ...(status !== undefined && { status }),
                ...(priority !== undefined && { priority }),
                ...(dueDate !== undefined && { dueDate: dueDate ? new Date(dueDate) : null })
            }
        })
        
        return res.status(200).json(task)
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to fetch task"})
    }

})

// Router for deleting the tasks

router.delete('/:id', async (req, res) => {

    try {
        const id = Number(req.params.id);
        if(!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({error: "Invalid task Id"})
        }
    
        const task = await prisma.task.delete({
            where: { id },
        })
        
        return res.status(200).json({
            message:"Task deleted successfully",
            task
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Failed to fetch task"})
    }
})

export default router;