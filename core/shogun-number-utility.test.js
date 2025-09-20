import { ShogunNumberUtility } from './shogun-number-utility.js';

describe('ShogunNumberUtility', () => {
    let utility;

    beforeEach(() => {
        utility = new ShogunNumberUtility();
    });

    describe('getRandomIntegerNumber', () => {
        it('should return number within range for positive numbers', () => {
            const result = utility.getRandomIntegerNumber(1, 10);
            expect(result).toBeGreaterThanOrEqual(1);
            expect(result).toBeLessThan(10);
            expect(Number.isInteger(result)).toBe(true);
        });

        it('should return number within range for negative numbers', () => {
            const result = utility.getRandomIntegerNumber(-10, -1);
            expect(result).toBeGreaterThanOrEqual(-10);
            expect(result).toBeLessThan(-1);
            expect(Number.isInteger(result)).toBe(true);
        });

        it('should return number within range crossing zero', () => {
            const result = utility.getRandomIntegerNumber(-5, 5);
            expect(result).toBeGreaterThanOrEqual(-5);
            expect(result).toBeLessThan(5);
            expect(Number.isInteger(result)).toBe(true);
        });

        it('should handle single number range', () => {
            const result = utility.getRandomIntegerNumber(5, 6);
            expect(result).toBe(5);
        });

        it('should handle edge case with zero', () => {
            const result = utility.getRandomIntegerNumber(0, 1);
            expect(result).toBe(0);
        });

        it('should handle large range', () => {
            const result = utility.getRandomIntegerNumber(0, 1000000);
            expect(result).toBeGreaterThanOrEqual(0);
            expect(result).toBeLessThan(1000000);
            expect(Number.isInteger(result)).toBe(true);
        });

        it('should throw error when fromInclusive equals toExclusive', () => {
            expect(() => utility.getRandomIntegerNumber(5, 5))
                .toThrow('fromInclusive must be less than toExclusive');
        });

        it('should throw error when fromInclusive greater than toExclusive', () => {
            expect(() => utility.getRandomIntegerNumber(10, 5))
                .toThrow('fromInclusive must be less than toExclusive');
        });

        it('should return different numbers on multiple calls with larger range', () => {
            const results = new Set();
            // Используем больший диапазон для увеличения вероятности разных чисел
            for (let i = 0; i < 50; i++) {
                results.add(utility.getRandomIntegerNumber(1, 100));
            }
            // В диапазоне 1-100 с 50 вызовами почти гарантированно будут разные числа
            expect(results.size).toBeGreaterThan(1);
        });

        it('should handle decimal inputs by converting to integers', () => {
            const result = utility.getRandomIntegerNumber(1.5, 10.7);
            expect(result).toBeGreaterThanOrEqual(1);
            expect(result).toBeLessThan(10);
        });

        it('should throw error when first parameter is not a number', () => {
            expect(() => utility.getRandomIntegerNumber('5', 10))
                .toThrow('Both parameters must be numbers');
        });

        it('should throw error when second parameter is not a number', () => {
            expect(() => utility.getRandomIntegerNumber(5, '10'))
                .toThrow('Both parameters must be numbers');
        });

        it('should throw error when both parameters are not numbers', () => {
            expect(() => utility.getRandomIntegerNumber('1', '10'))
                .toThrow('Both parameters must be numbers');
        });

        it('should throw error when parameter is NaN', () => {
            expect(() => utility.getRandomIntegerNumber(NaN, 10))
                .toThrow('Parameters must be finite numbers');
        });

        it('should throw error when parameter is Infinity', () => {
            expect(() => utility.getRandomIntegerNumber(1, Infinity))
                .toThrow('Parameters must be finite numbers');
        });

        it('should throw error when parameter is -Infinity', () => {
            expect(() => utility.getRandomIntegerNumber(-Infinity, 10))
                .toThrow('Parameters must be finite numbers');
        });

        // Альтернативный тест для проверки распределения
        it('should cover all possible values in small range', () => {
            const possibleValues = new Set();
            // Для маленького диапазона проверим, что все значения могут быть получены
            for (let i = 0; i < 1000; i++) {
                possibleValues.add(utility.getRandomIntegerNumber(0, 3));
            }
            // Должны получить все возможные значения: 0, 1, 2
            expect(possibleValues.size).toBe(3);
            expect(possibleValues.has(0)).toBe(true);
            expect(possibleValues.has(1)).toBe(true);
            expect(possibleValues.has(2)).toBe(true);
        });
    });
});