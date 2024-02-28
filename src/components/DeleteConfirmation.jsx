function DeleteConfirmation({onClose, onConfirm}) {
  return (
    <div className="confirmation-container">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div className="confirmation-buttons">
        <button onClick={onClose} className="btn btn-text">No</button>
        <button onClick={onConfirm} className="btn btn-full">Yes</button>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
