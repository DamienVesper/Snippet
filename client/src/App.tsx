import React from 'react';

import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

import Header from './components/templates/Header';
import Footer from './components/templates/Footer';

import Home from './pages/Home';

import Error404 from './pages/404';

import './assets/css/icofont/icofont.min.css';
import './assets/scss/main.scss';

import 'bootstrap';

class App extends React.Component {
    render = (): React.ReactNode => (
        <div id="app" className="tw-flex tw-flex-col tw-w-screen tw-h-screen tw-text-white">
            <Header />
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/*" element={<Error404 />} />
                </Routes>
            </Router>
            <Footer />
        </div>
    );
}

export default App;
