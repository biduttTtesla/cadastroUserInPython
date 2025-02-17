import {BrowserRouter,Routes,Route} from 'react-router-dom'

//P A G E S
import AllUsers from './pages/AllUsers/AllUsers'
import AddUser from './pages/AddUser/AddUser'
import EditUser from './pages/EditUser/EditUser'

function App() {

  return (
      <div>

        <BrowserRouter>

          <Routes>

              <Route path='/' element={<AllUsers/>}/>
              <Route path='/addUser' element={<AddUser/>}/>
              <Route path='/putUser/:id' element={<EditUser/>}/>

          </Routes>
        
        </BrowserRouter>

      </div>
  )
}

export default App
