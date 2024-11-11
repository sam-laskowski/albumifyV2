import Authentication from "@/components/auth/Authentication";
import Modal from "@/components/modal/Modal";
import React from "react";

export default function Page() {
  return (
    <Modal>
      <Authentication />
    </Modal>
  );
}
