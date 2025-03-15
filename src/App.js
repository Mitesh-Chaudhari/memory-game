import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import MemoryGame from "./pages/MemoryGame"
import "./styles/App.css"

function App() {
  return (
      <Router>
        <div className="app">
          <Header />
          <main className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<MemoryGame />} />
            </Routes>
          </main>
        </div>
      </Router>
  )
}

export default App

