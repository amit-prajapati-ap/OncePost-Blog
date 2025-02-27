import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  
  // Ensure correct state path
  const authStatus = useSelector((state) => state.authSlice.status);

  useEffect(() => {
    // Wait until authStatus is defined (avoids undefined state issue)
    if (authStatus === undefined) return;

    if (authentication && !authStatus) {
      navigate("/login");
    } else if (!authentication && authStatus) {
      navigate("/");
    }

    setLoader(false);
  }, [authStatus, navigate, authentication]);

  // Show loading state to avoid UI flashing
  if (loader) {
    return <h1>Loading...</h1>;
  }

  return <>{children}</>;
}

