import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import BreadLink from '@material-ui/core/Link';
import LoaderSpinner from '../Loader/Loader';
import './Project.css';
import axios from 'axios';
import Pusher from 'pusher-js';

const Project = () => {
	const deleteToast = () => toast.warn("Deleted Successfully !!");

	//loader 
	const [isLoading, setLoading] = useState(true);

	let history = useHistory();
	
	let path = 'SelectedSite';
	
	const sendSelectedData = (data) => {
		console.log(data)
		window.localStorage.setItem("data", JSON.stringify(data));
		setTimeout(() => {
			history.push(path);
		}, 1000)
	}

	//redirec to homepage
	const redirectHome = () => {
		setTimeout(() => {
			history.push("/");
		}, 1000)
	}

	//delete the template
	const deleteTemplate = (e,src) => {
		e.stopPropagation()
		axios.post('https://parbat-backend.herokuapp.com/deleteProject', {
			src: src
		}).then((res, err) => {
			deleteToast();
		})
	}

	//fetchedData
	const [fetchedData, setFetchedData] = useState([])
	
	useEffect(() => {
		axios.get("https://parbat-backend.herokuapp.com/allProjects").then(data => {
			console.log(data)
			setFetchedData(data.data);
		})
		if (fetchedData) {
			setLoading(false);
		} else {
			setLoading(true);
		}
	}, [])
	
	
	//db changes tracker --> pusher
	var pusher = new Pusher('c8b41493bbaaefc790c7', {
		cluster: 'ap2'
	});

	var channel = pusher.subscribe('projects');
	channel.bind('inserted', function (data) {
		setFetchedData([...fetchedData, data]);
	});
	
	channel.bind('delete', function (message) {
		console.log(message)
		axios.get("https://parbat-backend.herokuapp.com/allProjects").then(data => {
			setFetchedData(data.data);
		})
	})
	
	
	const Card = (props) => {
		return (
			<>
				<div className="card me-4 mb-4" style={{ width: "350px", border: "1px solid white" }} onClick={() => sendSelectedData(props)}>
					<DeleteIcon className={"DeleteIcon " + (history.location.pathname != "/admin" ? "d-none" : "d-block")} onClick={(e) => deleteTemplate(e,props.img)} />
					<img src={__dirname+"uploads/"+props.img[0]} height="100%" width="100%" loading="lazy" />
				</div>
			</>
		)
	}

	return (
		<>
			<div className="container projects my-5">
				<Breadcrumbs arial-label="breadcumb" className="bg-light py-3 text-" style={{ paddingLeft: "30px", paddingRight: "80px", width: "fit-content", marginLeft: "10px", borderRadius: "5px", cursor: "pointer" }}>
					<BreadLink color="inherit"><Link onClick={redirectHome} className="text-decoration-none">Home</Link></BreadLink>
					<BreadLink className="text-danger" color="textPrimary">Projects</BreadLink>
				</Breadcrumbs><br />
				<div className="row">
					<div className="col-sm-12 py-3 mx-auto bg-">
						{
							fetchedData.length === 0 ? <center><h5 className="text-secondary my-5 "> Loading........</h5></center> : null
						}
						{
							isLoading ? <LoaderSpinner /> :
								<div className="row mx-auto">
									{
										fetchedData.map((data, index) => {
											return (
												<Card title={data.title} description={data.description} hostURL={data.hostURL} github={data.github} img={data.file} id={index} key={index} />
											)
										})
									}
								</div>
						}
					</div>
				</div>
			</div><br /><br />
			<ToastContainer />
		</>
	)
}
export default Project