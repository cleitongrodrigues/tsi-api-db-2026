import { Router, type Request, type Response } from "express";
import { db } from "../database/db";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const generos = await db.genero.findMany({
            orderBy: { id: "asc" },
        });

        res.json(generos);
    } catch {
        res.status(500).json({ erro: "Erro ao buscar gêneros" });
    }
});

router.post("/", async (req: Request, res: Response) => {
    const { nome } = req.body;

    if (!nome || nome.trim() === "") {
        return res.status(400).json({ erro: "O nome do gênero é obrigatório." });
    }

    try {
        const genero = await db.genero.create({
            data: { nome: nome.trim() },
        });

        res.status(201).json(genero);
    } catch {
        res.status(500).json({ erro: "Erro ao cadastrar gênero." });
    }
});

router.put("/:id", async (req : Request, res: Response) => {
    const id = Number(req.params.id);
    const { nome } = req.body;

    if (!nome || nome.trim() === "") {
        return res.status(400).json({ erro: "O nome do gênero é obrigatório." });
    }

    try {
        const generoExistente = await db.genero.findUnique({ where: { id } });

        if (!generoExistente) {
            return res.status(404).json({ erro: "Gênero não encontrado" });
        }

        const generoAtualizado = await db.genero.update({
            where: { id },
            data: { nome: nome.trim() },
        });

        res.json(generoAtualizado);
    } catch {
        res.status(500).json({ erro: "Erro ao atualizar gênero." });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
        const generoExistente = await db.genero.findUnique({ where: { id } });

        if (!generoExistente) {
            return res.status(404).json({ erro: "Gênero não encontrado" });
        }

        await db.genero.delete({ where: { id } });

        res.status(204).send();
    } catch {
        res.status(500).json({ erro: "Erro ao excluir gênero." });
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
        const genero = await db.genero.findUnique({ where: { id } });

        if (!genero) {
            return res.status(404).json({ erro: "Gênero não encontrado" });
        }

        res.json(genero);
    } catch {
        res.status(500).json({ erro: "Erro ao buscar gênero." });
    }
});

export default router;