import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Users() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


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
            {!loading && !error && users.length === 0 && (
                <p className="text-center">Henüz admin kullanıcı bulunmuyor.</p>
            )}

            {!loading && !error && users.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead className="thead-light">
                            <tr>
                                <th>ID</th>
                                <th>Display Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.displayname}</td>
                                    <td>{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Users;
