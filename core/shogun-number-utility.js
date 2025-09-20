export class ShogunNumberUtility {
    getRandomIntegerNumber(fromInclusive, toExclusive) {
        if (typeof fromInclusive !== 'number' || typeof toExclusive !== 'number') {
            throw new Error('Both parameters must be numbers');
        }

        if (!Number.isFinite(fromInclusive) || !Number.isFinite(toExclusive)) {
            throw new Error('Parameters must be finite numbers');
        }

        if (fromInclusive >= toExclusive) {
            throw new Error('fromInclusive must be less than toExclusive');
        }

        return Math.floor(Math.random() * (toExclusive - fromInclusive)) + fromInclusive;
    }
}