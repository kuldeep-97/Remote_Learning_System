
import './App.css'
import Navbar from './components/Navbar';
import { Button } from './components/ui/button'
import Login from './pages/login'

function App() {

  return (
    
    <main>
         {/* <Button>Let's build LMS : fire</Button> */}
         <Login/>
         <Navbar/>
    </main>
  )
}

export default App;

