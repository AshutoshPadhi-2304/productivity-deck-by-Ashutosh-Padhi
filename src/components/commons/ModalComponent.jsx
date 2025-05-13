import React from "react";

import { Button, Modal, Typography } from "neetoui";

const ModalComponent = ({
  label = "",
  children,
  closeModal,
  confirmModal,
  isOpen,
  confirmMessage,
}) => (
  <div>
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Modal.Header>
        <Typography className="font-bold" style="h1">
          {label}
        </Typography>
      </Modal.Header>
      <Modal.Body className="space-y-2 text-black">{children}</Modal.Body>
      <Modal.Footer className="space-x-2">
        <Button label="Cancel" style="tertiary" onClick={closeModal} />
        <Button label={confirmMessage} onClick={confirmModal} />
      </Modal.Footer>
    </Modal>
  </div>
);

export default ModalComponent;
