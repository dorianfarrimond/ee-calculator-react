import React, { useState } from 'react';
import styled from 'styled-components';
import calculator from '../../services/calculator';

const TYPINGMODES = {
	INSERT: 'INSERT',
	APPEND: 'APPEND'
};

const EDITMODES = {
	VALUE: 'VALUE',
	OPERAND: 'OPERAND'
};

const Container = styled.div`
  width: 400px;
  height: 600px;
  background-color: #1795d4;
  padding: 16px;
  border-radius: 16px;
`;

const Logo = styled.img`
  width: 110px;
  margin-bottom: 8px;
`

const DisplayWindow = styled.div`
  margin-top: 16px;
  padding: 8px 4px;
  border: 1px solid grey;
  background-color: white;
  border-radius: 12px;
  
  input {
	font-family: "Courier New";
    display: block;
    width: 100%;
    text-align: right;
	padding: 0;
    font-size: 3rem;
	outline: none;
	border: none;
  }
`;

const Keyboard = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 6px;
  margin-top: 36px;
`;

const Button = styled.button`
  font-size: 3rem;
  padding: 12px;
  border-radius: 8px;
  background-color: white;
  border: none;
  
  &:active {
	opacity: 0.5;
  }
`;

const FunctionButton = styled(Button)`
  background-color: #fed800;	
`;

const EqualsButton = styled(FunctionButton)`
	grid-column: span 2;
`

const BlankButton = styled.div``

const Calculator = () => {
	const [typingMode, setTypingMode] = useState(TYPINGMODES.INSERT);
	const [mode, setMode] = useState(EDITMODES.VALUE);
	const [value, setValue] = useState('0');
	const [operand, setOperand] = useState('0');
	const [operator, setOperator] = useState(null);

	const allClear = () => {
		setTypingMode(TYPINGMODES.INSERT);
		setMode(EDITMODES.VALUE);
		setValue(0);
		setOperand(0);
		setOperator(null);
	}

	const handleDigit = digit => {
		const currentValue = mode === EDITMODES.VALUE ? value : operand;
		const newValue = typingMode === TYPINGMODES.INSERT ? digit : currentValue.toString() + digit.toString();

		if (mode === EDITMODES.VALUE) {
			setValue(newValue);
		} else {
			setOperand(newValue);
		}
		setTypingMode(EDITMODES.APPEND);
	}

	const handleDecimalPoint = () => {
		const currentValue = mode === EDITMODES.VALUE ? value : operand;
		console.log(currentValue);
		console.log('as number', parseInt(currentValue, 10))
		if (parseInt(currentValue, 10) < 1 || currentValue.includes('.')) {
			return;
		}

		const newValue = typingMode === TYPINGMODES.INSERT ? '.' : currentValue.toString() + '.';

		if (mode === EDITMODES.VALUE) {
			setValue(newValue);
		} else {
			setOperand(newValue);
		}
		setTypingMode(EDITMODES.APPEND);
	}

	const handleOperator = op => {
		setTypingMode(TYPINGMODES.INSERT);

		if (operator) {
			const total = calculator(parseFloat(value), operator, parseFloat(operand));
			setValue(total);
			setOperand(total);
		} else {
			setOperand(value);
		}

		setOperator(op);
		setMode(EDITMODES.OPERAND);
	}

	const handleEquals = () => {
		setValue(calculator(parseFloat(value), operator, parseFloat(operand)));
		setTypingMode(TYPINGMODES.INSERT);
		setMode(EDITMODES.VALUE);
	}

	return (
		<Container>
			<Logo src="https://www.equalexperts.com/wp-content/themes/equalexperts/assets/logo.svg" />
			<DisplayWindow>
				<input
					type="text"
					value={mode === EDITMODES.VALUE ? value : operand}
					readOnly
				/>
			</DisplayWindow>

			<Keyboard role="group">
				<FunctionButton onClick={allClear}>AC</FunctionButton>
				<BlankButton />
				<BlankButton />
				<FunctionButton onClick={() => handleOperator('/')}>/</FunctionButton>

				<Button onClick={() => handleDigit('7')}>7</Button>
				<Button onClick={() => handleDigit('8')}>8</Button>
				<Button onClick={() => handleDigit('9')}>9</Button>
				<FunctionButton onClick={() => handleOperator('*')}>*</FunctionButton>

				<Button onClick={() => handleDigit('4')}>4</Button>
				<Button onClick={() => handleDigit('5')}>5</Button>
				<Button onClick={() => handleDigit('6')}>6</Button>
				<FunctionButton onClick={() => handleOperator('-')}>-</FunctionButton>

				<Button onClick={() => handleDigit('1')}>1</Button>
				<Button onClick={() => handleDigit('2')}>2</Button>
				<Button onClick={() => handleDigit('3')}>3</Button>
				<FunctionButton onClick={() => handleOperator('+')}>+</FunctionButton>

				<Button onClick={() => handleDigit('0')}>0</Button>
				<Button onClick={handleDecimalPoint}>.</Button>
				<EqualsButton onClick={handleEquals}>=</EqualsButton>
			</Keyboard>
		</Container>
	);
}

export default Calculator;
