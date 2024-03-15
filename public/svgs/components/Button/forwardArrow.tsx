import React from "react";

export interface Props {
    width?: number | string;
    height?: number | string;
    color?: string;
    className?: string;
}

export default ({ width = '100%', height = '100%', color = '#fff', className }: Props) => {
    return (
        <svg viewBox="0 0 256 256" height={height}>
            <path fill={color} d="M245.3,124.3l-2.1-3.2l-59-59c-3.8-3.8-10.1-3.8-13.9,0c-3.8,3.8-3.8,10.1,0,13.9l42.2,42.2H19.8c-5.4,0-9.8,4.4-9.8,9.8c0,5.4,4.4,9.8,9.8,9.8h192.6l-42.2,42.2c-3.8,3.8-3.8,10.1,0,13.9c3.8,3.8,10.1,3.8,13.9,0l59-59l2.1-3.2l0.7-3.7v0L245.3,124.3z" />
        </svg>
    );
};