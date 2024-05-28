import React from "react";

export interface Props {
    width?: number | string;
    height?: number | string;
    className?: string;
}

export default ({ width = '100%', height = '100%', className }: Props) => {
    return (
        <svg width={width} height={height} viewBox="0.0 0.0 497.1 497.1">
            <g id="change1_1">
                <path d="M469.629,497.064c15.148,0,27.432-12.283,27.432-27.435V27.434 C497.061,12.28,484.778,0,469.629,0H27.434C12.278,0,0,12.28,0,27.434v442.195c0,15.151,12.278,27.435,27.434,27.435H469.629z" fill="#3D5A98" />
            </g>
            <g id="change2_1">
                <path d="M342.964,497.064V304.575h64.61l9.675-75.017h-74.285v-47.895c0-21.719,6.03-36.521,37.177-36.521 l39.724-0.018V78.03c-6.871-0.913-30.451-2.956-57.884-2.956c-57.274,0-96.484,34.959-96.484,99.161v55.322H200.72v75.017h64.776 v192.489H342.964z" fill="#FFF" />
            </g>
        </svg>
    );
};