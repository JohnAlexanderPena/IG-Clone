import React from 'react';
import { render, fireEvent, fireFor } from '@testing-library/react';
import Login from '../../pages/Login';
const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

describe('<Login />', () => {
  it('renders the login page with a form submission and logs the user in', () => {
    const { getByTestId, getByPlaceHolderText, queryByTestId } = render(
      <Login />
    );
  });
});
