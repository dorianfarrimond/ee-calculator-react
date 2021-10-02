import React, { useState } from 'react';

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
		if (mode === MODES.VALUE) {
			setValue(newValue);
		} else {
			setOperand(newValue);
		}
	}

	const handleOperator = op => {
		setOperator(op);
		setMode(MODES.OPERAND)
	}

	const handleEquals = () => {

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
