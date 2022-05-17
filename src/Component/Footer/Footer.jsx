import { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import {$} from 'react-jquery-plugin'
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import {useState} from 'react'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { firebase } from '../../firebase.js'
import axios from 'axios';
import 'animate.css'
import './Footer.css'

const Footer = () => {
	const db = firebase.firestore()
	const [email, setEmail] = useState("")
	
	const getEmail = (e) => {
		setEmail(e.target.value)
	}
	
	//subcribe btn clicked
	const subscribeSuccessToast = () => toast.success("Thank you !!")
	const errorSubscribeToast = () => toast.error("Email is invalid !!")
	const emptyToast = () => toast.error("Field is empty !!")
	const subscribeBtnClicked = () => {
		if(email){
			if(email.search("@") > 0 && email.search("gmail") > 0 && email.search(".") >= 0 && email.search("com") > 0){
				//sending data to server 
				axios.post("https://parbat-backend.herokuapp.com/subscribe", {
					email: email
				});
				subscribeSuccessToast()
				setEmail("")
			}else{
				errorSubscribeToast()
			}
		}else{
			emptyToast()
		}

	}

	const redirectFb = () => {
		window.location.assign("https://www.facebook.com/parbhat.thangwallama/")
	}
	const redirectInsta = () => {
		window.location.assign("https://www.instagram.com/prabhattmg/")
	}
	const redirectTwitter = () => {
		window.location.assign("https://twitter.com/LamaParbat70")
	}
	const redirectLinked = () => {
		window.location.assign("https://www.linkedin.com/in/parbat-lama-0bb4101b8/")
	}
	const redirectWhatsapp = () => {
		window.location.assign("https://www.facebook.com/parbhat.thangwallama/")
	}

	// smooth animation on scroll
	$(window).scroll(() => {
		let height = $(window).scrollTop()
		if(height > 2850){
			$(".brandName").addClass("animate_animated animate__bounceIn")
			$(".brandNameTitle").addClass("animate_animated animate__bounceIn animate__delay-1s")
			$(".subscribe h5").addClass("animate_animated animate__bounceIn animate__delay-2s")
			$(".subscribe div input").addClass("animate_animated animate__bounceIn animate__delay-3s")
			$(".subscribe div button").addClass("animate_animated animate__bounceIn animate__delay-4s")
			$(".col-lg-3 h5").addClass("animate_animated animate__bounceIn animate__delay-5s")
			$(".col-lg-3 div #fb").addClass("animate_animated animate__heartBeat animate__delay-0s")
			$(".col-lg-3 div #insta").addClass("animate_animated animate__heartBeat animate__delay-1s")
			$(".col-lg-3 div #twit").addClass("animate_animated animate__heartBeat animate__delay-3s")
			$(".col-lg-3 div #linked").addClass("animate_animated animate__heartBeat animate__delay-4s")
		}
	})
	return(
		  <>
		   <div className="container footer pb-5" id='footer'>
		     <div className="row py-5">
		       <div className="col-1"></div>
		       <div className="col-10">
		         <div className="row">
		           <div className="col-lg-4">
		            <a className="navbar-brand m-0 p-0 " href="#"><h4 className="brandName">ParbatLama</h4></a>
		            <p className="brandNameTitle mt-3">Let us take you into a deeper experience, make a moment a 
		            lasting conveyable memory. Let us help build your tribe.</p>
		           </div>
		           <div className="col-lg-5 subscribe pt-3"><br />
		            <h5 className=""> Ready to get started! Talk to us today</h5>
		            <div className="d-flex mt-4">
		             <input type="email" className="email p-2 me-2 text-primary" value={email}  onChange={getEmail} placeholder="Your email" />
		             <button className="subscribeBtn" onClick={subscribeBtnClicked}>SUBSCRIBE</button>
		            </div>
		           </div>
		           <div className="col-lg-3 pt-3 pl-2"><br />
		            <h5 className="mx-5"> Follow Me On</h5>
		            <div className="mt-4 d-flex justify-content-center mb-5">
		            	<Avatar id="fb" className="bg-primary me-3">
				          <FacebookIcon onClick={redirectFb} />
				        </Avatar>
				        <Avatar id="insta" className="bg-danger me-3">
				          <InstagramIcon onClick={redirectInsta} />
				        </Avatar>
				        <Avatar id="twit" className="bg-success me-3">
				          <TwitterIcon onClick={redirectTwitter} />
				        </Avatar>
				        <Avatar id="linked" className="bg-danger me-3">
				          <LinkedInIcon onClick={redirectLinked} />
				        </Avatar>
		            </div>
		           </div><hr />

		            <div className="copyright d-flex" style={{marginTop:"-10px"}}>
				     <a className="text-secondary ">&copy;CopyrightParbatLama</a>
				     <a href="#" className="text-secondary">Terms and Policy</a>
				     <a href="#" className="text-secondary">Help</a>
				     <a href="#" className="text-secondary">Services</a>
				     <a href="#" className="text-secondary">Contact</a>
				    </div> 
				    <ToastContainer />
		         </div>
		       </div>

		     </div>
		   </div>
		  </>
		)
}
export default Footer