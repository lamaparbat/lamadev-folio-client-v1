import {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { $ } from 'react-jquery-plugin'
import {SelectedSiteData} from '../../../Actions/index.js'
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux'
import {firebase} from '../../../firebase'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import BreadLink from '@material-ui/core/Link';
import LoaderSpinner from '../Loader/Loader'
import './Project.css'

const Project = () => {
	const deleteToast = () => toast.warn("Deleted Successfully !!")

	//firebase constructor
	var db = firebase.firestore();
    var imageDatabase = firebase.storage()

    //loader 
    const [isLoading, setLoading] = useState()

	const dispatch = useDispatch()

	let history = useHistory()
	let path = 'SelectedSite'
	const sendSelectedData = (data) => {
		console.log(data)
		window.localStorage.setItem("data",JSON.stringify(data))
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
			history.push(path)
		},2000)
	}

	//redirec to homepage
	const redirectHome = () => {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
			history.push("/")
		},2000)
	}

	//delete the template
	const deleteTemplate = (src) => {
		db.collection("parbat-5db79-default-rtdb").where("file", "==" , src)
		.get()
		.then(snapshot => {
			deleteToast()
			snapshot.docs[0].ref.delete()
		})
	}

	//fetchedData
    const [fetchedData, setFetchedData] = useState([])

    //fetching data from firebase
    useEffect(() => {
    	db.collection("parbat-5db79-default-rtdb").onSnapshot(snapshot => {
    		setFetchedData(snapshot.docs.map(doc => doc.data()))
    	})
    },[])

	const Card = (props) => {
		return(
			  <>
			    <div className="card me-4 mb-4" style={{width:"350px",border:"1px solid white"}}  onClick={() => sendSelectedData(props)}>
					<DeleteIcon className={"DeleteIcon " + (history.location.pathname != "/admin" ? "d-none" : "d-block") } onClick={() => deleteTemplate(props.img)}/>
			      <img src={props.img[props.img.length-1]} height="100%" width="100%" />
			    </div>
			  </>
			)
	}

	return(
		 <>
		  {
		  	isLoading ? <LoaderSpinner /> :
		  	<>
		  	 <div className="container projects my-5">
			    <Breadcrumbs arial-label="breadcumb" className="bg-light py-3 text-" style={{paddingLeft:"30px",paddingRight:"80px",width:"fit-content",marginLeft:"10px",borderRadius:"5px",cursor:"pointer"}}>
			  	   <BreadLink color="inherit"><Link onClick={redirectHome} className="text-decoration-none">Home</Link></BreadLink>
			  	   <BreadLink className="text-danger" color="textPrimary">Projects</BreadLink>
			  	</Breadcrumbs><br />
			  	<div className="row">
			  	 <div className="col-sm-12 py-3 mx-auto bg-">
			  	  <div className="row mx-auto">
			  	     {
			  	     	fetchedData.map((data, index) => {
			  	     		return(
			  	     		  <Card title={data.title} description={data.description} price={data.price} img={data.file} id={index} url={data.url}  />
			  	     		)
			  	     	 })
			  	     }
			  	  </div>
			  	 </div>
			  	</div>
			  </div><br /><br />
			  <ToastContainer />
		  	</>
		  }
		 </>
		)
}
export default Project