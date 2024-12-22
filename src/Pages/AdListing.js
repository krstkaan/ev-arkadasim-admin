import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdListing({ handleShowDetails }) {
    const [listings, setListings] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await axios.get('https://roomiefies.com/helios/getilanadmin.php', {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log("API Response:", response.data);
                setListings(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchListings();
    }, []);

    const togglePublish = async (id, currentStatus) => {
        try {
            const payload = new URLSearchParams();
            payload.append('id', id);
            payload.append('newStatus', currentStatus === "1" ? "0" : "1");

            console.log("Gönderilen Veriler (POST):", payload.toString());

            const response = await axios.post(
                'https://roomiefies.com/helios/togglePublish.php',
                payload,
                {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                }
            );

            console.log("API Yanıtı:", response.data);

            if (response.data.success) {
                alert(`İşlem başarılı: İlan ${currentStatus === "0" ? 'yayınlandı' : 'yayından kaldırıldı'}.`);
                setListings((prevListings) =>
                    prevListings.map((listing) =>
                        listing.id === id
                            ? { ...listing, onay_durumu: currentStatus === "1" ? "0" : "1" }
                            : listing
                    )
                );
            } else {
                alert('İşlem başarısız: ' + response.data.mesaj);
            }
        } catch (error) {
            console.error("Hata:", error);
            alert('Bir hata oluştu: ' + error.message);
        }
    };

    const unapprovedListings = listings.filter(listing => listing.onay_durumu === "0");
    const approvedListings = listings.filter(listing => listing.onay_durumu === "1");

    const ListingCard = ({ listing, togglePublish, handleShowDetails }) => (
        <div className="col-md-4 mb-4" key={listing.id}>
            <div className="card h-100 shadow-sm">
                <img
                    src={'https://roomiefies.com/app/' + listing.imageurl1}
                    className="card-img-top"
                    alt={listing.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{listing.title}</h5>
                    <p className="card-text">
                        {listing.rent} TL
                    </p>
                    <p className="card-text">
                        <strong>Kullanıcı:</strong> {listing.displayName}
                    </p>
                    <div className="mt-auto">
                        <button
                            className={`btn ${listing.onay_durumu === "1" ? 'btn-danger' : 'btn-success'} w-100 mb-2`}
                            onClick={() => togglePublish(listing.id, listing.onay_durumu)}
                        >
                            {listing.onay_durumu === "1" ? 'Yayından Kaldır' : 'Yayınla'}
                        </button>
                        <button className="btn btn-primary w-100" onClick={() => handleShowDetails(listing.id)}>Detaylar</button>
                    </div>
                </div>
            </div>
        </div>
    );


    return (
        <div className="container mt-4">
            <h3 className="text-center mb-4">İlanlar</h3>
            {loading && (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Yükleniyor...</span>
                    </div>
                    <p>Veriler yükleniyor, lütfen bekleyin...</p>
                </div>
            )}
            {error && <p className="text-danger text-center">Hata: {error}</p>}
            {!loading && !error && listings.length === 0 && (
                <p className="text-center">Henüz ilan bulunmuyor.</p>
            )}

            {!loading && !error && listings.length > 0 && (
                <>
                    {unapprovedListings.length > 0 && (
                        <>
                            <h4 className="mb-3">Onay Bekleyen İlanlar</h4>
                            <div className="row">
                                {unapprovedListings.map((listing) => (
                                    <ListingCard key={listing.id} listing={listing} togglePublish={togglePublish} handleShowDetails={handleShowDetails} />
                                ))}
                            </div>
                        </>
                    )}

                    {approvedListings.length > 0 && (
                        <>
                            <h4 className="mb-3 mt-4">Onaylanmış İlanlar</h4>
                            <div className="row">
                                {approvedListings.map((listing) => (
                                    <ListingCard key={listing.id} listing={listing} togglePublish={togglePublish} handleShowDetails={handleShowDetails} />
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default AdListing;