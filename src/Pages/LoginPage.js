import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext';

const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const termos = process.env.REACT_APP_TERMOS;
    const [formData, setFormData] = useState({ email: '', password: '', termos: termos });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // Çevre değişkeninden API URL'sini alın

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`https://roomiefies.com/helios/login.php`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Form-data gönderdiğimiz için doğru Content-Type ayarı
                },
            });
            console.log(response.data);

            if (response.data.sonuc === '1') {
                login(response.data.token); // Context'teki login fonksiyonunu çağır
                console.log(response.data.token);
                setSuccess('Giriş başarılı. Yönlendiriliyorsunuz...');
                setTimeout(() => {
                   navigate('/');
                }, 2000);
            } 
            else if (response.data.sonuc === '0') {
                setError('Kullanıcı adı veya şifre hatalı.');
            }
            else {
                setError('Bilinmeyen bir hata oluştu.');
            }

        } catch (error) {
            setError(error.response ? error.response.data : error.message);
            console.log("Giriş hatası:", error.toJSON());
        }
    };





    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow" style={{ width: '400px' }}>
                <h2 className="text-center mb-4">Giriş Yap</h2>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                {/* E-posta ve Şifre ile Giriş Formu */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Şifre:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Giriş Yap</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;