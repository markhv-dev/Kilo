import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Words from './pages/Words'
import Practice from './pages/Practice'
import MarkPractice from './pages/MarkPractice'
import MarkWords from './pages/MarkWords'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/words" element={<Words />} />
      <Route path="/practice" element={<Practice />} />
      <Route path="/mark" element={<MarkPractice />} />
      <Route path="/mark/words" element={<MarkWords />} />
    </Routes>
  )
}
