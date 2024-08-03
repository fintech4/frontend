import React from 'react';
import HomePage from './components/page/HomePage';
import AboutPage from './components/page/AboutPage';
import ContactPage from './components/page/ContactPage';
import './assets/css/styles.css';

const App = () => (
  <div>
    <header>
      <h1>Stock Market Simulator</h1>
    </header>
    <main>
      <HomePage />
      <AboutPage />
      <ContactPage />
    </main>
  </div>
);

export default App;
