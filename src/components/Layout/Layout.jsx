import React from "react";
import Navbar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout({ setUserData, userData }) {
  return (
    <>
      <Navbar setUserData={setUserData} userData={userData} />
      <Outlet />
      <Footer />
    </>
  );
}
