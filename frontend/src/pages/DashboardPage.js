import React from 'react';
import Navbar from '../components/Navbar';
import SideDrawer from '../components/SideDrawer';

function DashboardPage() {

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
    <Navbar open={open} openDrawer={handleDrawerOpen}></Navbar>
    <SideDrawer open={open} closeDrawer={handleDrawerClose}></SideDrawer>
    </>
  )
}

export default DashboardPage;