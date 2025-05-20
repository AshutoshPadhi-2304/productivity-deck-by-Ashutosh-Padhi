import React from "react";

import { Button, Modal, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

const ModalComponent = ({
  label = "",
  children,
  closeModal,
  confirmModal,
  isOpen,
  confirmMessage,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <Modal.Header>
          <Typography className="font-bold" style="h1">
            {label}
          </Typography>
        </Modal.Header>
        <Modal.Body className="space-y-2 text-black">{children}</Modal.Body>
        <Modal.Footer className="space-x-2">
          <Button
            label={t("modal.cancel")}
            style="tertiary"
            onClick={closeModal}
          />
          <Button label={confirmMessage} onClick={confirmModal} />
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default ModalComponent;
