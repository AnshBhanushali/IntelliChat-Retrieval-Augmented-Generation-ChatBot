// src/components/Navbar/Navbar.tsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './NavbarStyles.module.scss';

const Navbar: React.FC = () => {
  const { isAuthenticated, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout logic
    setUser(null);
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">IntelliChat</Link>
      </div>
      <ul className={styles.navLinks}>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/chat">Chat</Link>
            </li>
            <li>
              <Link to="/upload">Upload</Link>
            </li>
            <li>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
