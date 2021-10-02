import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Calculator from '.';

describe('<Calculator/>', () => {
	describe('on initial render', () => {
		it('should display a textbox with the expected initial value', () => {
			render(<Calculator />);

			const displayWindow = screen.getByRole('textbox');
			expect(displayWindow).toBeInTheDocument();
			expect(displayWindow.value).toBe('0');
		});

		it('should allow the value to be edited', () => {
			render(<Calculator />);

			const displayWindow = screen.getByRole('textbox');
			fireEvent.change(displayWindow, {target: { value: '15'}});
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

			fireEvent.change(screen.getByRole('textbox'), {target: { value: '3'}});
			fireEvent.click(screen.getByText('+'));
			fireEvent.change(screen.getByRole('textbox'), {target: { value: '3'}});
			fireEvent.click(screen.getByText('='));
			expect(screen.getByRole('textbox').value).toBe('6');
		});

		it('should support subtraction', () => {
			render(<Calculator />);

			fireEvent.change(screen.getByRole('textbox'), {target: { value: '83'}});
			fireEvent.click(screen.getByText('-'));
			fireEvent.change(screen.getByRole('textbox'), {target: { value: '41'}});
			fireEvent.click(screen.getByText('='));
			expect(screen.getByRole('textbox').value).toBe('42');
		});

		it('should support multiply', () => {
			render(<Calculator />);

			fireEvent.change(screen.getByRole('textbox'), {target: { value: '12'}});
			fireEvent.click(screen.getByText('*'));
			fireEvent.change(screen.getByRole('textbox'), {target: { value: '4'}});
			fireEvent.click(screen.getByText('='));
			expect(screen.getByRole('textbox').value).toBe('48');
		});

		it('should support divide', () => {
			render(<Calculator />);

			fireEvent.change(screen.getByRole('textbox'), {target: { value: '12'}});
			fireEvent.click(screen.getByText('/'));
			fireEvent.change(screen.getByRole('textbox'), {target: { value: '4'}});
			fireEvent.click(screen.getByText('='));
			expect(screen.getByRole('textbox').value).toBe('3');
		});

		it('should default the operand to the current value for convenience', () => {
			render(<Calculator />);

			fireEvent.change(screen.getByRole('textbox'), {target: { value: '15'}});
			expect(screen.getByRole('textbox').value).toBe('15');

			fireEvent.click(screen.getByText('+'));

			expect(screen.getByRole('textbox').value).toBe('15');

			fireEvent.click(screen.getByText('='));
			expect(screen.getByRole('textbox').value).toBe('30');
		});

		it('should switch mode and allow an operand to be entered after an operator is selected', () => {
			render(<Calculator />);

			fireEvent.change(screen.getByRole('textbox'), {target: { value: '15'}});
			expect(screen.getByRole('textbox').value).toBe('15');

			fireEvent.click(screen.getByText('+'));

			fireEvent.change(screen.getByRole('textbox'), {target: { value: '5'}});
			expect(screen.getByRole('textbox').value).toBe('5');

			fireEvent.click(screen.getByText('='));
			expect(screen.getByRole('textbox').value).toBe('20');
		});
	});

	describe('when using advanced features', () => {
		it('should allow the operation to be repeated', () => {
			render(<Calculator />);

			fireEvent.change(screen.getByRole('textbox'), {target: { value: '25'}});
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
	});
});
