"use client";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { AdminProvider, useAdminContext } from "@/context/AdminContext"; // ✅ AdminProvider & Hook import
import "./globals.css";

// 🧠 Header component with dropdown
function AdminHeader() {
  const { userInfo, setUserInfo } = useAdminContext();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserInfo(null);
    window.location.href = "/admin";
  };

  return (
    <header className="header">
      <div className="header-title">Admin Dashboard</div>
      <div className="header-user">
        {userInfo ? (
          <div className="profile-dropdown">
            <span className="dropdown-toggle">
              Welcome, {userInfo.first_name} {userInfo.last_name} ⬇
            </span>
            <div className="dropdown-menu">
              <Link href="/admin/pro_admin">Profile</Link>
              <Link href="/admin/profile">InfoManager</Link>
              <Link href="/admin/update_password">Update Password</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <span>Loading...</span>
        )}
      </div>
    </header>
  );
}

function AdminAuthWrapper({ children }) {
  const { userInfo, loading } = useAdminContext();
  const router = useRouter();
  const pathname = usePathname();

  // Ye pages jin par login check nahi chahiye
  const publicPages = ["/admin", "/signup"];

  useEffect(() => {
    if (!loading) {
      // Agar page admin ka hai aur user admin nahi hai toh redirect karo login page pe
      if (!publicPages.includes(pathname)) {
        if (!userInfo || userInfo.role !== "admin") {
          router.replace("/admin");
        }
      } else {
        // Agar user logged in hai aur login page par hai, toh profile page pe bhejo
        if (userInfo && userInfo.role === "admin" && pathname === "/admin") {
          router.replace("/admin/profile");
        }
      }
    }
  }, [userInfo, loading, pathname, router]);

  if (loading) {
    return <div>Loading...</div>; // Ya spinner lagade yahan
  }

  return <>{children}</>;
}

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const noLayoutPages = ["/admin", "/signup"];
  const shouldShowLayout = !noLayoutPages.includes(pathname);

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Profile", path: "/admin/pro_admin" },
    { name: "Users", path: "/admin/users" },
    { name: "Slider", path: "/admin/slider" },
    { name: "Classes", path: "/admin/classes" },
    { name: "Trainers", path: "/admin/trainers" },
    { name: "Membership", path: "/admin/membership" },
    { name: "Contact", path: "/admin/contact" },

  ];

  return (
    <html lang="en">
      <head>
        <title>Admin Panel</title>
      </head>
      <body>
        <AdminProvider>
          <AdminAuthWrapper>
            {shouldShowLayout ? (
              <div className="admin-container">
                {/* Sidebar */}
                <aside className="sidebar">
                  <h2 className="sidebar-title">Admin Panel</h2>
                  <ul className="sidebar-menu">
                    {menuItems.map((item) => (
                      <li key={item.path}>
                        <Link
                          href={item.path}
                          className={`sidebar-link ${
                            pathname === item.path ? "active" : ""
                          }`}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </aside>

                <div className="main-content">
                  {/* ✅ Dynamic Header */}
                  <AdminHeader />

                  {/* Main Content */}
                  <main className="admin-content">{children}</main>

                  {/* Footer */}
                  <footer className="footer">
                    <p>&copy; 2025 Admin Panel. All Rights Reserved.</p>
                  </footer>
                </div>
              </div>
            ) : (
              <>{children}</>
            )}
          </AdminAuthWrapper>
        </AdminProvider>
      </body>
    </html>
  );
}
