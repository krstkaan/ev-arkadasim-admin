import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AuthContext } from '../AuthContext';
import React, { useState, useEffect, useContext } from 'react';
import Navbar from './Navbar';
import Listings from './AdListing';
import Sidebar from './Sidebar';
import AdminUserListing from './Admins';
import Users from './Users';
import AdDetails from './AdDetails';

function Home() {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const [activeComponent, setActiveComponent] = useState('home');
    const [selectedAdId, setSelectedAdId] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            window.location.href = 'admin/login';
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return null;
    }

    const handleLogout = () => {
        logout();
        window.location.href = 'admin/login';
    };

    const handleShowDetails = (id) => {
        setSelectedAdId(id);
        setIsDetailsModalOpen(true);
    };

    const handleCloseDetailsModal = () => {
        setIsDetailsModalOpen(false);
    };

    return (
        <div className="d-flex" style={{ height: '100vh' }}>
             {/* Sidebar */}
             <Sidebar
                activeComponent={activeComponent}
                setActiveComponent={setActiveComponent}
                handleLogout={handleLogout}
            />

            {/* Main Content */}
            <div className="flex-grow-1 main-content-container">
                <div className="p-4">
                    {activeComponent === 'home' && <h1>Welcome to the Admin Panel</h1>}
                    {activeComponent === 'listings' && <Listings handleShowDetails={handleShowDetails} />}
                    {activeComponent === 'management' && <AdminUserListing />}
                    {activeComponent === 'users' && <Users />}
                </div>
            </div>
                {isDetailsModalOpen && (
                        <div className="modal show fade" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}  role="dialog">
                            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">İlan Detayları</h5>
                                        <button type="button" className="close" onClick={handleCloseDetailsModal} aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <AdDetails id={selectedAdId} />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={handleCloseDetailsModal}>Kapat</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                )}
        </div>
    );
}

export default Home;