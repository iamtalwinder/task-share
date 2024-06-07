import { useNavigate, useLocation } from 'react-router-dom';
import { UNAUTHORIZED_EVENT } from 'libs/event-dispatcher';
import { authService } from 'app/services';
import useEventListener from 'app/hooks/useEventListener';
import { useCallback } from 'react';

const Auth = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleUnauthorized = useCallback(() => {
    authService.logout();
    if (location.pathname !== '/login' && location.pathname !== '/register') {
      navigate('/login');
    }
  }, [navigate, location.pathname]);

  useEventListener(UNAUTHORIZED_EVENT, handleUnauthorized);

  return <>{children}</>;
};
Auth.propTypes = {
  children: PropTypes.node.isRequired
};

export default Auth;
