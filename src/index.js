//import inbuilt react libraries
import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import store from './Store'
import {Provider} from 'react-redux'
import App from './App'

ReactDom.render(
	  <BrowserRouter>
	  	<Provider store={store}>
	  		<App />
	  	</Provider>
	  </BrowserRouter>,
	  document.getElementById('root')
	)
