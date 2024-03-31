import React from 'react';
import { shallow } from 'enzyme';
import Login from '../src/Components/Authentification/Login/Login';


describe('Login Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <UserProviderWrapper>
        <Login />
      </UserProviderWrapper>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('submits form with email and password when filled', () => {
    const wrapper = shallow(
      <UserProviderWrapper>
        <Login />
      </UserProviderWrapper>
    );


    wrapper.find('input[type="email"]').simulate('change', { target: { value: 'User2@example.com' } });
    wrapper.find('input[type="password"]').simulate('change', { target: { value: 'User2' } });
    wrapper.find('form').simulate('submit');

  });
});
