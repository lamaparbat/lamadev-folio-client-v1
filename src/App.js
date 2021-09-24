import React from 'react'
import {useState, useEffect} from 'react'
import { Route, Switch } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import { $ } from 'react-jquery-plugin'
import Header from './Component/Header/Header.jsx'
import LoaderSpinner from './Component/Body/Loader/Loader.jsx'
import Homepage from './Component/Body/Homepage/Homepage.jsx'
import Project from './Component/Body/Project/Project.jsx'
import SelectedSite from './Component/Body/Project/SelectedSite.jsx'
import Admin from './Component/Body/Admin/Admin'
import Login from './Component/Body/Admin/Login'
import Error from './Error.jsx'
import Footer from './Component/Footer/Footer.jsx'
import {isLoadingCheck} from './Actions/index'
import {useDispatch,useSelector} from 'react-redux'
const App = () => {
  const data = useSelector((state) => state.workerReducer)
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(data)
    setTimeout(() => {
      setLoading(false)
      dispatch(isLoadingCheck(false))
    },2000)
  })
  return(
      <>
       <Header />
       {
        isLoading ? <LoaderSpinner /> :
        <>
         <Switch>
           <Route exact path="/" component={Homepage} />
           <Route exact path="/Project" component={Project} />
           <Route exact path="/SelectedSite" component={SelectedSite} />
           <Route exact path="/Admin" component={Admin} />
           <Route exact path="/Login" component={Login} />
           <Route component={Error} />
         </Switch>
         <Footer />
        </>
       }
      </>
    )
}

export default App;
