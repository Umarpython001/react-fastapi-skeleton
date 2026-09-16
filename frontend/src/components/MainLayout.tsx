import { useState } from 'react';
import { Link} from 'react-router';

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Professional Bootstrap Navbar. Navber Header*/}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <Link className='navbar-brand fw-bold text-primary' to='/'>
            Skeleton<span className="text-dark">Stack</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => {setIsNavCollapsed(!isNavCollapsed);
                console.log('Navbar toggled. isNavCollapsed:', !isNavCollapsed);
            }}
            aria-controls="navbarNav"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isNavCollapsed ? 'collapse' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/students">Students</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item ms-lg-3">
                <Link className="btn btn-outline-primary btn-sm me-2" to="/login">Sign In</Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-primary btn-sm" to="/register">Get Started</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content Area. Main, where all the children go*/}
      <main className="flex-grow-1 py-4">
        <div className="container">
          {children}
        </div>
      </main>

      {/* Clean Bootstrap Footer. Footerrr*/}
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
