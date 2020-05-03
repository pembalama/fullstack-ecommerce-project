import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/reducer';

const Header = props => {
	const handleLogout = () => {
		axios
			.get('/api/logout')
			.then(() => {
				// Clear user
				props.logoutUser();
				props.history.push('/');
			})
			.catch(err => console.log(err));
	};

	console.log(props);
	return (
		<div>
			<header className="wrapper">
				<Link to="/" className="logo">
					MOMO & BROOKLYN
				</Link>
				{JSON.stringify(props.user) !== '{}' ? (
					<nav id="desktop-nav" className="header">
						<ul>
							<li>
								<Link to="/">shop</Link>
							</li>
							<li>
								<Link to="/cart">cart</Link>
							</li>
							<li>
								<Link to="/about">about</Link>
							</li>
							<li>
								<Link to="/" onClick={() => handleLogout()}>
									Logout
								</Link>
							</li>
						</ul>
					</nav>
				) : (
					<nav id="desktop-nav" className="header">
						<ul>
							<li>
								<Link to="/">shop</Link>
							</li>
							<li>
								<Link to="/cart">cart</Link>
							</li>
							<li>
								<Link to="/about">about</Link>
							</li>
						</ul>
					</nav>
				)}
			</header>
		</div>
	);
};

const mapStateToProps = reduxState => reduxState;

export default withRouter(connect(mapStateToProps, { logoutUser })(Header));
