import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import LoaderSpinner from '../Body/Loader/Loader'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';
import MenuIcon from '@mui/icons-material/Menu';
import $ from 'jquery';
import './Header.css';

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
	let history = useHistory();
	
	//redirect to the project
	const seeProject = () => {
		setLoading(true)
		setTimeout(() => {
			history.push("Project")
			setLoading(false)
		}, 100)
	}
	
	//redirect to the blogs
	const seeBlogs = () => {
		setLoading(true)
		setTimeout(() => {
			history.push("Blogs")
			setLoading(false)
		}, 100)
	}
	const redirectHome = () => {
		setLoading(true)
		setTimeout(() => {
			history.push("/")
			setLoading(false)
		}, 100)
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
				<ListItem button key="Home" onClick={redirectHome}>
					<ListItemIcon> <HomeIcon style={{ fontSize: "32px", marginLeft: "5px" }} /></ListItemIcon>
					<ListItemText className="mt-2" primary="Home" />
				</ListItem>
				<ListItem button key="Projects" onClick={seeProject}>
					<ListItemIcon> <WorkIcon style={{ fontSize: "28px", marginLeft: "5px" }} /></ListItemIcon>
					<ListItemText className="mt-2" primary="Projects" />
				</ListItem>
			</List>
		</div>
	);
	
	return (
		<>
			<div className="container-fluid p-0 m-0">
				<div className="row">
					<div className="col-10 mx-auto p-0">
						<nav className="navbar pt-4 navbar-expand-lg navbar-light">
							<div className="container-fluid">
								<a style={{ textDecoration: "none" }} className="brandName" onClick={redirectHome}><h4>ParbatLama</h4></a>
								<button className="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
									<span className="navbar-toggler-icon" onClick={toggleDrawer("left", true)}><MenuIcon /></span>
								</button>
								<div className="collapse navbar-collapse" id="navbarSupportedContent">
									<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
										<li className="nav-item">
											<a className="nav-link" onClick={redirectHome}>HOME</a>
										</li>
										<li className="nav-item" id='anchor'>
											<a className='text-decoration-none text-secondary' href="#about">ABOUT</a>
										</li>
										<li className="nav-item">
											<a className="nav-link" onClick={seeProject}>MY PROJECTS</a>
										</li>
										<li className="nav-item">
											<a className="nav-link" onClick={seeBlogs}>BLOGS</a>
										</li>
										<li className="nav-item" id='anchor'>
											<a className='text-decoration-none text-secondary' href="#footer">SERVICES</a>
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