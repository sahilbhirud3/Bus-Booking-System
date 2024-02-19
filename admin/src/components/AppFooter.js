import React from 'react';
import { CFooter } from '@coreui/react';
import './AppFooter.css'; // Import your CSS file for additional styling if needed

const AppFooter = () => {
  return (
    <CFooter className="app-footer" style={{ backgroundColor: '#f5f5f5', color: '#333' }}>
      <div className="footer-left">
        <a href="#" target="_blank" rel="noopener noreferrer" style={{ color: '#333' }}>
          SPARK BUS
        </a>
        <span className="footer-divider" style={{ color: '#333' }}> | </span>
        <span style={{ color: '#333' }}>&copy; {new Date().getFullYear()}</span>
      </div>
      <div className="footer-right">
        <span className="powered-by" style={{ color: '#333' }}>Powered by</span>
        <a
          href="http://localhost:3000/"
          target="_blank"
          rel="noopener noreferrer"
          className="app-link"
          style={{ color: '#333' }}
        >
          Spark Bus Booking
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(AppFooter);
