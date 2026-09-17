import React, { useEffect, useRef } from "react";
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
// Sageion bootstrap — runs once per page load.
// ============================================================
function useSageionBootstrap() {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) {
      console.log(
        "SETUP DEBUGGING::: already ran — skipping (StrictMode double-invoke guard hit)",
      );
      return;
    }
    ran.current = true;

    const t0 = performance.now();
    const elapsed = () => `${(performance.now() - t0).toFixed(1)}ms`;

    (async () => {
      try {
        console.log("SETUP DEBUGGING::: bootstrap started", {
          t: elapsed(),
          hasSageionOS: !!window.sageion_os,
          hasAppConfig: !!window.__APP_CONFIG__,
        });

        if (!window.sageion_os) {
          console.warn(
            "SETUP DEBUGGING::: window.sageion_os is not defined. Did you load the bundle script?",
          );
          return;
        }

        console.log("SETUP DEBUGGING::: calling setUp()", {
          t: elapsed(),
          app_name: window.__APP_CONFIG__.SAGEION_APP_NAME,
          region: window.__APP_CONFIG__.SAGEION_REGION,
          chat_root_id: window.__APP_CONFIG__.ROOT_SAGEION_ID,
        });

        await window.sageion_os.setUp(
          window.__APP_CONFIG__.SAGEION_APP_NAME,
          window.__APP_CONFIG__.SAGEION_API_KEY,
          window.__APP_CONFIG__.SAGEION_REGION,
          window.__APP_CONFIG__.ROOT_SAGEION_ID,
        );

        console.log("SETUP DEBUGGING::: setUp() resolved", { t: elapsed() });

        const token = localStorage.getItem("token");
        console.log("SETUP DEBUGGING::: token check", {
          t: elapsed(),
          hasToken: !!token,
        });

        let initPayload = {};

        if (token) {
          try {
            console.log(
              "SETUP DEBUGGING::: fetching /auth/profile to resolve uid",
              { t: elapsed() },
            );

            const res = await fetch(
              `${window.__APP_CONFIG__.API_BASE_URL}/auth/profile`,
              { headers: { Authorization: `Bearer ${token}` } },
            );

            console.log("SETUP DEBUGGING::: /auth/profile responded", {
              t: elapsed(),
              status: res.status,
              ok: res.ok,
            });

            if (res.ok) {
              const user = await res.json();
              initPayload = { uid: user.id.toString() };
              console.log("SETUP DEBUGGING::: uid resolved", {
                t: elapsed(),
                uid: initPayload.uid,
              });
            } else {
              localStorage.removeItem("token");
              console.log(
                "SETUP DEBUGGING::: stale token — removed, proceeding as anonymous.",
              );
            }
          } catch (e) {
            console.error(
              "SETUP DEBUGGING::: profile fetch failed — proceeding as anonymous",
              { t: elapsed(), error: e },
            );
          }
        } else {
          console.log(
            "SETUP DEBUGGING::: no token — will initialize as anonymous",
          );
        }

        console.log("SETUP DEBUGGING::: calling initialize()", {
          t: elapsed(),
          payload: initPayload,
        });

        await window.sageion_os.initialize(initPayload);

        console.log("SETUP DEBUGGING::: initialize() resolved", {
          t: elapsed(),
          payload: initPayload,
        });
      } catch (err) {
        console.error("SETUP DEBUGGING::: bootstrap failed", {
          t: elapsed(),
          error: err,
          message: err?.message,
          kind: err?.kind,
        });
      }
    })();
  }, []);
}

// ============================================================
// Sageion user sync
//
// One line of SDK code. The effect fires whenever `user`
// changes; the SDK handles every transition internally:
//
//   user set   → initialize({ uid })  → login / switch
//   user null  → initialize({})       → logout → anonymous
//
// No `null`, no `.then()` chaining, no consumer-side
// sequencing. The SDK owns the state machine.
// ============================================================
function useSageionUserSync() {
  const { user } = useAuth();
  const booted = useRef(false);

  useEffect(() => {
    if (!booted.current) {
      booted.current = true;
      return;
    }

    if (!window.sageion_os) return;

    console.log("[Sageion] user changed — syncing SDK", {
      hasUser: !!user,
      uid: user?.id,
    });

    window.sageion_os
      .initialize(user ? { uid: String(user.id) } : {})
      .catch((err) =>
        console.error("[Sageion] initialize (sync) failed:", err),
      );
  }, [user]);
}

function SageionBridge() {
  useSageionBootstrap();
  useSageionUserSync();
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