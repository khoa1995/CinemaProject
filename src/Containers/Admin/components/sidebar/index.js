import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";
function SidebarComponent() {
  return (
    <>
      <div className="sideBar__header">
        <h4 className="text-center display-5 text-success mt-2">Cyber Movie</h4>
        <hr />
      </div>
      <div>
        <ul className="sideBar__list">
          <Link
            to="/admin/users"
            className="text-success text-decoration-none display-5"
          >
            <li>User</li>
          </Link>

          <Link
            to="/admin/movies"
            className="text-success text-decoration-none display-5"
          >
            <li>Movie</li>
          </Link>

          <Link to="/" className="text-success text-decoration-none display-5">
            <li>Home</li>
          </Link>

          <Link
            to="/"
            className="text-success text-decoration-none display-5 p-0"
            onClick={() => {
              localStorage.removeItem("adminMember");
            }}
          >
            <li>Logout</li>
          </Link>
        </ul>
      </div>
    </>
  );
}

export default SidebarComponent;
