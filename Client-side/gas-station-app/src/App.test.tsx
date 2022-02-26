import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
/*
const mockOnClick = jest.fn();
const mockAddLayer = jest.fn();
describe("Test Leaflet methods",()=>{
it("Test add Layer",()=>{
const {wrapper} = render (<App/>);
expect(wrapper.getByText('Text')).toBeTruthy();
expect(mockAddLayer).toBeCalled();
});
});
*/