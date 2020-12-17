import React, { createContext } from 'react';

const topNavContext = createContext({
	topNavitems: 'hi',
	setTopNavitems: () => {},
});

export default topNavContext;
