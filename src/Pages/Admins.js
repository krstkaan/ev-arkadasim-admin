import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminUserListing() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({ displayname: '', email: '', password: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://roomiefies.com/helios/getadminusers.php');
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async () => {
    try {
      const formData = new FormData();
      formData.append('email', newUser.email);
      formData.append('displayname', newUser.displayname);
      formData.append('password', newUser.password);
  
      const response = await axios.post('https://roomiefies.com/helios/addadminuser.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data.sonuc === 1) {
        setUsers((prev) => [...prev, { id: response.data.userId, ...newUser }]);
        setShowForm(false);
        setNewUser({ displayname: '', email: '', password: '' });
        alert('Yeni yönetici başarıyla eklendi!');
      } else {
        alert(`Hata: ${response.data.mesaj}`);
      }
    } catch (err) {
      console.error('Hata Detayı:', err);
      alert(`Hata: ${err.message}`);
    }
  };
  

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Admin Kullanıcıları</h3>
      <button className="btn btn-primary mb-3" onClick={() => setShowForm(!showForm)}>
        Yeni Yönetici Ekle
      </button>

      {showForm && (
        <div className="card p-3 mb-4">
          <h5>Yeni Yönetici Ekle</h5>
          <div className="form-group">
            <label>Display Name</label>
            <input
              type="text"
              className="form-control"
              name="displayname"
              value={newUser.displayname}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
            />
          </div>
          <button className="btn btn-success mt-2" onClick={handleAddUser}>
            Kaydet
          </button>
          <button className="btn btn-secondary mt-2 ml-2" onClick={() => setShowForm(false)}>
            İptal
          </button>
        </div>
      )}

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

export default AdminUserListing;
