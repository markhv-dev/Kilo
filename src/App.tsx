import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Words from './pages/Words'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/words" element={<Words />} />
    </Routes>
  )
}
