import React from 'react';
import { Segment } from 'semantic-ui-react';

const Footer = () => {
    return (
        <Segment basic padded className="footer">
            Copyright© {new Date().getFullYear()} Created by Max_Z.
        </Segment>
    );
};

export default Footer;