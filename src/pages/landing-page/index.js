import React from 'react';
import Loadable from 'react-loadable';
import {Loading} from 'components';

export default Loadable({
    loader: () => import('./landing-page'),
    loading: () => <Loading/>
});
