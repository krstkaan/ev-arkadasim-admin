import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdDetails = ({ id }) => { // id prop olarak alındı
    const [adDetails, setAdDetails] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdDetails = async () => {
            try {
                let formData = new FormData();
                formData.append('id', id);
                const response = await axios.post('https://roomiefies.com/helios/getilandetails.php', formData);
                if (response.data.error) {
                    setError(response.data.error);
                } else {
                    setAdDetails(response.data);
                }
            } catch (err) {
                setError('Veri alınırken bir hata oluştu.');
            } finally {
                setLoading(false);
            }
        };

        if(id) { // id kontrolü
           fetchAdDetails();
        } else {
           setError("ID parametresi gerekli");
           setLoading(false);
        }
       
    }, [id]);

    if (loading) return <div>Yükleniyor...</div>;
    if (error) return <div>Hata: {error}</div>;
    if (!adDetails) return <div>İlan bulunamadı.</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <h1>{adDetails.title}</h1>
            <img src={'https://roomiefies.com/app/' + adDetails.imageurl1} alt={adDetails.title} style={{ width: '100%', marginBottom: '20px' }} />
            <p><strong>Açıklama:</strong> {adDetails.description}</p>
            <p><strong>Kira Tutarı:</strong> {adDetails.rent}</p>
            <p><strong>İlan Sahibi:</strong> {adDetails.displayName}</p>
            <p><strong>Cinsiyet:</strong> {adDetails.cinsiyet}</p>
            <p><strong>Yaş Aralığı:</strong> {adDetails.yasaraligi}</p>
            <p><strong>Isıtma Türü:</strong> {adDetails.isitmaturu}</p>
            <p><strong>Eşya Durumu:</strong> {adDetails.esya}</p>
            <p><strong>Bina Yaşı:</strong> {adDetails.binayasi}</p>
            <p><strong>Daire Tipi:</strong> {adDetails.dairetipi}</p>
            {adDetails.imageurl2 && (
                <img src={'https://roomiefies.com/app/' + adDetails.imageurl2} alt={`${adDetails.title} 2`} style={{ width: '100%', marginBottom: '20px' }} />
            )}
            {adDetails.imageurl3 && (
                <img src={'https://roomiefies.com/app/' + adDetails.imageurl3} alt={`${adDetails.title} 3`} style={{ width: '100%', marginBottom: '20px' }} />
            )}
        </div>
    );
};

export default AdDetails;