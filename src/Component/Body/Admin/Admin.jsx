import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import Project from '../Project/Project';
import axios from 'axios';
import './Admin.css';

const Admin = () => {

	// handling template input data
	const [templateData, setData] = useState({
		title: "",
		description: "",
		price: "",
		github: "",
		file: {}
	})

	//redirection page on unauthoraize access
	const history = useHistory()
	//get the email from firebase authentication
	try {
		const data = JSON.parse(localStorage.getItem("ParbatWeb"))
		if (data) {
		} else {
			history.push("/")
		}
	} catch (error) {
		console.log(error)
	}


	const inputEvent = (e) => {
		setData({
			...templateData,
			[e.target.name]: e.target.value
		})
	}
	
	// handling template image 
	const setImage = (e) => {
		setData({
			...templateData,
			file: e.target.files[0].name
		})
		console.log(e.target)
	}
	
	const setGithub = (e) => {
		setData({
			...templateData,
			github: e.target.value
		})
	}
	
//send data to server for upload to db
	const submitData = (e) => {
		e.preventDefault()
		let form = document.getElementById('form');
		let formData = new FormData(form);
		axios.post('https://parbat-backend.herokuapp.com/uploadProject', formData);
		setData({
			title: "",
			description: "",
			price: "",
			github: "",
			file: {}
		})
	}
	
	return (
		<>
			<div className="container-fluid mt-5">
				<div className="row">
					<div className="col-10 mx-auto">
						<div className="row">
							<div className="col-lg-6 mt-4 mb-5">
								{(null) ?
									<img src="" className="img-fluid" /> :
									<img src="" className="img-fluid" />
								}
							</div>
							<div className="col-lg-6 formContainer">
								<form onSubmit={submitData} encType="multiple/form-data" id="form">
									<input type="text" className="title form-control" placeholder="Enter Website name" name="title" value={templateData.title} onChange={inputEvent} /><br />
									<textarea className="description form-control" placeholder="Describe in short" name="description" value={templateData.description} onChange={inputEvent} ></textarea><br />
									<input type="text" className="price form-control" placeholder="Enter website price" name="price" value={templateData.price} onChange={inputEvent} /><br />
									<input type="text" className="form-control" name="github" value={templateData.github} onChange={setGithub} placeholder="Enter github repository url "/><br/>
									<input type="file" className="price form-control" id="file" multiple name="file" onChange={(e) => setImage(e)} /><br />
									<button type="submit" className="btn btn-info text-white">Upload Template</button>
								</form>
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

