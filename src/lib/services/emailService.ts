// services/emailService.ts

import { apiClient } from "../../features/nous-Contacter/emailService";

export interface EmailPayload {
  email: string;
  subject: string;
  message: string;
  sentAt?: string; // Optionnel, peut être ajouté automatiquement
}
// Configuration (peut être déplacé dans un fichier .env)
const EMAIL_ENDPOINT = "/api/send-gmail";

export const emailService = {
  /**
   * Envoie le formulaire de contact via l'API Backend
   */
  sendContactEmail: async (payload: EmailPayload): Promise<void> => {
    // On pourrait ajouter ici une validation de dernière minute ou une transformation
    const normalizedPayload = {
      ...payload,
      email: payload.email.toLowerCase().trim(),
      sentAt: new Date().toISOString(),
    };

    return apiClient.post(EMAIL_ENDPOINT, normalizedPayload);
  },
};
