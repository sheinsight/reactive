import { Toaster } from 'react-hot-toast'

import { SingeStore } from './single-store/index.tsx'
import { MultipleStore } from './multiple-store/index.tsx'

const App = () => {
  return (
    <>
      <h1>Reactive Demo</h1>

      <SingeStore />
      <MultipleStore />

      <Toaster />
    </>
  )
}

export default App
