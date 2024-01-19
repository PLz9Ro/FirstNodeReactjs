// UserProfile.js
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";

const UserProfile = ({}) => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
        navigate("/login");
    }
  }, []);
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 m-4">
      <h2 className="text-3xl font-semibold mb-4">User Profile</h2>
      <p className="text-gray-700">User ID: {user.username}</p>
      <p className="text-gray-700">Username: {user.phone}</p>
      <p className="text-gray-700">Email: {user.email}</p>
      <h3 className="text-gray-700">
        <Link href="/logout" variant="body2">
          {"Logout"}
        </Link>
      </h3>

      {/* Add more profile information as needed */}
    </div>
  );
};

export default UserProfile;
