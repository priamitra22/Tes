export default function Modal({ isOpen, onClose, title, children, footer }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* Modal Box */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="mb-4">{children}</div>

        {/* Footer (optional) */}
        {footer && <div className="mt-4 flex justify-end gap-3">{footer}</div>}
      </div>
    </div>
  );
}
