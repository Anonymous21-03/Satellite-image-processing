import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const GoogleSignIn = ({ onLoginSuccess }) => {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      const userObject = jwtDecode(codeResponse.credential);
      onLoginSuccess(userObject);
    },
    onError: (error) => console.log('Login Failed:', error)
  });

  return (
    <button onClick={() => login()}>Sign in with Google</button>
  );
};

export default GoogleSignIn;