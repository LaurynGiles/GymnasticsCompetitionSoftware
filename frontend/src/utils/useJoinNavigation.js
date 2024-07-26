import { useNavigate } from 'react-router-dom';

const useJoinNavigation = () => {
  const navigate = useNavigate();

  const handleJoinApproved = () => {
    navigate("/calculationsjudges");
  };

  return { handleJoinApproved };
};

export default useJoinNavigation;