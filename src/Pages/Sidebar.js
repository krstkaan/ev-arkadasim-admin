import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faUsers, faList, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';

function Sidebar({ activeComponent, setActiveComponent, handleLogout }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) {
              setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <style>
                {`
          .sidebar-container {
            position: relative;
            display: flex;
          }

          .sidebar {
              display: flex;
              flex-direction: column;
              border-right: 1px solid #444;
              height: 100vh;
              position: sticky;
              top: 0;
              width: 250px;
              transition: transform 0.3s ease;
              z-index: 1000;
          }

          .sidebar.collapsed {
            transform: translateX(-100%);
          }

          .sidebar-item {
              display: flex;
              align-items: center;
              padding: 20px 25px;
              margin-bottom: 10px;
              width: 100%;
              text-decoration: none;
              color: #eee;
              transition: background-color 0.3s ease, color 0.3s ease;
              border-radius: 5px;
              font-size: 18px;
          }

          .sidebar-item:hover {
              background-color: #555;
              color: #fff;
          }

          .sidebar-item.active {
              background-color: #777;
              color: #fff;
          }

         .hamburger-menu {
           position: absolute;
            top: 10px;
            left: 10px;
            font-size: 24px;
            cursor: pointer;
            color: black; /* Hamburger menü rengi siyah */
            z-index: 1001;
            display: none;
             background: white; /* Arka plan beyaz olsun */
            border-radius: 5px; /* Kenarları yuvarlak yap */
            padding: 5px; /* İç boşluk */
            box-shadow: 0 2px 5px rgba(0,0,0,0.2); /* Gölge efekti */

         }

          .hamburger-menu:hover{
            background: #eee; /* Hover efekti için gri arka plan */
          }

          .main-content-container{
              flex: 1;
          }


          @media (max-width: 768px) {
            .sidebar {
                position: fixed;
                transform: translateX(-100%);
             }

            .sidebar.open {
                 transform: translateX(0);
            }
           .hamburger-menu {
                display: block;
           }
              .main-content-container {
              margin-left: 0;
           }
           }
        `}
            </style>
            <div className="sidebar-container">
              {isMobile && (<FontAwesomeIcon
                    icon={faBars}
                    className="hamburger-menu"
                    onClick={toggleSidebar}
                />)}
                <div className={`sidebar bg-dark text-white ${isMobile ? (isOpen ? 'open' : 'collapsed') : ''}`} style={{ width: '250px'}}>
                    <div className="p-3 ">
                        <h5 className="text-center mb-4">Admin Panel</h5>
                        <ul className="nav flex-column">
                            <li className={`nav-item ${activeComponent === 'management' ? 'active' : ''}`}>
                                <button
                                    className="nav-link btn btn-link p-0 text-start sidebar-item"
                                    onClick={() => {setActiveComponent('management'); if (isMobile) setIsOpen(false);}}
                                >
                                    <FontAwesomeIcon icon={faCog} className="me-2" />
                                    Yönetim
                                </button>
                            </li>
                            <li className={`nav-item ${activeComponent === 'users' ? 'active' : ''}`}>
                                <button
                                    className="nav-link btn btn-link p-0 text-start sidebar-item"
                                    onClick={() => {setActiveComponent('users'); if (isMobile) setIsOpen(false);}}
                                >
                                    <FontAwesomeIcon icon={faUsers} className="me-2" />
                                    Kullanıcılar
                                </button>
                            </li>
                            <li className={`nav-item ${activeComponent === 'listings' ? 'active' : ''}`}>
                                <button
                                    className="nav-link btn btn-link p-0 text-start sidebar-item"
                                    onClick={() => {setActiveComponent('listings'); if (isMobile) setIsOpen(false);}}
                                >
                                    <FontAwesomeIcon icon={faList} className="me-2" />
                                    İlanlar
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link p-0 text-start sidebar-item" onClick={() => {handleLogout(); if (isMobile) setIsOpen(false);}}>
                                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
              </div>
        </>
    );
}

export default Sidebar;