import { useState } from 'react'
import Divider from '@material-ui/core/Divider'
import VisibilityIcon from '@material-ui/icons/Visibility'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import BreadLink from '@material-ui/core/Link'
import { Link, useHistory } from 'react-router-dom'
import LoadingSpinner from '../Loader/Loader'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import './Project.css';


const SelectedSite = () => {
	//redirec to homepage
	var data = JSON.parse(window.localStorage.getItem("data"))

	const [isLoading, setLoading] = useState()
	const history = useHistory()
	const redirectHome = () => {
		setLoading(true)
		setTimeout(() => {
			history.push("/")
			setLoading(false)
		}, 1000)
	}
	const redirectProject = () => {
		setLoading(true)
		setTimeout(() => {
			history.push("Project")
			setLoading(false)
		}, 1000)
	}
	return (
		<>
			{
				isLoading ? <LoadingSpinner /> :
					<>
						<div className="container-fluid my-5 py-2 SelectedSite">
							<div className="row">
								<div className="col-10 mx-auto" style={{ height: "fit-content" }}>
									<Breadcrumbs arial-label="breadcumb" className="bg-light py-3 Breadcrumbs">
										<BreadLink>
											<Link className="text-decoration-none" onClick={redirectHome}>Home</Link>
										</BreadLink>
										<BreadLink>
											<Link className="text-decoration-none" onClick={redirectProject}>Projects</Link>
										</BreadLink>
										<BreadLink>
											<Link className="text-danger text-decoration-none" to="/SelectedSite">Project Details</Link>
										</BreadLink>
									</Breadcrumbs><br />
									<div className="row">
										<div className="col-lg-6">
											<Carousel>
												{
													data.img.slice(0).reverse().map((src, index) => (
														<div>
															<img key={index} src={__dirname + "uploads/" + src} loading="lazy" />
														</div>
													))
												}
											</Carousel>
										</div>
										<div className="col-lg-5 productDetails">
											<h2 className="title">{data.title}</h2>
											<p className="description">{data.description}</p>
											<p>Github-Repos:<a href={data.github}>{data.github}</a></p>
											<a href={"https://"+data.hostURL} className="btn btn-info text-white viewBtn me-2" style={data.hostURL  ? { pointerEvents: "all", opacity: "1" } : { pointerEvents: "none", opacity: "0.6" }}><VisibilityIcon style={{ marginTop: "-3px", marginRight: "5px", fontSize: "20px" }} /> View Site</a>
											<p></p>
											<Divider style={{ width: "300px", height: "1px", background: "#424242" }} />

										</div>
										<div className="col-lg-1"></div>
									</div>
								</div>
							</div>
						</div>
					</>
			}
		</>
	)
}
export default SelectedSite