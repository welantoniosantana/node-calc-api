import { describe, it, expect } from 'vitest';
import { add, sub, mul, div } from '../src/math.js';


describe('math', () => {
    it('add', () => {
        expect(add(3, 3)).toBe(6);
    });
    it('sub', () => {
        expect(sub(5, 3)).toBe(2);
    });
    it('mul', () => {
        expect(mul(4, 3)).toBe(12);
    });
    it('div', () => {
        expect(div(10, 2)).toBe(5);
    });
    it('div por zero lança erro', () => {
        expect(() => div(1, 0)).toThrow('Divisão por zero não é permitida');
    });
});