import React, { useContext } from "react";
import {
  SettingsApplications,
  Dashboard,
  PersonOutline,
  Store,
  CreditCard,
  LocalShipping,
  InsertChart,
  PsychologyOutlined,
  AccountCircleOutlined,
  ExitToApp,
  SettingsSystemDaydreamOutlined,
  NotificationsNone,
} from "@mui/icons-material";
import "./sidebar.scss";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../config";

const Sidebar = () => {
  const {dispatched} =useContext(DarkModeContext);
  const {  dispatch } = useContext(AuthContext);

  // setTimeout(async () => {
  //   dispatch({ type: "LOGOUT" });
  //   await axiosInstance.get('/auth/logout')
  // }, [10000]); //10000 = 10sec

  const handleLogout = async () => {
    dispatch({ type: "LOGOUT" });
    await axiosInstance.get('/auth/logout')
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" className="link">
          <span className="logo">theinsights</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <Dashboard className="icon" />
            <span>Dashboard</span>
          </li>

          <p className="title">LIST</p>
          <Link to="/users" className="link">
            <li>
              <PersonOutline className="icon" />
              <span>Users</span>
            </li>
          </Link>

          <Link to="/hotels" className="link">
            <li>
              <Store className="icon" />
              <span>Hotels</span>
            </li>
          </Link>

          <Link to="/rooms" className="link">
          <li>
            <CreditCard className="icon" />
            <span>Rooms</span>
          </li>
          </Link>

          <li>
            <LocalShipping className="icon" />
            <span>Delivery</span>
          </li>

          <p className="title">USEFUL</p>
          <li>
            <InsertChart className="icon" />
            <span>Stats</span>
          </li>

          <li>
            <NotificationsNone className="icon" />
            <span>Notifications</span>
          </li>

          <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlined className="icon" />
            <span>System Health</span>
          </li>

          <li>
            <PsychologyOutlined className="icon" />
            <span>Logs</span>
          </li>

          <li>
            <SettingsApplications className="icon" />
            <span>Settings</span>
          </li>

          <p className="title">USER</p>
          <li>
            <AccountCircleOutlined className="icon" />
            <span>Profile</span>
          </li>

          <li>
            <ExitToApp className="icon" />
            <span onClick={handleLogout}>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption" onClick={()=> dispatched({type:"LIGHT"})}></div>
        <div className="colorOption" onClick={()=> dispatched({type:"DARK"})}></div>
      </div>
    </div>
  );
};

export default Sidebar;
