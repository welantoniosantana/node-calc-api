import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('API HTTP', () => {
    it('GET /add', async () => {
        const res = await request(app).get('/add?a=2&b=3');
        expect(res.statusCode).toBe(200);
        expect(res.body.result).toBe(5);
    });

    it('GET /div com erro (b=0)', async () => {
        const res = await request(app).get('/div?a=1&b=0');
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBeDefined();
    });

    it('POST /calc', async () => {
        const res = await request(app)
        .post('/calc')
        .send({ op: 'mul', a: 6, b: 7 })
        .set('Content-Type', 'application/json');
        expect(res.statusCode).toBe(200);
        expect(res.body.result).toBe(42);
    });
});