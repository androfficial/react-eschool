import { ToastContainer, ToastContainerProps } from 'react-toastify';

const defaultToastProps: ToastContainerProps = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: 'light',
};

export const ToastProvider: React.FC<ToastContainerProps> = (props) => (
  <ToastContainer {...defaultToastProps} {...props} style={{ whiteSpace: 'pre-line' }} />
);
