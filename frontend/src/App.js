import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Header from "./components/layouts/Header";
import { Route, Routes } from 'react-router-dom'
import VerifyEmail from "./components/auth/VerifyEmail";
import Dashboard from "./components/layouts/Dashboard";
import ForgotPassword from "./components/auth/ForgotPassword";
import VerifyForgotPassword from "./components/auth/VerifyForgot-Password";
import ChangePassword from "./components/auth/ChangePassword";
import NotFound from "./components/layouts/NotFound";
import EditUser from "./components/admin/EditUser";
import AddUser from "./components/admin/AddUser";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password/users/:id/:token" element={<VerifyForgotPassword />} />
        <Route path="/change-password/users/:id/:token" element={<ChangePassword />} />
        <Route path="/dashboard" element={(
          <>
            <Header />
            <Dashboard />
          </>
        )} />
        <Route path="/users/verify/:id/:token" element={<VerifyEmail />} />
        <Route path="/dashboard/add-user" element={(
          <>
            <Header />
            <Dashboard />
            <AddUser />
          </>

        )} />
        <Route path="/dashboard/edit/:id" element={(
          <>
            <Header />
            <Dashboard />
            <EditUser />
          </>

        )} />

        // 404
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div >
  );
}

export default App;
