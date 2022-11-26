import React from "react";

type IconProps = {
	className?: string;
	style?: React.CSSProperties;
	size?: number | string;
	color?: string;
};

export const CloseCircle = (props: IconProps): React.ReactElement => {
	const { size = 20, color = "#f44336", ...otherProps } = props;
	return (
		<svg {...otherProps} width={size} height={size} viewBox="0 0 1024 1024">
			<path
				fill={color}
				d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m165.4 618.2l-66-0.3L512 563.4l-99.3 118.4-66.1 0.3c-4.4 0-8-3.5-8-8 0-1.9 0.7-3.7 1.9-5.2l130.1-155L340.5 359c-1.2-1.5-1.9-3.3-1.9-5.2 0-4.4 3.6-8 8-8l66.1 0.3L512 464.6l99.3-118.4 66-0.3c4.4 0 8 3.5 8 8 0 1.9-0.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"
			/>
		</svg>
	);
};

export default CloseCircle;
