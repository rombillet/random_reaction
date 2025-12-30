import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import NumberGenerator from './pages/NumberGenerator.jsx';

export default function App() {
  return (
    <div className="min-h-screen px-5 pb-16 pt-10 text-ink sm:px-8">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/numbers" element={<NumberGenerator />} />
      </Routes>
    </div>
  );
}
