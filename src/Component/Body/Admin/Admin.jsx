import React from 'react'
import { useState, useEffect, useRef } from 'react'
import {useHistory} from 'react-router-dom'
import {firebase} from '../../../firebase';
import { $ } from 'react-jquery-plugin'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Project from '../Project/Project';
import './Admin.css'

const Admin = () => {
	const hostedUrl = useRef(null)
	const successToast = ()  => toast.success("successfully uploaded !!")
	const failedToast = ()  => toast.error("failed to upload !!")
	const emptyToast = ()  => toast.warn("Field is empty !!")
	//firebase constructor
	var db = firebase.firestore();
    var imageDatabase = firebase.storage()

	// handling template input data
	const [templateData, setData] = useState({
		title:"",
		description:"",
		price: "",
		url:""
	})

	//redirection page on unauthoraize access
	const history = useHistory()
	//get the email from firebase authentication
	try{
		const data = JSON.parse(localStorage.getItem("ParbatWeb"))
	    if(data){
	    	// toast.success("welcome admin")
	    }else{
	    	toast.info("you are restricted to access this page")
	    	history.push("/")
	    }
	}catch(error){
		console.log(error)
	}
	

	const inputEvent = (e) => {
		setData({
			...templateData,
			[e.target.name] : e.target.value
		})
	}

	// handling template image 
	const [imgData, setFile] = useState({
		file:[],
		url:"",
	})
	const setImage = (e) => {
		setFile({
			file:e.target.files,
			url:URL.createObjectURL(e.target.files[0])
		})
	}






















    var downloadURL = [];
	//upload templatedata in firebase store
	const uploadData = () => {
		if(templateData.file !="" && templateData.description !="" && templateData.price !="" && imgData.file != ""){
			// upload image data
			imageUpload()
		}else{
			emptyToast()
		}
	}

    // upload all the image to firebase storage
    const imageUpload = () => {
    	var fileCount = 1
		Object.entries(imgData.file).map((data, index) => {
			const uploadTask = imageDatabase.ref(`/template_images/+${data[1].name}`);
			uploadTask.put(data[1]).on('state_changed', (snapshot) => {
				//get the upload speed
				let percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100
				},(error) => {
			    	console.log(error)
			    },async() => {
			    	await uploadTask.getDownloadURL().then(finalUrl => {
			    		downloadURL.push(finalUrl)
			    	})
			    	if(fileCount == imgData.file.length){
			    		uploadAllData()
			    	}else{
			    		fileCount += 1
			    	}
			    }
			)
		})
    }

	// final uplaod for both template data and images URL to firestore database
	const uploadAllData = () => {
		// console.log(downloadURL)
		//upload data only if field is not empty
	    db.collection("parbat-5db79-default-rtdb").add({
			title:templateData.title,
			description:templateData.description,
			price: templateData.price,
			url: hostedUrl.current.value,
			file:downloadURL
		}).then((docRef) => {
			downloadURL = []
			successToast()
			
			//reset the input field
			setData({
				title:"",
				description:"",
				price: "",
				url:""
			})
			setFile({
				file:"",
				url:""
			})

			$("#file").val("")

		}).catch((error) => {
			failedToast()
		})

		console.log("data inserted ")
	}



























	return(
		  <>
		   <div className="container-fluid mt-5">
		   	 <div className="row">
		   	   <div className="col-10 mx-auto">
		   	     <div className="row">
		   	       <div className="col-lg-6 mt-4 mb-5">
		   	         {(imgData.url) ? 
		   	         	<img src={imgData.url} className="img-fluid" /> : 
		   	         	<img src="" className="img-fluid" />
		   	         }
		   	       </div>
		   	       <div className="col-lg-6 formContainer">
		   	          <input type="text" className="title form-control" placeholder="Enter Website name" name="title" value={templateData.title} onChange={inputEvent} /><br/>
		   	          <textarea className="description form-control" placeholder="Describe in short" name="description" value={templateData.description} onChange={inputEvent} ></textarea><br/>
		   	          <input type="text" className="price form-control" placeholder="Enter website price" name="price" value={templateData.price} onChange={inputEvent} /><br/>
								        <input type="file" className="price form-control" className="form-control" id="file" multiple name="file" onChange={setImage} /><br />
								        <input type="text" placeholder="Enter hosted website url (e.g https://abc.com)" className="form-control" ref={hostedUrl} /><br/>
		   	          <button className="btn btn-info text-white" onClick={uploadData}>Upload Template</button>
		   	          <ToastContainer />
		   	       </div>
		   	     </div>
		   	   </div>
		   	 </div>
      <Project />
		   </div>
		  </>
		)
}
export default Admin

