import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
	return (
		<div>
			<img src="https://www.litespeedtech.com/support/wiki/lib/exe/fetch.php/litespeed_wiki:config:404.png?w=400&tok=a0557c" />
			<p style={{ textAlign: 'center' }}>
				<Link to="/">Home </Link>
			</p>
		</div>
	);
};

export default ErrorPage;
