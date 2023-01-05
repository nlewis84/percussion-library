import { Box, CircularProgress } from '@mui/material';

function LoadingOverlay({ children, loading }) {
  return (
    <Box
      position="relative"
    >
      {children}
      {loading && (
        <Box
          alignItems="center"
          display="flex"
          justifyContent="center"
          position="absolute"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            bottom: 0,
            height: '100%',
            left: 0,
            pointerEvents: 'none',
            right: 0,
            top: 0,
            width: '100%',
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}

export default LoadingOverlay;
