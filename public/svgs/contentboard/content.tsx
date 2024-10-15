import React from "react";

export interface Props {
  width?: number | string;
  height?: number | string;
  className?: string;
}

export default ({ width = "100%", height = "100%", className }: Props) => {
  return (
<svg fill="#000000" width={width} height={height} viewBox="0 0 70 70">
<g>
	<path d="M57.583,34.959c-1.104,0-2,0.896-2,2v25.624h-49v-49H32.41c1.104,0,2-0.896,2-2s-0.896-2-2-2h-27
		c-1.104,0-2.827,1.271-2.827,2.376v53c0,1.104,1.722,1.624,2.827,1.624h53c1.104,0,1.174-0.52,1.174-1.624v-28
		C59.583,35.854,58.688,34.959,57.583,34.959z"/>
	<path d="M66.253,13.116L57.769,4.63c-0.75-0.75-1.768-1.172-2.829-1.172c-1.061,0-2.078,0.421-2.828,1.172L17.648,39.093
		c-0.459,0.458-0.799,1.021-0.992,1.642l-3.543,11.404c-0.427,1.375-0.082,2.874,0.904,3.924c0.765,0.815,1.825,1.263,2.916,1.263
		c0.314,0,0.63-0.037,0.943-0.112l12.028-2.918c0.714-0.174,1.366-0.54,1.885-1.06l34.462-34.463
		C67.814,17.211,67.814,14.679,66.253,13.116z M48.575,13.822l1.414,1.415L23.17,42.057l-1.415-1.415L48.575,13.822z M51.403,16.651
		l2.829,2.829L27.413,46.3l-2.829-2.829L51.403,16.651z M16.933,53.325l1.132-3.645l2.712,2.712L16.933,53.325z M23.054,51.84
		l-4.318-4.316l1.676-5.396l6.293,6.293l0,0.001c0,0,0,0,0.001,0.001l2.038,2.038L23.054,51.84z M30.241,49.128l-1.414-1.414
		l26.82-26.82l1.414,1.414L30.241,49.128z M58.475,20.894l-8.485-8.485l4.95-4.95l8.484,8.486L58.475,20.894z"/>
	<path d="M34.41,55.583c0,0.553,0.447,1,1,1h14c0.553,0,1-0.447,1-1s-0.447-1-1-1h-14C34.857,54.583,34.41,55.03,34.41,55.583z"/>
	<path d="M39.409,49.583c0,0.553,0.447,1,1,1h9c0.553,0,1-0.447,1-1s-0.447-1-1-1h-9C39.856,48.583,39.409,49.03,39.409,49.583z"/>
	<path d="M49.409,45.583c0.553,0,1-0.447,1-1s-0.447-1-1-1h-4c-0.553,0-1,0.447-1,1s0.447,1,1,1H49.409z"/>
</g>
</svg>
  );
};
