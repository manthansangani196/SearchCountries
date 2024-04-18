import React from 'react';

export const Loader = (props) => {
    const {
        isLoading
    } = props;

    return (
        <div style={{
            display: isLoading ? 'block' : 'none', position: 'absolute', right: '50%'
        }}>
            <span className='spinner-border' role='status' aria-hidden='true'></span>
            <span className='ml-2' style={{ verticalAlign: 'super', fontSize: '15px' }}> Loading...</span>
        </div>
    );
};
