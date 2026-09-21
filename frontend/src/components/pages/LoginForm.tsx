import { motion } from 'framer-motion';
import { form } from 'framer-motion/client';
import React ,{ useState } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router';
import {useAuth} from '../../context/AuthContext';




interface LoginState{


    "matricNumberOrEmail" : string,
    "password": string


}

function LoginForm() {

    const {user, setUser, login, logout, isLoading} = useAuth();

    const navigate = useNavigate();

    const [formData, setFormData] = useState<LoginState>({
        "matricNumberOrEmail" : "",
        "password": ""
    })


    const [notification, setNotification] = useState<NotificationState>({
            visible: false,
            message: "",
            type: 'success'
    });
    

    function handleFormChange(change:string, event:React.ChangeEvent<HTMLInputElement>){

        if (change == "matricNumberOrEmail"){
            setFormData({...formData, matricNumberOrEmail: event.target.value})
        }
        if (change == "password"){
            setFormData({...formData, password: event.target.value})
        }

    }


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("Form submitted:", formData);

       
        setNotification({ visible: false, message: "", type: 'success' });

        const payload = {

            matricNumberOrEmail : formData.matricNumberOrEmail,
            password : formData.password
        };


        const response = await api.post("/api/students/login", payload);


        console.log(response, "Response gotten from logigng in user")

        // data = response.fata

        if (response.data.status === "successful"){ //Login the user in this case

            login(response.data.user) //Doesn't this already store the user id to local storage already!?

            navigate("/dashboard")

        }

        console.log("")

        console.log(response.data)

    }


  return (
    
                <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="card shadow-lg border-0 p-4"
                    style={{ maxWidth: '400px', width: '100%', borderRadius: '1rem' }}
                >
                    <div className="card-body p-0">
                    <div className="text-center mb-4">
                        <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="fw-bold text-primary"
                        >
                        Welcome Back
                        </motion.h2>
                        <p className="text-muted small">Login with student details</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        
                        {/* Identifier Input */}
                        <div className="mb-3">
                        <label className="form-label small fw-semibold text-secondary">Matric Number or Email</label>
                        <motion.div
                            whileFocus={{ scale: 1.01 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <input
                                id='matricNumberOrEmail'
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Matric Number"
                            required
                            value={formData.matricNumberOrEmail}
                            onChange={(event) => (handleFormChange("matricNumberOrEmail", event))}
                            />
                        </motion.div>
                        </div>

                        {/* Password Input */}
                        <div className="mb-4">
                        <label className="form-label small fw-semibold text-secondary">Password</label>
                        <motion.div
                            whileFocus={{ scale: 1.01 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="Password"
                            required
                            value={formData.password}
                            onChange={(event) => (handleFormChange("password", event))}
                            />
                        </motion.div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="btn btn-primary w-100 py-2 fw-bold shadow-sm"
                        >
                        Sign In
                        </motion.button>
                        <p>Don't have an account? <a href="/register" className="text-decoration-none">Sign up</a></p>
                    </form>

                    <div className="text-center mt-4">
                        <a href="#" className="text-decoration-none small text-muted hover-primary">
                        Forgot your password?
                        </a>
                    </div>
                    </div>
                </motion.div>
                </div>
                
        );

}

export default LoginForm;
