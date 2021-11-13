import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import { Link as NavLink } from 'react-scroll'
import LoaderSpinner from '../Body/Loader/Loader'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InfoIcon from '@material-ui/icons/Info';
import HomeIcon from '@material-ui/icons/Home';
import CallToActionIcon from '@material-ui/icons/CallToAction';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import WorkIcon from '@material-ui/icons/Work';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import './Header.css'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const Header = () => {
	const [isLoading, setLoading] = useState()
	let history = useHistory()
	const seeProject = () => {
		setLoading(true)
		setTimeout(() => {
			history.push("Project")
			setLoading(false)
		},1000)
	}
	const redirectHome = () => {
		setLoading(true)
		setTimeout(() => {
			history.push("/")
			setLoading(false)
		},1000)
	}
    //sidebar navigation
    const classes = useStyles();
    const [state, setState] = useState({
	    top: false,
	    left: false,
	    bottom: false,
	    right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
	    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
	      return;
	    }
	    setState({ ...state, [anchor]: open });
    };
    const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      id="sidebar"
    >
	    <List className="mt-2">
          <ListItem button key="Home"  onClick={redirectHome}>
              <ListItemIcon> <HomeIcon style={{fontSize:"32px",marginLeft:"5px"}} /></ListItemIcon>
              <ListItemText className="mt-2" primary="Home" />
          </ListItem>
          <ListItem button key="Projects" onClick={seeProject}>
            <ListItemIcon> <WorkIcon style={{fontSize:"28px",marginLeft:"5px"}} /></ListItemIcon>
            <ListItemText className="mt-2" primary="Projects" />
          </ListItem>
	    </List>
    </div>
  );
	return(
		  <>
		   <div className="container-fluid p-0 m-0">
		   	<div className="row">
		   	 <div className="col-10 mx-auto p-0">
		   	    <nav className="navbar pt-4 navbar-expand-lg navbar-light">
		   	       <div className="container-fluid">
				    <a style={{textDecoration:"none"}}  className="brandName" onClick={redirectHome}><h4>ParbatLama</h4></a>
				    <button className="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				      <span className="navbar-toggler-icon" onClick={toggleDrawer("left", true)}></span>
				    </button>
				    <div className="collapse navbar-collapse" id="navbarSupportedContent">
				      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
				        <li className="nav-item">
				          <a  className="nav-link" onClick={redirectHome}>HOME</a>
				        </li>
				        <li className="nav-item">
				          <NavLink className="nav-link" to="/aboutUs">ABOUT</NavLink>
				        </li>
				        <li className="nav-item">
				          <NavLink className="nav-link" to="/services">SERVICES</NavLink>
				        </li>
				        <li className="nav-item">
				          <a  className="nav-link" onClick={seeProject}>MY PROJECTS</a>
				        </li>
				        <li className="nav-item">
				          <NavLink className="nav-link" to="/footer">CONTACT</NavLink>
				        </li>
				      </ul>
				    </div>
				  </div>
				</nav>		   	 
			  </div>
	          <SwipeableDrawer
	            anchor={"left"}
	            open={state["left"]}
	            onClose={toggleDrawer("left", false)}
	            onOpen={toggleDrawer("left", true)}
	          >
	            <h3 className="brandName p-4">ParbatLama</h3>
	            {list("left")}
	            <Divider />
	           
	          </SwipeableDrawer>
		   	</div>
		   	{
			   	isLoading ? <LoaderSpinner /> : null
			}
		   </div>
		  </>
		)
}
export default Header