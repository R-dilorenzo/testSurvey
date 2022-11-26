import React from "react";
import { Routes as RoutesWrapper, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import PageWrapper from "./Pages/Layout/PageWrapper";
import ProtectedRoute from "./Pages/Layout/ProtectedRoute";
import Quiz from "./Pages/Quiz/Quiz";
import Reacap from "./Pages/Recap/Reacap";

const Routes = ({}) => {
	return (
		<RoutesWrapper>
			<Route
				path="/"
				element={
					<PageWrapper>
						<Home />
					</PageWrapper>
				}
			/>
			<Route
				path="/Quiz"
				element={
					<ProtectedRoute>
						<PageWrapper>
							<Quiz />
						</PageWrapper>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/Recap"
				element={
					<ProtectedRoute>
						<PageWrapper>
							<Reacap />
						</PageWrapper>
					</ProtectedRoute>
				}
			/>
			<Route path="*" element={<Navigate to="/" replace />} />
		</RoutesWrapper>
	);
};

export default Routes;
