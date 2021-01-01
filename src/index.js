import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';

// import './Fonts/Avenir.ttc';
// import './Fonts/HelveticaNeue.ttc';
// import './Fonts/Iowan Old Style.ttc';
// import './Fonts/MYRIADPRO-BOLD.OTF';
// import './Fonts/MyriadPro-Light.otf';
// import './Fonts/MYRIADPRO-REGULAR.OTF';

import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<App />
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
