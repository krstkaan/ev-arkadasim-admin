import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Users() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [responseMessage, setResponseMessage] = useState(null); // API yanıtını tutmak için durum

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://roomiefies.com/helios/getusers.php');
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleApprovalToggle = async (id, currentStatus) => {
        try {
            const newStatus = currentStatus === '1' ? '0' : '1';
    
            // FormData oluştur
            const formData = new FormData();
            formData.append('id', id);
            formData.append('onay_durumu', newStatus);
    
            // FormData ile istek yap
            const response = await axios.post(
                'https://roomiefies.com/helios/updateApproval.php',
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );
    
            // API yanıtını işleme
            setResponseMessage(response.data.message);
    
            // Kullanıcı listesini güncelle
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === id ? { ...user, onay_durumu: newStatus } : user
                )
            );
        } catch (err) {
            setResponseMessage('Onay durumu değiştirilemedi: ' + err.message);
        }
    };
    

    const onaylilar = users.filter((user) => user.onay_durumu === '1');
    const onaysizlar = users.filter((user) => user.onay_durumu !== '1');

    return (
        <div className="container mt-4">
            <h3 className="text-center mb-4">Kullanıcılar</h3>
            {loading && (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Yükleniyor...</span>
                    </div>
                    <p>Veriler yükleniyor, lütfen bekleyin...</p>
                </div>
            )}
            {error && <p className="text-danger text-center">Hata: {error}</p>}

            {responseMessage && (
                <div className="alert alert-info text-center" role="alert">
                    {responseMessage}
                </div>
            )}

            {!loading && (
                <>
                    <h4>Onaylılar</h4>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead className="thead-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Display Name</th>
                                    <th>Email</th>
                                    <th>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {onaylilar.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.displayname}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <button
                                                className="btn btn-warning btn-sm"
                                                onClick={() => handleApprovalToggle(user.id, user.onay_durumu)}
                                            >
                                                Onayı Kaldır
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <h4>Onaysızlar</h4>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead className="thead-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Display Name</th>
                                    <th>Email</th>
                                    <th>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {onaysizlar.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.displayname}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() => handleApprovalToggle(user.id, user.onay_durumu)}
                                            >
                                                Onayla
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}

export default Users;
