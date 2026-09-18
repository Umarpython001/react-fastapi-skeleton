import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import api from '../../api/api';

interface SignUpState {
    first_name: string;
    last_name: string;
    age: number;
    department: string;
    level: string;
    email: string;
    password: string;
}

interface NotificationState {
    visible: boolean;
    message: string;
    type: 'success' | 'error';
}

function SignUpForm() {
    const [formData, setFormData] = useState<SignUpState>({
        first_name: "",
        last_name: "",
        age: 0,
        department: "",
        level: "",
        email: "",
        password: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState<NotificationState>({
        visible: false,
        message: "",
        type: 'success'
    });

    function handleFormChange(field: keyof SignUpState, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const value = event.target.value;

        setFormData({
            ...formData,
            [field]: field === 'age' ? parseInt(value) || 0 : value
        });
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setNotification({ visible: false, message: "", type: 'success' });

        try {
            // Prepare data to match backend expectations:
            // Backend expects 'name' (string), 'level' (int), 'age' (int)
            const payload = {
                name: `${formData.first_name} ${formData.last_name}`,
                age: formData.age,
                department: formData.department,
                level: parseInt(formData.level) || 0, // converts "100lvl" to 100
                email: formData.email,
                password: formData.password
            };

            const response = await api.post("/api/students/create_student", payload);
            const data = response.data;

            if (data.status === "successful") {
                setNotification({
                    visible: true,
                    message: data.message || "Account created successfully!",
                    type: 'success'
                });
                // Optional: Reset form on success
                setFormData({
                    first_name: "", last_name: "", age: 0, department: "", level: "", email: "", password: ""
                });
            } else {
                setNotification({
                    visible: true,
                    message: data.message || "An error occurred.",
                    type: 'error'
                });
            }
        } catch (error: any) {
            setNotification({
                visible: true,
                message: error.response?.data?.message || "Server error. Please try again later.",
                type: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    }

    const levels = ["100lvl", "200lvl", "300lvl", "400lvl", "500lvl"];

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh', padding: '2rem 0', position: 'relative' }}>

            {/* Notification Popup */}
            <AnimatePresence>
                {notification.visible && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, x: '-50%' }}
                        animate={{ opacity: 1, y: 20, x: '-50%' }}
                        exit={{ opacity: 0, y: -50, x: '-50%' }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: '50%',
                            zIndex: 1000,
                            transform: 'translateX(-50%)',
                            minWidth: '300px',
                            maxWidth: '90%'
                        }}
                    >
                        <div className={`alert ${notification.type === 'success' ? 'alert-success' : 'alert-danger'} shadow-lg border-0 text-center py-3 px-4`}
                             style={{ borderRadius: '1rem', fontWeight: '500' }}>
                            {notification.message}
                            <button
                                onClick={() => setNotification({ ...notification, visible: false })}
                                className="btn-close ms-3"
                                style={{ fontSize: '0.8rem' }}
                            ></button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="card shadow-lg border-0 p-4"
                style={{ maxWidth: '500px', width: '100%', borderRadius: '1rem' }}
            >
                <div className="card-body p-0">
                    <div className="text-center mb-4">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="fw-bold text-primary"
                        >
                            Create Account
                        </motion.h2>
                        <p className="text-muted small">Join the student community</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            {/* First Name */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label small fw-semibold text-secondary">First Name</label>
                                <motion.div whileFocus={{ scale: 1.01 }} transition={{ type: 'spring', stiffness: 300 }}>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="John"
                                        required
                                        value={formData.first_name}
                                        onChange={(e) => handleFormChange("first_name", e)}
                                        disabled={isLoading}
                                    />
                                </motion.div>
                            </div>

                            {/* Last Name */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label small fw-semibold text-secondary">Last Name</label>
                                <motion.div whileFocus={{ scale: 1.01 }} transition={{ type: 'spring', stiffness: 300 }}>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Doe"
                                        required
                                        value={formData.last_name}
                                        onChange={(e) => handleFormChange("last_name", e)}
                                        disabled={isLoading}
                                    />
                                </motion.div>
                            </div>
                        </div>

                        <div className="row">
                            {/* Age */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label small fw-semibold text-secondary">Age</label>
                                <motion.div whileFocus={{ scale: 1.01 }} transition={{ type: 'spring', stiffness: 300 }}>
                                    <input
                                        type="number"
                                        className="form-control form-control-lg"
                                        placeholder="20"
                                        required
                                        value={formData.age || ""}
                                        onChange={(e) => handleFormChange("age", e)}
                                        disabled={isLoading}
                                    />
                                </motion.div>
                            </div>

                            {/* Department */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label small fw-semibold text-secondary">Department</label>
                                <motion.div whileFocus={{ scale: 1.01 }} transition={{ type: 'spring', stiffness: 300 }}>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Computer Science"
                                        required
                                        value={formData.department}
                                        onChange={(e) => handleFormChange("department", e)}
                                        disabled={isLoading}
                                    />
                                </motion.div>
                            </div>
                        </div>

                        <div className="row">
                            {/* Level */}
                            <div className="col-md-12 mb-3">
                                <label className="form-label small fw-semibold text-secondary">Level</label>
                                <motion.div whileFocus={{ scale: 1.01 }} transition={{ type: 'spring', stiffness: 300 }}>
                                    <select
                                        className="form-select form-select-lg"
                                        required
                                        value={formData.level}
                                        onChange={(e) => handleFormChange("level", e)}
                                        disabled={isLoading}
                                    >
                                        <option value="" disabled>Select Level</option>
                                        {levels.map(lvl => (
                                            <option key={lvl} value={lvl}>{lvl}</option>
                                        ))}
                                    </select>
                                </motion.div>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="mb-3">
                            <label className="form-label small fw-semibold text-secondary">Email Address</label>
                            <motion.div whileFocus={{ scale: 1.01 }} transition={{ type: 'spring', stiffness: 300 }}>
                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    placeholder="student@university.edu"
                                    required
                                    value={formData.email}
                                    onChange={(e) => handleFormChange("email", e)}
                                    disabled={isLoading}
                                />
                            </motion.div>
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label className="form-label small fw-semibold text-secondary">Password</label>
                            <motion.div whileFocus={{ scale: 1.01 }} transition={{ type: 'spring', stiffness: 300 }}>
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    placeholder="Create a strong password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => handleFormChange("password", e)}
                                    disabled={isLoading}
                                />
                            </motion.div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={isLoading ? {} : { scale: 1.02 }}
                            whileTap={isLoading ? {} : { scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className={`btn w-100 py-2 fw-bold shadow-sm ${isLoading ? 'btn-secondary' : 'btn-primary'}`}
                        >
                            {isLoading ? (
                                <span className="d-flex align-items-center justify-content-center">
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Creating account...
                                </span>
                            ) : (
                                "Create Account"
                            )}
                        </motion.button>

                        <p className="text-center mt-3">Already have an account? <a href="/login" className="text-decoration-none">Sign in</a></p>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}

export default SignUpForm;
