import './Admin.css'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import FacebookIcon from '@material-ui/icons/Facebook';
import {firebase} from '../../../firebase'
import {ToastContainer, toast} from 'react-toastify'
import Checkbox from '@material-ui/core/Checkbox'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [userData, setUserData] = useState({
		email:"",
		password:""
	})
	const [save, setCheckValue] = useState(true)

	// url history
	const history = useHistory()

	// login toast
	const successToast =  () => toast.success("Login successfull !!")
	const errorToast = () =>  toast.error("Email & Password Not matched !!")
	const emptyToast = () =>  toast.error("Empty Field !!")
	const invalidToast = () =>  toast.error("Invalid Email !!")

	//email type event
	const emailKeypress = (e) => {
		setEmail(e.target.value)
	}
	//password type event
	const passwordKeypress = (e) => {
		setPassword(e.target.value)
	}
	//save password
	const savePassword = (e) => {
		let data = {
			email:email,
			password:password
		}
		setUserData(data)
		if(save == false){
			setCheckValue(true)
		}else{
			setCheckValue(false)
		}
	}

	const login = () => {
		if(email && password){
			if(email.search("@") > 0 && email.search("gmail") > 0 && email.search(".") >= 0 && email.search("com") > 0){
				firebase.auth().signInWithEmailAndPassword(email, password)
				.then(() => {
					successToast()
					!(save) ? window.localStorage.setItem("ParbatWeb",JSON.stringify(userData)) : window.localStorage.setItem("ParbatWeb",JSON.stringify(userData))
					setTimeout(() => {
						history.push("Admin")
					},1000)
				})
				.catch((error) => {
					errorToast()
			    })
			}else{
				invalidToast()
			}
		}else{
			emptyToast()
		}
	}
	return(
		  <>
		   <div className="container-fluid my-5">
		   	 <div className="row">
		   	   <div className="col-10 mx-auto">
		   	     <div className="row">
		   	       <div className="col-lg-4"></div>
		   	       <div className="col-lg-4 bg-light py-5 px-5">
		   	         <h3 className="mb-4">Login Form</h3>
		   	         <input type="email" className="email form-control" placeholder="Enter email" value={email} onChange={emailKeypress}/><br/>
		   	         <input type="password" className="price form-control" placeholder="Enter password" value={password} onChange={passwordKeypress}/>
		   	         <Checkbox checked={save} value={save} onClick={savePassword} className="mt-2" style={{marginLeft:"-10px",marginBottom:"10px"}} /><span>Save Password ?</span><br />
		   	         <button className="btn btn-info text-white mb-2" onClick={login}>Login</button><br />
		   	         <a href="#">Forgotten password ?</a><hr />
		   	         <center><button className="btn btn-info text-white mb-2 border-0" style={{backgroundColor:"#3b5998"}}><FacebookIcon style={{marginTop:"-2px"}}/> Login with Facebook</button></center>
		   	         <br />
		   	       </div>
		   	       <div className="col-lg-4"></div>
		   	     </div>
		   	   </div>
		   	 </div>
		   </div>
		  </>
		)
}

export default Login