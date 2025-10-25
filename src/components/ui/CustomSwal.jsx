"use client";
import Swal from "sweetalert2";

const bwMixin = Swal.mixin({
  customClass: {
    popup: "swal-bw-popup",
    title: "swal-bw-title",
    content: "swal-bw-content",
    confirmButton: "swal-bw-confirm",
    cancelButton: "swal-bw-cancel",
    actions: "swal-bw-actions",
  },
  buttonsStyling: false,
  background: "#ffffff",
  color: "#000000",
});

export function showCustomSwal(options) {
  return bwMixin.fire(options);
}

export function showSuccess(title = "Success!", text = "") {
  return bwMixin.fire({
    icon: "success",
    title,
    text,
    confirmButtonText: "OK",
  });
}

export default { showCustomSwal, showSuccess };
