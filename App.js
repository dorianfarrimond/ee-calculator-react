import React from 'react';
import Calculator from './components/calculator';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
	body {
	  background-color: #373d45;
	}
`;

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const App = () => (
	<>
		<GlobalStyles />
		<Container>
			<Calculator />
		</Container>
	</>)

export default App;
