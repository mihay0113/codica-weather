import { Typography } from '@mui/material';

const ErrorModal: React.FC = () => {
  return (
    <>
      <Typography sx={{ color: 'red' }}>
        City is not defined in database or his name is wrong!
      </Typography>
      <Typography>Please try again.</Typography>
    </>
  );
};

export default ErrorModal;
