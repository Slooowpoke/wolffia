import React, { Component } from 'react';

const Card = ({children, title}) => (
    <div className={'block-outline'}>
        <span className="box-label">{title}</span>
        {children}
    </div>
);

export default Card;
