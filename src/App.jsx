import { useState } from 'react'
import QuranPlayer from './components/QuranPlayer'
import './App.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <QuranPlayer />
    </>
  )
}

export default App
