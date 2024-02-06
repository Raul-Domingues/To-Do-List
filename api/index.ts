import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import cors from "@fastify/cors";
import axios from "axios";

// import { createTaskSchema, deleteTaskSchema } from "../schemas/task";
const prisma = new PrismaClient();
const app = fastify();
app.register(cors);

//ROTA para criar uma nova tarefa
app.post("/createTask", async (req, res) => {
    try {
        const { title, completed } = req.body as { title: string, completed: boolean };
        console.log('Dados recebidos do frontend:', title, completed);

        const resultado = await prisma.task.create({
            data: {
                title : title,
                completed: completed,
            },
        });
        res.status(201).send(resultado);
    } catch (error) {
        console.log('Erro ao criar tarefa', error)
    }
})

//ROTA para listar todas as tarefas
app.get('/task', async (req, res) => {
    try {
        const tasks = await prisma.task.findMany();
        res.status(200).send(tasks)
    } catch(error) {
        console.log('Erro ao listar tarefas', error)
    }
})

//ROTA para listar uma tarefa
app.get('/task/:id', async (req, res) => {
    try {
        const id = JSON.stringify(req.params);
        const getTask = await prisma.task.findUnique({
            where: {
                id: Number(JSON.parse(id).id)
            }
        })
        res.status(200).send(getTask ? getTask : 'Tarefa não encontrada!')
    } catch(error) {
        console.log('Erro ao listar a tarefa', error)
    }
});

//ROTA para deletar todas as tarefas
app.delete('/deleteAllTasks', async (req, res) => {
    try {
        await prisma.task.deleteMany({
            where: {
                id: {
                    not: 0
                }
            },
        });
        res.status(200).send('Todas as tarefas foram deletadas com sucesso!')
    } catch (error) {
        console.log('Erro ao deletar todas as tarefas', error)
    }
})

//ROTA para deletar uma tarefa
app.delete('/task/:id', async (req, res) => {
    try {
        const id = JSON.stringify(req.params);
        await prisma.task.delete({
            where: {
                id: Number(JSON.parse(id).id)
            }
        })
        res.status(200).send('Tarefa deletada com sucesso!')
    } catch (error) {
        console.log('Erro ao deletar tarefa', error)
    }
});

app.put('/task/:id', async (req, res) => {
    const id = JSON.stringify(req.params);
    const { title, completed } = req.body as { title: string, completed: boolean };

    try {
        await prisma.task.update({
            where: { id: Number(JSON.parse(id).id) },
            data: {
                title,
                completed,
            },
        });
        res.status(201).send('Tarefa atualizada com sucesso!')
    } catch (error) {
        console.log('Erro ao atualizar tarefa', error)
    }
})

app.listen({ port: 3333 }, () => {
    console.log("Server is running on http://localhost:3333");
});