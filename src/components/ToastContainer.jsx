import { useCart } from '../context/CartContext';
import Toast from './Toast';

export default function ToastContainer() {
  const { toasts, removeToast } = useCart();

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}
