import './ModalDeleteChat.scss'; // Pastikan Anda menambahkan style untuk modal

const ModalDeleteChat = ({ isVisible, onClose, onConfirm }) => {
  if (!isVisible) return null;

  return (
    <div className="modal-overlay-delete-chat fade-in">
      <div className="modal-content-delete-chat fade-in">
        <p className="title">Delete Chat</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="btn-delete yes">Yes</button>
          <button onClick={onClose} className="btn-delete no">No</button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteChat;
