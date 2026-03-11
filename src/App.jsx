import { useState } from 'react';
import Scorecard from './components/Scorecard';
import PrivacyPolicy from './components/PrivacyPolicy';

export default function App() {
  const path = window.location.pathname;
  if (path === '/privacy') return <PrivacyPolicy />;
  return <Scorecard />;
}