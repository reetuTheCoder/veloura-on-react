import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Offers from "./pages/Offers";
import Dining from "./pages/Dining";
import Amenities from "./pages/Amenities";
import Gallery from "./pages/Gallery";
import Attractions from "./pages/Attractions";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

// ============================================================
// Sageion — reference client integration.
//
// The SDK exposes two methods on window.sageion_os:
//
//   setUp()       — configuration. Call ONCE per page load.
//   initialize()  — auth state. Call whenever the user changes.
//
// Four rules a correct integration must honor:
//
//   1. setUp() runs once, awaited, before any initialize().
//   2. initialize() is called from exactly one place.
//   3. initialize() is gated on auth having SETTLED
//      (loading === false), not on user being non-null.
//   4. initialize() receives the current user, once per change.
//
// Two effects. Two concerns. No overlap. No state refs.
// ============================================================

function useSageionSetUp() {
  const [ready, setReady] = useState(false);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    (async () => {
      try {
        await window.sageion_os.setUp(
          window.__APP_CONFIG__.SAGEION_APP_ID,
          window.__APP_CONFIG__.SAGEION_API_KEY,
          window.__APP_CONFIG__.SAGEION_REGION,
          window.__APP_CONFIG__.ROOT_SAGEION_ID,
        );
        setReady(true);
      } catch (err) {
        // The SDK renders its own user-facing error UI for
        // credential or network failures. Log and move on.
        console.error("[Sageion] setUp failed:", err);
      }
    })();
  }, []);

  return ready;
}

function useSageionInitialize(setUpReady) {
  const { user, loading } = useAuth();

  useEffect(() => {
    // Gate 1: setUp() must have resolved.
    if (!setUpReady) return;

    // Gate 2: AuthContext must have settled. Without this, the
    // effect fires while `user` is still null during the initial
    // auth check, producing an anonymous → authenticated
    // transition on every page load.
    if (loading) return;

    // The user's current identity. The SDK handles every
    // transition internally:
    //
    //   user set   → initialize({ uid })  → login / switch
    //   user null  → initialize({})       → logout → anonymous
    //
    // Same payload twice → no-op. Safe to call as often as this
    // effect fires.
    window.sageion_os
      .initialize(user ? { uid: String(user.id) } : {})
      .catch((err) => console.error("[Sageion] initialize failed:", err));
  }, [setUpReady, loading, user]);
}

// Must be rendered INSIDE <AuthProvider> so useAuth() resolves
// to the correct context.
function SageionBridge() {
  const setUpReady = useSageionSetUp();
  useSageionInitialize(setUpReady);
  return null;
}

function App() {
  return (
    <AuthProvider>
      <SageionBridge />
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/dining" element={<Dining />} />
              <Route path="/amenities" element={<Amenities />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/attractions" element={<Attractions />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;