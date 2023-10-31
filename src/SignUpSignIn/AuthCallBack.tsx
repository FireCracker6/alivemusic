import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function AuthCallback() {
    const location = useLocation();
    const [isProcessing, setIsProcessing] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Extract the 'code' from the URL
        const urlParams = new URLSearchParams(location.search);
        const code = urlParams.get('code');
        
        if (code) {
            // Send the code to your backend for further processing
            console.log("Sending code to backend", code);  // Add this
            axios.post('https://localhost:7286/api/Auth/google-auth', { code })
                .then(response => {
                    console.log("Backend responded with:", response);  // Add this
                    // Handle the response as needed, e.g., save user data, redirect user, etc.
                    setIsProcessing(false);
                })
                .catch(err => {
                    if (err.response) {
                        // Server responded with a status outside of the 2xx range
                        console.error("Server response error:", err.response.data);
                    } else if (err.request) {
                        // Request was made but no response was received
                        console.error("No response received:", err.request);
                    } else {
                        // An error occurred while setting up the request
                        console.error("Error setting up request:", err.message);
                    }
                    setError("Error processing authentication. Please try again later.");
                    setIsProcessing(false);
                });
                
        } else {
            setError("No authorization code found.");
            setIsProcessing(false);
        }
        
    }, [location.search]);

    if (isProcessing) {
        return <div>Processing...</div>;
    }
    
    if (error) {
        return <div>{error}</div>;
    }

    // Once processing is done and there are no errors, you can return a success message
    // or redirect the user, depending on your requirements.
    return <div>Authentication successful!</div>;
}
export default AuthCallback;