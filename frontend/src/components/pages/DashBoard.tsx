import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../api/api';
import { useNavigate } from 'react-router';
import {useAuth} from '../../context/AuthContext'



const DashBoard: React.FC = () => {


    const {user, setUser, login, logout, isLoading} = useAuth();


    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
                <div className="text-center">
                    <div className="spinner-border text-primary mb-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-muted">Loading your profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
                <div className="alert alert-danger shadow-sm text-center" style={{ maxWidth: '500px', borderRadius: '1rem' }}>
                    <h4 className="alert-heading">Oops!</h4>
                    <p>{error}</p>
                    <button className="btn btn-outline-danger mt-2" onClick={() => navigate('/login')}>Back to Login</button>
                </div>
            </div>
        );
    }

    if (!user){


        navigate('/login');
        return null

    };

    return (
        <div className="container py-5">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="row mb-5">
                    <div className="col-12 text-center">
                        <h1 className="display-4 fw-bold text-primary mb-3">
                            Welcome back, {user.first_name}! 👋
                        </h1>
                        <p className="lead text-muted">Here is a summary of your student profile information.</p>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card shadow-lg border-0" style={{ borderRadius: '1.5rem', overflow: 'hidden' }}>
                            <div className="card-header bg-primary text-white py-3 px-4 border-0">
                                <h5 className="mb-0 fw-semibold">Student Profile Details</h5>
                            </div>
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table table-hover mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th className="ps-4 py-3 text-secondary small text-uppercase fw-bold">Field</th>
                                                <th className="py-3 text-secondary small text-uppercase fw-bold">Information</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="ps-4 py-3 fw-semibold">Full Name</td>
                                                <td className="py-3">{user.first_name} {user.last_name}</td>
                                            </tr>
                                            <tr>
                                                <td className="ps-4 py-3 fw-semibold">Email Address</td>
                                                <td className="py-3">{user.email}</td>
                                            </tr>
                                            <tr>
                                                <td className="ps-4 py-3 fw-semibold">Department</td>
                                                <td className="py-3">{user.department}</td>
                                            </tr>
                                            <tr>
                                                <td className="ps-4 py-3 fw-semibold">Academic Level</td>
                                                <td className="py-3">{user.level} Level</td>
                                            </tr>
                                            <tr>
                                                <td className="ps-4 py-3 fw-semibold">Age</td>
                                                <td className="py-3">{user.age} years old</td>
                                            </tr>
                                            <tr>
                                                <td className="ps-4 py-3 fw-semibold">Student ID</td>
                                                <td className="py-3 text-muted">{user.id}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="card-footer bg-white py-3 px-4 border-0 text-end">
                                <button
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={() => {
                                        logout();
                                        navigate('/login');
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default DashBoard;
