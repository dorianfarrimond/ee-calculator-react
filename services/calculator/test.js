import calculator from '.';

describe('calculator', () => {
	// todo: test cases

	it('should add numbers', () => {
		expect(calculator(1, '+', 1)).toBe(2);
		expect(calculator(-11, '+', 1)).toBe(-10);
	});

	it('should subtract numbers', () => {
		expect(calculator(10, '-', 5)).toBe(5);
		expect(calculator(5, '-', 10)).toBe(-5);
	});

	it('should multiply numbers', () => {
		expect(calculator(21, '*', 3)).toBe(63);
		expect(calculator(0, '*', 1)).toBe(0);
	});

	it('should divide numbers', () => {
		expect(calculator(21, '/', 3)).toBe(7);
		expect(calculator(21, '/', 4)).toBe(5.25);
	});
});