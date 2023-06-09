import { Navigate } from 'react-router-dom';

function UserPublicRoute(props) {

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }
  if (localStorage.getItem("token")) {
    return props.children;
  }
}

export default UserPublicRoute;