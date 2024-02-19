import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react';
import { AppSidebarNav } from './AppSidebarNav';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import navigation from '../_nav';

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible });
      }}
      style={{ backgroundColor: '#3bb19b', color: '#ffffff', transition: 'background-color 0.3s ease' }} // Add transition for smooth color change
      className="sidebar-hover-effect" // Add a custom class for hover effect
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <>Spark ADMIN</>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
