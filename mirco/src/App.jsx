import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Counter } from './features/counter/counter'
import FileSelectDropdown from '../components/FileSelectDropdown'
import FileContentDisplay from '../components/FileContentDisplay'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Counter />
      <FileSelectDropdown />
      <FileContentDisplay />
    </>
  )
}

export default App
