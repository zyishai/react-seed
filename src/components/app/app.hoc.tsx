import React from 'react';

export const withColor = (Component: any, color: string) => ({...props}) => {
    return (
        <div style={{color}}>
            <Component {...props} />
        </div>
    )
}