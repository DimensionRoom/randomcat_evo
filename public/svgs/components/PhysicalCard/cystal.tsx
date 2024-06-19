import React from "react";

export interface Props {
    width?: number | string;
    height?: number | string;
    className?: string;
    color?: string;
}

const ColorSet: { [key: string]: string } = {
    ThemeBlue1: '#1694ef',
    ThemeBlue2: '#006ba6',
    ThemePurple1: '#9641f6',
    ThemePurple2: '#752fbb',
    ThemePink1: '#ffc5e6',
    ThemePink2: '#bd036d',
};

export default ({ width = '100%', height = '100%', className, color="ThemeBlue" }: Props) => {
    return (
        <svg viewBox="0 0 864 863.999991" width={width} height={height} className={className} zoomAndPan="magnify" preserveAspectRatio="xMidYMid meet">
            <defs>
                <filter x="0%" y="0%" width="100%" height="100%" id="e0a3f206ce">
                    <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" colorInterpolationFilters="sRGB" />
                </filter>
                <mask id="fc2a1bc9c1">
                    <g filter="url(#e0a3f206ce)">
                        <rect x="-86.4" width="1036.8" fill="#000000" y="-86.399999" height="1036.79999" fillOpacity="0.35" />
                    </g>
                </mask>
                <clipPath id="7b58d882e7">
                    <path d="M 0.351562 0.84375 L 824.101562 0.84375 L 824.101562 824.589844 L 0.351562 824.589844 Z M 0.351562 0.84375 " clipRule="nonzero" />
                </clipPath><clipPath id="c1083b5392">
                    <path d="M 412.226562 0.84375 C 184.757812 0.84375 0.351562 185.246094 0.351562 412.714844 C 0.351562 640.1875 184.757812 824.589844 412.226562 824.589844 C 639.699219 824.589844 824.101562 640.1875 824.101562 412.714844 C 824.101562 185.246094 639.699219 0.84375 412.226562 0.84375 Z M 412.226562 0.84375 " clipRule="nonzero" />
                </clipPath>
                <clipPath id="e1ccb691a0">
                    <rect x="0" width="825" y="0" height="825" />
                </clipPath>
                <clipPath id="6a5803a670">
                    <path d="M 180.429688 180.917969 L 682.027344 180.917969 L 682.027344 682.515625 L 180.429688 682.515625 Z M 180.429688 180.917969 " clipRule="nonzero" />
                </clipPath>
                <clipPath id="c9bd2b2292">
                    <path d="M 431.226562 180.917969 L 511.03125 351.914062 L 682.027344 431.714844 L 511.03125 511.519531 L 431.226562 682.515625 L 351.425781 511.519531 L 180.429688 431.714844 L 351.425781 351.914062 Z M 431.226562 180.917969 " clipRule="nonzero" />
                </clipPath>
            </defs>
            <g mask="url(#fc2a1bc9c1)">
                <g transform="matrix(1, 0, 0, 1, 19, 19)">
                    <g clipPath="url(#e1ccb691a0)">
                        <g clipPath="url(#7b58d882e7)">
                            <g clipPath="url(#c1083b5392)">
                                <path fill={ColorSet[`${color}1`]} d="M 0.351562 0.84375 L 824.101562 0.84375 L 824.101562 824.589844 L 0.351562 824.589844 Z M 0.351562 0.84375 " fillOpacity="1" fillRule="nonzero" />
                            </g>
                        </g>
                    </g>
                </g>
            </g>
            <g clipPath="url(#6a5803a670)">
                <g clipPath="url(#c9bd2b2292)">
                    <path fill={ColorSet[`${color}2`]} d="M 180.429688 180.917969 L 682.027344 180.917969 L 682.027344 682.515625 L 180.429688 682.515625 Z M 180.429688 180.917969 " fillOpacity="1" fillRule="nonzero" />
                </g>
            </g>
        </svg>
    );
};