import './Loader.css'
import Loader from 'react-loader-spinner'
const LoaderSpinner = () => {
	return(
		  <>
		   <div className="container-fluid loader">
		     <Loader type="Audio" color="#00BFFF" height={80} width={80} />
		   </div>
		  </>
		)
}
export default LoaderSpinner