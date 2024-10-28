import React from 'react';
import styles from './HomePage.module.scss';

const HomePage: React.FC = () => {
  return (
    <div className={styles.home}>
      <h1>Welcome to IntelliChat</h1>
      <p>Your intelligent chat companion.</p>
    </div>
  );
};

export default HomePage;
