import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import StoreApi from 'api/StoreApi';

const store = new StoreApi(window.initialData);

ReactDOM.render(<App store={store} />, document.getElementById('root'));
