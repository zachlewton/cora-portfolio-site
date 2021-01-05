import React, { createContext } from 'react';

const topNavContext = createContext({
	type: '',
	slug: '',
	igSlug: '',
	gallerySlug: '',
	setTopNavitems: () => {},
});

export default topNavContext;
