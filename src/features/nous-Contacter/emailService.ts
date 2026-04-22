export interface ContactData {
  email: string;
  subject: string;
  message: string;
}

export const apiClient = {
  post: async <T>(url: string, data: T): Promise<void> => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Erreur réseau");
    }
  },
};
