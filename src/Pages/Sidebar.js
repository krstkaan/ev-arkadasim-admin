import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faUsers, faList, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function Sidebar({ activeComponent, setActiveComponent, handleLogout }) {
  return (
    <>
    <style>
        {`
        .sidebar {
            display: flex;
            flex-direction: column;
             border-right: 1px solid #444;
             height: 100vh;
             position: sticky;
            top: 0;
        }


        .sidebar-item {
            display: flex;
            align-items: center;
            padding: 20px 25px; /* Item padding'ini artırdık */
            margin-bottom: 10px; /* Itemlar arası boşluğu artırdık */
            width: 100%;
            text-decoration: none;
            color: #eee;
             transition: background-color 0.3s ease, color 0.3s ease;
             border-radius: 5px;
             font-size: 18px; /* Font size'ı biraz daha artırdık */
        }

        .sidebar-item:hover {
            background-color: #555;
            color: #fff;
        }

        .sidebar-item.active {
            background-color: #777;
            color: #fff;
        }
        `}
      </style>
      <div className="sidebar bg-dark text-white" style={{ width: '250px'}}>
        <div className="p-3 ">
          <h5 className="text-center mb-4">Admin Panel</h5>
          <ul className="nav flex-column">
            <li className={`nav-item ${activeComponent === 'management' ? 'active' : ''}`}>
              <button
                className="nav-link btn btn-link p-0 text-start sidebar-item"
                onClick={() => setActiveComponent('management')}
              >
                <FontAwesomeIcon icon={faCog} className="me-2" />
                Yönetim
              </button>
            </li>
            <li className={`nav-item ${activeComponent === 'users' ? 'active' : ''}`}>
              <button
                className="nav-link btn btn-link p-0 text-start sidebar-item"
                onClick={() => setActiveComponent('users')}
              >
                <FontAwesomeIcon icon={faUsers} className="me-2" />
                Kullanıcılar
              </button>
            </li>
            <li className={`nav-item ${activeComponent === 'listings' ? 'active' : ''}`}>
              <button
                className="nav-link btn btn-link p-0 text-start sidebar-item"
                onClick={() => setActiveComponent('listings')}
              >
                <FontAwesomeIcon icon={faList} className="me-2" />
                İlanlar
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link p-0 text-start sidebar-item" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;