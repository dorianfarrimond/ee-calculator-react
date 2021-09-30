const calculator = (value, operator, operand) => {
	switch (operator) {
		case '+':
			return value + operand;

		case '-':
			return value - operand;

		case '*':
			return value * operand;

		case '/':
			return value / operand;

		default:
			throw new Error('unsupported operator')

	}
}

export default calculator;
