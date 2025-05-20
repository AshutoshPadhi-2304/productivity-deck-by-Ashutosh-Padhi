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
  description,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <Modal.Header>
          <Typography style="h1" weight="bold">
            {label}
          </Typography>
        </Modal.Header>
        <Modal.Body className="space-y-2 text-black">
          <Typography className="mb-4 mt-4" style="body2" weight="semibold">
            {description}
          </Typography>
          {children}
        </Modal.Body>
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
