import React from "react";

export interface Props {
    width?: number | string;
    height?: number | string;
    className?: string;
    color?: string;
}

export default ({ width = '100%', height = '100%', className ,color}: Props) => {
    return (
        <svg viewBox="0 0 864 863.999991" width={width} height={height} className={className}>
            <defs><clipPath id="1a172d57a0">
                <path d="M 76.34375 93 L 830.621094 93 L 830.621094 848 L 76.34375 848 Z M 76.34375 93 " clip-rule="nonzero"/></clipPath><clipPath id="62256a24fe"><path d="M 233 69.117188 L 681 69.117188 L 681 864 L 233 864 Z M 233 69.117188 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#1a172d57a0)"><path fill={color} d="M 450.023438 742.496094 C 301.542969 740.652344 181.3125 619.234375 181.3125 470.269531 C 181.3125 371.425781 234.816406 280.515625 321.078125 232.371094 L 271.257812 139.945312 C 150.984375 206.433594 76.34375 332.824219 76.34375 470.269531 C 76.34375 677.089844 243.597656 845.570312 449.894531 847.5 C 451.867188 847.523438 453.46875 845.917969 453.46875 843.96875 L 453.46875 745.945312 C 453.46875 744.035156 451.929688 742.519531 450.023438 742.496094 Z M 643.855469 795.953125 L 593.992188 703.441406 C 675.464844 654.210938 725.628906 565.949219 725.628906 470.269531 C 725.628906 321.285156 605.398438 199.886719 456.894531 198.042969 C 455.007812 198.019531 453.46875 196.503906 453.46875 194.59375 L 453.46875 96.574219 C 453.46875 94.621094 455.074219 93.015625 457.027344 93.039062 C 663.34375 94.945312 830.597656 263.449219 830.597656 470.269531 C 830.597656 604.574219 759.316406 728.3125 643.855469 795.953125 " fill-opacity="1" fill-rule="nonzero"/></g><g clip-path="url(#62256a24fe)"><path fill={color} d="M 358.105469 301.050781 L 402.957031 127.148438 L 233.082031 69.117188 L 271.257812 139.945312 L 321.078125 232.371094 Z M 593.992188 703.441406 L 643.855469 795.953125 L 680.578125 864.070312 L 510.679688 806.015625 L 555.558594 632.136719 L 593.992188 703.441406 " fill-opacity="1" fill-rule="nonzero"/>
            </g>
        </svg>
    );
};