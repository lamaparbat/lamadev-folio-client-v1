const Error = () => {
	const styleSheet =  {
		height:"46vh",
		display:"grid",
		placeItems:"center"
	}

	return(
		  <div className="container" style={styleSheet}>
		   <div className="row">
		     <div className="col-10 mx-auto text-center bg-danger p-3">
		      <h1 className="text-white">404 Error: Page not found !!</h1>
		     </div>
		   </div>
		  </div>
		)
}
export default Error