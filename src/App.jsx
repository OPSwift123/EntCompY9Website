import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Issue from './pages/Issue'
import Data from './pages/Data'
import Solutions from './pages/Solutions'
import Help from './pages/Help'
import About from './pages/About'
import Development from './pages/Development'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="issue" element={<Issue />} />
          <Route path="data" element={<Data />} />
          <Route path="solutions" element={<Solutions />} />
          <Route path="help" element={<Help />} />
          <Route path="about" element={<About />} />
          <Route path="development" element={<Development />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
