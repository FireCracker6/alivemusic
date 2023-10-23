import Modal from 'react-modal';
import axios from '../API/api';
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from 'react';

interface SignUpProps {
    isModal: boolean;
    closeModal: () => void;
}
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      backgroundColor: 'white',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      width: '80%', 
      maxWidth: '500px', 
      padding: '20px',
      overflowY: "scroll" as "scroll",
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
};

const SignUp: React.FC<SignUpProps> = ({isModal, closeModal}) => { 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const isEmailValid = (email: string) => {
        const emailRegex =  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        if (!value) {
            setEmailError("Email is required");
        } else if (!isEmailValid(value)) {
            setEmailError("Please enter a valid email");
        } else {
            setEmailError("");
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        if (!value) {
            setPasswordError("Password is required");
        } else if (value.length < 8 ) {
            setPasswordError("Password should be at least 8 characters");
        } else {
            setPasswordError("");
        }
    };




    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (emailError || passwordError) {
            console.error("Validation errors present");
            return;
        }

        try {
            const response = await axios.post('/users/register', {
                email,
                password
            });

            if (response.status === 200) {
                console.log("Signup successful!", response.data);
            }
        } catch (error: any) {
            console.error("Error signing up:", error.response ? error.response.data : error.message);

        }
    }

    return (
        <>
     
<Modal isOpen={isModal} onRequestClose={closeModal} style={customStyles}>
<button onClick={closeModal} className="modal-close-button">X</button>
    <div className="sign-up-container">
        <form className="sign-up-form" onSubmit={handleSubmit}>
            <div className='container py-4 d-flex justify-content-center'>
                <h2>Create your account </h2>
            </div>
            <div className="mb-3 position-relative">
                <label htmlFor="email" className="form-label-top">Email</label>
                <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={handleEmailChange}
            aria-describedby="emailHelp"
        />
        {emailError && <span className="text-danger">{emailError}</span>}
                <FontAwesomeIcon icon={faEnvelope} className="icon-right" />
                
            </div>
            <div className="mb-3 position-relative">
                <label htmlFor="password" className="form-label-top">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    aria-describedby="emailHelp"
                />
                {passwordError && <span className="text-danger">{passwordError}</span>}

                <FontAwesomeIcon icon={faLock} className="icon-right" />
               
            </div>
            <div className='d-grid'>
                <button type="submit" className="btn btn-secondary">Sign Up</button>
                </div>
        </form>
    </div>
</Modal>





        </>
    )
}
export default SignUp;