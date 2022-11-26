import React, { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../reducers/quizSlice";

const ProtectedRoute = (props: { children?: any }) => {
	const user = useAppSelector(selectUser);

	if (!("fullName" in user) || user.fullName === "" || !("email" in user) || user?.email === "") {
		return <Navigate to={"/"} replace />;
	}

	return props.children ? props.children : <Outlet />;
};

export default ProtectedRoute;
