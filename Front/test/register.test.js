import React from 'react';
import { shallow } from 'enzyme';
import Signup from '../src/Components/Authentification/SignUp/Signup';

describe('Signup Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Signup />);
    expect(wrapper.exists()).toBe(true);
  });

  it('submits form with email, password, and role when filled', () => {
    const wrapper = shallow(<Signup />);
  
    wrapper.find('input[type="text"]').simulate('change', { target: { value: 'Test User' } });
    wrapper.find('input[type="email"]').simulate('change', { target: { value: 'test@example.com' } });
    wrapper.find('input[type="password"]').simulate('change', { target: { value: 'password' } });
    wrapper.find('input[type="radio"][value="Employée"]').simulate('change', { target: { value: 'Employée' } });

    wrapper.find('form').simulate('submit');
  });

  it('displays error message if any field is missing', () => {
    const wrapper = shallow(<Signup />);
    wrapper.find('form').simulate('submit');
  });
});
