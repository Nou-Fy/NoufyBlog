"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { ContactData } from "@/features/nous-Contacter/emailService";
import { emailService } from "@/lib/services/emailService";

export const useContactForm = () => {
  const initialData: ContactData = { email: "", subject: "", message: "" };
  const [formData, setFormData] = useState<ContactData>(initialData);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(initialData);
    setStatus("idle");
  };

  const resetFieldsOnly = () => {
    setFormData({ email: "", subject: "", message: "" });
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailService.sendContactEmail(formData);

      // ON REUSSIT
      setStatus("success");
      resetFieldsOnly(); // On vide les champs mais le status reste 'success'

      // On attend 5 secondes avant de faire disparaître le message de succès
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch (error) {
      setStatus("error");
    }
  };

  return { formData, status, handleChange, submitForm, resetForm };
};
