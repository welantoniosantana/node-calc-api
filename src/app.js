import express from 'express';
import { z } from 'zod';
import { add, sub, mul, div } from './math.js';


const app = express();
app.use(express.json());


const querySchema = z.object({
    a: z.coerce.number(),
    b: z.coerce.number()
});


app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});


app.get('/add', (req, res) => {
    const { a, b } = querySchema.parse(req.query);
    return res.json({ result: add(a, b) });
});


app.get('/sub', (req, res) => {
    const { a, b } = querySchema.parse(req.query);
    return res.json({ result: sub(a, b) });
});


app.get('/mul', (req, res) => {
    const { a, b } = querySchema.parse(req.query);
    return res.json({ result: mul(a, b) });
});


app.get('/div', (req, res) => {
    try {
        const { a, b } = querySchema.parse(req.query);
        return res.json({ result: div(a, b) });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});


// endpoint JSON genérico
const bodySchema = z.object({
    op: z.enum(['add', 'sub', 'mul', 'div']),
    a: z.number(),
    b: z.number()
});


app.post('/calc', (req, res) => {
    try {
        const { op, a, b } = bodySchema.parse(req.body);
        const ops = { add, sub, mul, div };
        const result = ops[op](a, b);
        return res.json({ result });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});


export default app;