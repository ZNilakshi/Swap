import React, { useState } from 'react';

const AuthForm = ({ type, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {type === 'register' && (
        <div>
          <label>Name</label>
          <input name="name" onChange={handleChange} required />
        </div>
      )}
      <div>
        <label>Email</label>
        <input name="email" onChange={handleChange} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" onChange={handleChange} required />
      </div>
      <button type="submit">{type === 'login' ? 'Login' : 'Register'}</button>
    </form>
  );
};

export default AuthForm;
