import React from 'react';

import LogoImg from '../assets/img/logos/favicon.png';

class Logo extends React.Component {
    render = (): React.ReactNode => (
        <img className="tw-w-[75px] tw-h-full" src={LogoImg} />
    );
}

export default Logo;
