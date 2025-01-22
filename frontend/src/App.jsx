import {createBrowserRouter,createRoutesFromElements,RouterProvider,Route} from 'react-router-dom'
import FirstLayout from './Layout/FirstLayout';
import LandingPage from './pages/LandingPage';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const router=createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<FirstLayout/>}>
      <Route path="/" element={<LandingPage/>}/>
      <Route path='/addtask' element={<TaskForm/>}/> 
      <Route path='/view-task' element={<TaskList/>}/>

      </Route>
      </>
    ))


  return (
    <>
    <RouterProvider router={router}/>
      
    </>
  )
}

export default App
