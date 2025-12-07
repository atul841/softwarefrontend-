import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import ProtectedRoute from "./components/ProtectedRoute";


import Purchase from "./pages/Purchase/Purchase";


import Dashboard from "./pages/Dashboard/Dashboard";
import MyProfile from "./pages/Profile/MyProfile";
import KycDetails from "./pages/Profile/KycDetails";
import MySubordinate from "./pages/Members/MySubordinate";
import MySubordinateLevel from "./pages/Members/MySubordinateLevel";
import PurchaseSubscription from "./pages/Subscription/PurchaseSubscription";
import SubscriptionReport from "./pages/Subscription/SubscriptionReport";
import ViewVideos from "./pages/Learn/ViewVideos";
import Referral from "./pages/Income/Referral";
import LearnEarn from "./pages/Income/LearnEarn";
import Withdrawal from "./pages/Withdrawal/Withdrawal";
import Report from "./pages/Withdrawal/Report";
import Deposit from "./pages/Fund/Deposit";
import DepositHistory from "./pages/Fund/DepositHistory";
import DepositWalletHistory from "./pages/Fund/DepositWalletHistory";
import WithdrawWalletHistory from "./pages/Fund/WithdrawWalletHistory";
import ReferralWalletTransfer from "./pages/Fund/ReferralWalletTransfer";
import ReferralWalletHistory from "./pages/Fund/ReferralWalletHistory";
import LearnEarnWalletTransfer from "./pages/Fund/LearnEarnWalletTransfer";
import LearnEarnWalletHistory from "./pages/Fund/LearnEarnWalletHistory";
import ChangePin from "./pages/Settings/ChangePin";
import ChangePassword from "./pages/Settings/ChangePassword";
import UserNotification from "./pages/Settings/UserNotification";
import AdminNotification from "./pages/Settings/AdminNotification";
import Support from "./pages/Support/Support";
import SupportHistory from "./pages/Support/SupportHistory";
import VideoGallery from "./pages/Learn/VideoGallery";
import Logout from "./pages/Logout";
import PaymentSuccess from './pages/Purchase/PaymentSuccess'

// ==== Auth Pages ====
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Registration/Login";
import ResetPassword from "./pages/Registration/ResetPassword";





function Layout() {
  const location = useLocation();

  // ✅ Hide sidebar/topbar on auth & Purchase pages
  const hideLayoutRoutes = ["/", "/login" ,"/Purchase" ,"/reset-password/:token"];
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div className="app-layout">
      {!hideLayout && <Sidebar />}
      <div className={hideLayout ? "main-container" : "main-container with-sidebar"}>
        {!hideLayout && <Topbar />}

        <main className="main-content">
          <Routes>
            {/* === Auth Routes === */}
            <Route path="/" element={<Registration />} />
            <Route path="/login" element={<Login />} />


            {/* === Purchase Page (accessible after login only) === */}
            <Route path="/Purchase" element={<Purchase />} />
             <Route path="/payment/success" element={<PaymentSuccess />} />
             <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* === Protected Routes (login + purchase required) === */}


            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
                
                
              }
            />       
           
             
           
            <Route
              path="/myprofile/profile"
              element={
                <ProtectedRoute>
                  <MyProfile />
                </ProtectedRoute>
              }
            />
            <Route                          
              path="/myprofile/kyc-details" 
              element={         
                <ProtectedRoute>   
                  <KycDetails />  
                </ProtectedRoute>   
              }
            />
            <Route
              path="/members/subordinate"
              element={
                <ProtectedRoute>
                  <MySubordinate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/members/level"
              element={
                <ProtectedRoute>
                  <MySubordinateLevel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subscription/purchase"
              element={
                <ProtectedRoute>
                  <PurchaseSubscription />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subscription/report"
              element={
                <ProtectedRoute>
                  <SubscriptionReport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/learn/learn-earn"
              element={
                <ProtectedRoute>
                  <ViewVideos />
                </ProtectedRoute>
                
                
              }
            />
            <Route
              path="/income/referral"
              element={
                <ProtectedRoute>
                  <Referral />
                </ProtectedRoute>
              }
            />
            <Route
              path="/income/learn-earn"
              element={
                <ProtectedRoute>
                  <LearnEarn />
                </ProtectedRoute>
              }
            />
            <Route
              path="/withdrawal/withdrawal"
              element={
                <ProtectedRoute>
                  <Withdrawal />
                </ProtectedRoute>
              }
            />
            <Route
              path="/withdrawal/report"
              element={
                <ProtectedRoute>
                  <Report />
                </ProtectedRoute>
              }
            />
            <Route
              path="/fund/deposit"
              element={
                <ProtectedRoute>
                  <Deposit />
                </ProtectedRoute>
              }
            />
            <Route
              path="/fund/depositehistory"
              element={
                <ProtectedRoute>
                  <DepositHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/fund/depositwallethsitroy"
              element={
                <ProtectedRoute>
                  <DepositWalletHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/fund/withdrawallethistory"
              element={
                <ProtectedRoute>
                  <WithdrawWalletHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/fund/ReferralWalletTransfer"
              element={
                <ProtectedRoute>
                  <ReferralWalletTransfer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/fund/ReferralWalletHistory"
              element={
                <ProtectedRoute>
                  <ReferralWalletHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/fund/LearnEarnWalletTransfer"
              element={
                <ProtectedRoute>
                  <LearnEarnWalletTransfer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/fund/LearnEarnWalletHistory"
              element={
                <ProtectedRoute>
                  <LearnEarnWalletHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings/ChangePin"
              element={
                <ProtectedRoute>
                  <ChangePin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings/ChangePassword"
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings/UserNotification"
              element={
                <ProtectedRoute>
                  <UserNotification />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings/AdminNotification"
              element={
                <ProtectedRoute>
                  <AdminNotification />
                </ProtectedRoute>
              }
            />
            <Route
              path="/supports/support"
              element={
                <ProtectedRoute>
                  <Support />
                </ProtectedRoute>
              }
            />
            <Route
              path="/supports/supporthistroy"
              element={
                <ProtectedRoute>
                  <SupportHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/viewvideo"
              element={
                <ProtectedRoute>
                  <VideoGallery />
                </ProtectedRoute>
              
                
              }
            />
            <Route path="/logout/logout" element={<Logout />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// ==== Main App ====
export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
