import { useState } from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Professional Bootstrap Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <a className="navbar-brand fw-bold text-primary" href="/">
            Skeleton<span className="text-dark">Stack</span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsNavCollapsed(!isNavCollapsed)}
            aria-controls="navbarNav"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isNavCollapsed ? 'collapse' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/students">Students</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About</a>
              </li>
              <li className="nav-item ms-lg-3">
                <a className="btn btn-outline-primary btn-sm me-2" href="/login">Sign In</a>
              </li>
              <li className="nav-item">
                <a className="btn btn-primary btn-sm" href="/register">Get Started</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow-1 py-4">
        <div className="container">
          {children}
        </div>
      </main>

      {/* Clean Bootstrap Footer */}
      <footer className="bg-white border-top py-4 mt-auto">
        <div className="container text-center">
          <p className="text-muted mb-0 small">
            &copy; {new Date().getFullYear()} <span className="fw-semibold">SkeletonStack</span>. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
