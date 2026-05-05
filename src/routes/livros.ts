import { Router, Request, Response } from 'express';
import { db } from '../database/db';

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const livros = await db.livro.findMany({
            include: {
                genero: true
            }
        });

        res.json(livros);
    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao buscar livros'
        });
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const {titulo, generoId} = req.body;

        if (!titulo || !generoId) {
            return res.status(400).json({
                erro: 'Título e gênero são obrigatórios'
            });
        }

        const livro = await db.livro.create({
            data: {
                titulo,
                generoId
            },
            include: {
                genero: true
            }
        });

        res.status(201).json(livro);
    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao criar livro'
        });
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const {titulo, generoId} = req.body;

        if (!titulo || !generoId) {
            return res.status(400).json({
                erro: 'Título e gênero são obrigatórios'
            });
        }

        const livroExistente = await db.livro.findUnique({
            where: { id }
        });

        if (!livroExistente) {
            return res.status(404).json({
                erro: 'Livro não encontrado'
            });
        }

        const livroAtualizado = await db.livro.update({
            where: { id },
            data: {
                titulo,
                generoId
            },
            include: {
                genero: true
            }
        });

        res.json(livroAtualizado);
    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao atualizar livro'
        });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const livroExistente = await db.livro.findUnique({
            where: { id }
        });

        if (!livroExistente) {
            return res.status(404).json({
                erro: 'Livro não encontrado'
            });
        }

        await db.livro.delete({
            where: { id }
        });

        res.status(204).send();
    } catch (error) {
        res. status(500).json({
            erro: 'Erro ao deletar o livro'
        });
    }
})

export default router;