import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// Componenti di pagina
const Record = () => {
  return (
    <div className="page-content">
      <h2>Record</h2>
      <p>Contenuto della pagina Record.</p>
    </div>
  );
};

const Market = () => {
  return (
    <div className="page-content">
      <h2>Market</h2>
      <p>Contenuto della pagina Market.</p>
    </div>
  );
};

const Istruzioni = () => {
  return (
    <div className="page-content">
      <h2>Istruzioni</h2>
      <p>Contenuto della pagina Istruzioni.</p>
    </div>
  );
};

const MenuP = () => {
  return (
    <Router>
      <div className="menu-container" style={{ padding: '2%' }}>
        <h1>Menu Principale</h1>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '2%' }}>
            <li>
              <Link to="/record">Record</Link>
            </li>
            <li>
              <Link to="/market">Market</Link>
            </li>
            <li>
              <Link to="/istruzioni">Istruzioni</Link>
            </li>
          </ul>
        </nav>
        <div className="page-wrapper" style={{ marginTop: '4%' }}>
          <Switch>
            <Route path="/record">
              <Record />
            </Route>
            <Route path="/market">
              <Market />
            </Route>
            <Route path="/istruzioni">
              <Istruzioni />
            </Route>
            {/* Rotta di default */}
            <Route path="/">
              <Record />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default MenuP;
