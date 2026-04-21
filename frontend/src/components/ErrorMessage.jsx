// ErrorMessage.jsx
const ErrorMessage = ({ message }) => (
  <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-2.5 text-sm">
    <span>⚠</span><span>{message}</span>
  </div>
);
export default ErrorMessage;