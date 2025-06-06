import { Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Admin/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import Landing from "./components/User/Landing";

function App() {
  return (
    <Routes>
      {/* <Route path="*" element={<Login />} /> */}

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Layout>
              <Landing />
            </Layout>
          </PrivateRoute>
        }
      />
      {/* <Route
        path="/users"
        element={
          <PrivateRoute allowedRoles={"admin"}>
            <Layout>
              <User />
            </Layout>
          </PrivateRoute>
        }
      /> */}

      
      
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;
