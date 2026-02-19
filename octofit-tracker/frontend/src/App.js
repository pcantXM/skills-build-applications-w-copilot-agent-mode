import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function Home() {
  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body p-4 p-md-5">
        <h2 className="h3 mb-3 text-primary-emphasis">Welcome to Octofit Tracker!</h2>
        <p className="mb-4 text-secondary">
          Track your activities, compare progress on the leaderboard, and stay motivated with your team.
        </p>
        <div className="d-flex flex-wrap gap-2">
          <Link className="btn btn-primary" to="/activities">
            View Activities
          </Link>
          <Link className="btn btn-outline-primary" to="/leaderboard">
            Open Leaderboard
          </Link>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="app-shell">
      <header className="container py-4">
        <nav className="navbar navbar-expand-lg bg-white rounded-3 shadow-sm px-3 px-lg-4">
          <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
            <img
              src="/docs/octofitapp-small.png"
              alt="Octofit logo"
              className="brand-logo"
              onError={(event) => {
                event.currentTarget.src = '/logo192.png';
              }}
            />
            <span className="brand-title">Octofit Tracker</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#octofitNav"
            aria-controls="octofitNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="octofitNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-2">
              <li className="nav-item">
                <Link className="nav-link" to="/activities">
                  Activities
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">
                  Leaderboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">
                  Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">
                  Workouts
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="container pb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>

      <footer className="container pb-4">
        <div className="text-center small text-secondary">
          Built with{' '}
          <a className="link-primary" href="https://getbootstrap.com/" target="_blank" rel="noreferrer">
            Bootstrap
          </a>
          {' '}and React.
        </div>
      </footer>
    </div>
  );
}

export default App;
