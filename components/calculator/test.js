import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import Calculator from '.';

describe('<Calculator/>', () => {
	describe('on initial render', () => {
		it('should display a textbox with the expected initial value', () => {
			render(<Calculator />);

			const displayWindow = screen.getByRole('textbox');
			expect(displayWindow).toBeInTheDocument();
			expect(displayWindow.value).toBe('0');
		});

		it('should allow the value to be input', () => {
			render(<Calculator />);

			const keyboard = screen.getByRole('group');
			fireEvent.click(within(keyboard).getByText('1'));
			fireEvent.click(within(keyboard).getByText('5'));

			const displayWindow = screen.getByRole('textbox');
			expect(displayWindow.value).toBe('15');
		});

		it('should render the expected buttons', () => {
			render(<Calculator />);

			expect(screen.getByText('+')).toBeInTheDocument();
			expect(screen.getByText('-')).toBeInTheDocument();
			expect(screen.getByText('*')).toBeInTheDocument();
			expect(screen.getByText('/')).toBeInTheDocument();
		});
	});

	describe('when using basic calculator features ', () => {
		it('should support addition', () => {
			render(<Calculator />);

			const keyboard = screen.getByRole('group')
			fireEvent.click(within(keyboard).getByText('3'));
			fireEvent.click(within(keyboard).getByText('+'));
			fireEvent.click(within(keyboard).getByText('3'));
			fireEvent.click(within(keyboard).getByText('='));
			expect(screen.getByRole('textbox').value).toBe('6');
		});

		it('should support subtraction', () => {
			render(<Calculator />);

			const keyboard = screen.getByRole('group');
			fireEvent.click(within(keyboard).getByText('8'));
			fireEvent.click(within(keyboard).getByText('3'));
			fireEvent.click(screen.getByText('-'));
			fireEvent.click(within(keyboard).getByText('4'));
			fireEvent.click(within(keyboard).getByText('1'));
			fireEvent.click(screen.getByText('='));
			expect(screen.getByRole('textbox').value).toBe('42');
		});

		it('should support multiply', () => {
			render(<Calculator />);

			const keyboard = screen.getByRole('group');
			fireEvent.click(within(keyboard).getByText('1'));
			fireEvent.click(within(keyboard).getByText('2'));
			fireEvent.click(screen.getByText('*'));
			fireEvent.click(within(keyboard).getByText('4'));
			fireEvent.click(screen.getByText('='));
			expect(screen.getByRole('textbox').value).toBe('48');
		});

		it('should support divide', () => {
			render(<Calculator />);

			const keyboard = screen.getByRole('group');
			fireEvent.click(within(keyboard).getByText('1'));
			fireEvent.click(within(keyboard).getByText('2'));
			fireEvent.click(screen.getByText('/'));
			fireEvent.click(within(keyboard).getByText('4'));
			fireEvent.click(screen.getByText('='));
			expect(screen.getByRole('textbox').value).toBe('3');
		});

		it('should default the operand to the current value for convenience', () => {
			render(<Calculator />);

			const keyboard = screen.getByRole('group');
			fireEvent.click(within(keyboard).getByText('1'));
			fireEvent.click(within(keyboard).getByText('5'));
			expect(screen.getByRole('textbox').value).toBe('15');

			fireEvent.click(screen.getByText('+'));

			expect(screen.getByRole('textbox').value).toBe('15');

			fireEvent.click(screen.getByText('='));
			expect(screen.getByRole('textbox').value).toBe('30');
		});

		it('should switch mode and allow an operand to be entered after an operator is selected', () => {
			render(<Calculator />);

			const keyboard = screen.getByRole('group');
			fireEvent.click(within(keyboard).getByText('1'));
			fireEvent.click(within(keyboard).getByText('5'));
			expect(screen.getByRole('textbox').value).toBe('15');

			fireEvent.click(screen.getByText('+'));

			fireEvent.click(within(keyboard).getByText('5'));
			expect(screen.getByRole('textbox').value).toBe('5');

			fireEvent.click(screen.getByText('='));
			expect(screen.getByRole('textbox').value).toBe('20');
		});
	});

	describe('when using advanced features', () => {
		it('should allow the operation to be repeated', () => {
			render(<Calculator />);

			const keyboard = screen.getByRole('group');
			fireEvent.click(within(keyboard).getByText('2'));
			fireEvent.click(within(keyboard).getByText('5'));
			fireEvent.click(screen.getByText('+'));
			fireEvent.click(screen.getByText('='));
			expect(screen.getByRole('textbox').value).toBe('50');

			fireEvent.click(screen.getByText('='));
			expect(screen.getByRole('textbox').value).toBe('75');

			fireEvent.click(screen.getByText('='));
			expect(screen.getByRole('textbox').value).toBe('100');

			fireEvent.click(screen.getByText('='));
			expect(screen.getByRole('textbox').value).toBe('125');
		});

		it('should support compound operations', () => {
			render(<Calculator />);

			const keyboard = screen.getByRole('group');
			fireEvent.click(within(keyboard).getByText('1'));
			fireEvent.click(screen.getByText('+'));
			fireEvent.click(within(keyboard).getByText('2'));
			fireEvent.click(screen.getByText('+'));
			expect(screen.getByRole('textbox').value).toBe('3');

			fireEvent.click(screen.getByText('+'));
			fireEvent.click(within(keyboard).getByText('4'));
			fireEvent.click(screen.getByText('='));
			expect(screen.getByRole('textbox').value).toBe('10');
		});
	});
});
