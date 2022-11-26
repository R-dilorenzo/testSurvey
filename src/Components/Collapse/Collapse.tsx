import classNames from "classnames";
import React, { useCallback, useEffect, useRef } from "react";
import { BaseProps } from "../BaseProps";
import "./style/index";

interface CollapseProps extends BaseProps {
	isShow: boolean;
	collapseDuration: number;
	children: string | React.ReactElement;
}

const Collapse = (props: CollapseProps) => {
	const { isShow, collapseDuration, children, style, className, ...otherProps } = props;

	const prefixCls = "collapse";
	const cls = classNames(prefixCls, {
		[`${prefixCls}__transition`]: collapseDuration,
	});

	const leaveTimerRef = useRef<number | null>(null);
	const enterTimerRef = useRef<number | null>(null);
	const ref = useRef<HTMLDivElement | null>(null);

	const beforeEnter = useCallback(() => {
		const el = ref.current;
		if (el) {
			el.style.display = "block";
			el.style.height = "0px";
		}
	}, []);

	const afterEnter = useCallback(() => {
		const el = ref.current;
		if (el) {
			el.style.display = "block";
			el.style.height = "";
		}
	}, []);

	const enter = useCallback(() => {
		const el = ref.current;
		if (el) {
			if (el.scrollHeight !== 0) {
				el.style.height = el.scrollHeight + "px";
			} else {
				el.style.height = "";
			}

			enterTimerRef.current = window.setTimeout(() => afterEnter(), collapseDuration);
		}
	}, [afterEnter]);

	const beforeLeave = useCallback(() => {
		const el = ref.current;
		if (el) {
			el.style.display = "block";
			if (el.scrollHeight !== 0) {
				el.style.height = el.scrollHeight + "px";
			}
		}
	}, []);

	const afterLeave = useCallback(() => {
		const el = ref.current;
		if (el) {
			el.style.display = "none";
			el.style.height = "";
		}
	}, []);

	const leave = useCallback(() => {
		const el = ref.current;
		if (el) {
			if (el.scrollHeight !== 0) {
				el.style.height = "0px";
			}

			leaveTimerRef.current = window.setTimeout(() => afterLeave(), collapseDuration);
		}
	}, [afterLeave]);

	const triggerChange = useCallback(
		(isCollapsed: boolean) => {
			const enterTimer = enterTimerRef.current;
			const leaveTimer = leaveTimerRef.current;
			enterTimer && window.clearTimeout(enterTimer);
			leaveTimer && window.clearTimeout(leaveTimer);

			if (isCollapsed) {
				beforeEnter();
				enter();
			} else {
				beforeLeave();
				leave();
			}
		},
		[enter, leave, beforeEnter, beforeLeave]
	);

	useEffect(() => {
		beforeEnter();
		enter();

		return () => {
			beforeLeave();
			leave();
		};
	}, [enter, leave, beforeEnter, beforeLeave]);

	useEffect(() => {
		triggerChange(isShow);
	}, [isShow, triggerChange]);

	return (
		<div
			className={cls}
			ref={ref}
			style={{
				transition: `${collapseDuration}ms height, ${collapseDuration}ms padding-top, ${collapseDuration}ms padding-bottom`,
				...style,
			}}
			{...otherProps}
		>
			{children}
		</div>
	);
};

export default Collapse;
