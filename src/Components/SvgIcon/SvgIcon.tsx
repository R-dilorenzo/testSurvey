import classNames from "classnames";
import React, { useMemo } from "react";
import { BaseProps } from "../BaseProps";
import "./style/index";
import colors from "../../style/_colors.module.scss";

const Icons: Array<Icon> = [
	{
		iconName: "questionMark",
		paths: [
			"M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm1 13H7v-2h2v2zm1.93-6.52c-.14.32-.35.64-.62.97L9.25 8.83c-.12.15-.24.29-.28.42-.04.13-.09.3-.09.52V10H7.12V8.88s.05-.51.21-.71L8.4 6.73c.22-.26.35-.49.44-.68.09-.19.12-.38.12-.58 0-.3-.1-.55-.28-.75-.18-.19-.44-.28-.76-.28-.33 0-.59.1-.78.29-.19.19-.33.46-.4.81-.03.11-.1.15-.2.14l-1.7-.25c-.12-.01-.16-.08-.14-.19.12-.82.46-1.47 1.03-1.94.57-.48 1.32-.72 2.25-.72.47 0 .9.07 1.29.22s.72.34 1 .59c.28.25.49.55.65.89.15.35.22.72.22 1.12s-.07.75-.21 1.08z",
		],
	},
	{
		iconName: "cross",
		paths: [
			"M9.41 8l3.29-3.29c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71L8 6.59l-3.29-3.3a1.003 1.003 0 00-1.42 1.42L6.59 8 3.3 11.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71L8 9.41l3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71L9.41 8z",
		],
	},
	{
		iconName: "tick",
		paths: [
			"M14 3c-.28 0-.53.11-.71.29L6 10.59l-3.29-3.3a1.003 1.003 0 00-1.42 1.42l4 4c.18.18.43.29.71.29s.53-.11.71-.29l8-8A1.003 1.003 0 0014 3z",
		],
	},
	{
		iconName: "caretRight",
		paths: [
			"M11 8c0-.15-.07-.28-.17-.37l-4-3.5A.495.495 0 006 4.5v7a.495.495 0 00.83.37l4-3.5c.1-.09.17-.22.17-.37z",
		],
	},
];

export enum IconEnum {
	questionMark = "questionMark",
	cross = "cross",
	tick = "tick",
	caretRight = "caretRight",
}

interface Icon {
	iconName: IconEnum | string;
	paths: Array<string>;
}

const returnIcon = (icon: string) => {
	let i: Icon | undefined = Icons.find((i) => i.iconName === icon);

	if (!!i && !!i.paths) {
		return (
			<>
				{i.paths?.map((d) => {
					return <path key={d} d={d} />;
				})}
			</>
		);
	}

	console.warn(`Icon: ${icon} not found`);
	return <path />;
};

interface SvgIconProps extends BaseProps {
	icon: string;
	fill?: string;
	viewBox?: string;
}

const SvgIcon = (props: SvgIconProps) => {
	const { icon, fill, viewBox, className, style, ...otherProps } = props;
	const cls = classNames("icon", className);
	const getIcon = useMemo(() => returnIcon(icon), [icon]);

	return (
		<svg
			className={cls}
			fill={fill ? fill : colors.primaryColor}
			viewBox={viewBox ? viewBox : "0 0 16 16"}
			style={style}
			{...otherProps}
		>
			{getIcon}
		</svg>
	);
};

export default SvgIcon;
