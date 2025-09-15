import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Redirecionamento de rota não encontrada */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
