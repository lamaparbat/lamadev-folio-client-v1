import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { $ } from 'react-jquery-plugin'
import { SelectedSiteData } from '../../../Actions/index.js'
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import BreadLink from '@material-ui/core/Link';
import LoaderSpinner from '../Loader/Loader'
import './Project.css'
import axios from 'axios'

const Project = () => {
	const deleteToast = () => toast.warn("Deleted Successfully !!")

	//loader 
	const [isLoading, setLoading] = useState(true)

	const dispatch = useDispatch()

	let history = useHistory()
	let path = 'SelectedSite'
	const sendSelectedData = (data) => {
		console.log(data)
		window.localStorage.setItem("data", JSON.stringify(data))
		setTimeout(() => {
			history.push(path)
		}, 2000)
	}

	//redirec to homepage
	const redirectHome = () => {
		setTimeout(() => {
			history.push("/")
		}, 2000)
	}

	//delete the template
	const deleteTemplate = (src) => {
		axios.post('http://localhost:5000/deleteProject', {
			src: src
		}).then((res, err) => {
			 deleteToast()
		})
	}

	//fetchedData
	const [fetchedData, setFetchedData] = useState([])
	
	useEffect(() => {
		axios.get("http://localhost:5000/allProjects").then(data => {
			setFetchedData(data.data)
		})
		if (fetchedData) {
			setLoading(false)
		} else {
			setLoading(true)
		}
	}, [])
	
	const Card = (props) => {
		console.log(__dirname + "uploads/file-" + props.img)
		return (
			<>
				<div className="card me-4 mb-4" style={{ width: "350px", border: "1px solid white" }} onClick={() => sendSelectedData(props)}>
					<DeleteIcon className={"DeleteIcon " + (history.location.pathname != "/admin" ? "d-none" : "d-block")} onClick={() => deleteTemplate(props.img)} />
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
							isLoading ? <LoaderSpinner /> :
								<div className="row mx-auto">
									{
										fetchedData.map((data, index) => {
											return (
												<Card title={data.title} description={data.description} price={data.price} img={data.file} id={index} />
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