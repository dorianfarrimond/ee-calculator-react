import React, { useState } from 'react';
import calculator from '../../services/calculator';

const MODES = {
	VALUE: 'VALUE',
	OPERAND: 'OPERANT'
};

const Calculator = () => {
	const [mode, setMode] = useState(MODES.VALUE);
	const [value, setValue] = useState(0);
	const [operand, setOperand] = useState(0);
	const [operator, setOperator] = useState(null);

	const handleChange = (newValue) => {
		const parsedValue = parseInt(newValue, 10);
		if (mode === MODES.VALUE) {
			setValue(parsedValue);
		} else {
			setOperand(parsedValue);
		}
	}

	const handleOperator = op => {
		setOperand(value);
		setOperator(op);
		setMode(MODES.OPERAND)
	}

	const handleEquals = () => {
		setValue(calculator(value, operator, operand));
		setMode(MODES.VALUE);
	}

	return (
		<div>
			<input
				type="text"
				value={mode === MODES.VALUE ? value : operand}
				onChange={({target: { value }}) => handleChange(value)}
			/>

			<button onClick={() => handleOperator('+')}>+</button>
			<button onClick={() => handleOperator('-')}>-</button>
			<button onClick={() => handleOperator('*')}>*</button>
			<button onClick={() => handleOperator('/')}>/</button>

			<button onClick={handleEquals}>=</button>
		</div>
	);
}

export default Calculator;
