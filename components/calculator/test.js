import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Calculator from '.';

describe('<Calculator/>', () => {
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

	it('should switch mode when an operator is chosen', () => {
		render(<Calculator />);

		fireEvent.change(screen.getByRole('textbox'), {target: { value: '15'}});
		expect(screen.getByRole('textbox').value).toBe('15');

		fireEvent.click(screen.getByText('+'));

		fireEvent.keyPress(screen.getByRole('textbox'), {target: { value: '5'}});
		expect(screen.getByRole('textbox').value).toBe('5');

		fireEvent.click(screen.getByText('='));
		expect(screen.getByRole('textbox').value).toBe('20');
	});
});