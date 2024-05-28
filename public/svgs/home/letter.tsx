import React from "react";

export interface Props {
    width?: number | string;
    height?: number | string;
    className?: string;
}

export default ({ width = '100%', height = '100%', className }: Props) => {
    return (
        <svg fill="#620986" width={width} height={height} viewBox="2.0 6.0 28.0 20.0">
            <g data-name="Layer 2" id="change1_1">
                <path d="M14.167,16.328a3.007,3.007,0,0,0,3.662,0l11.62-9.054A2.991,2.991,0,0,0,27,6H5A2.992,2.992,0,0,0,2.461,7.42Z" />
                <path d="M19.054,17.913a5.008,5.008,0,0,1-6.1,0L2,9.583V23a3,3,0,0,0,3,3H27a3,3,0,0,0,3-3V9.385Z" />
            </g>
        </svg>
    );
};