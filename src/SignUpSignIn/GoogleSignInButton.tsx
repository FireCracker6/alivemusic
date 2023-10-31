import React from 'react';

interface GoogleAuthButtonProps {
  clientId: string;
  redirectUri: string;
  scope: string;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ clientId, redirectUri, scope }) => {

  const startGoogleLogin = () => {
    const authEndpoint = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&access_type=offline`;

    // Redirect user
    window.location.href = authEndpoint;
  };

  return (
    <button onClick={startGoogleLogin}>
      Login with Google
    </button>
  );
}

export default GoogleAuthButton;
