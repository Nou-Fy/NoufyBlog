import { useState } from "react";
import { loginUser } from "@/lib/actions/auth"; // ✅ OK

export function useLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginUser(form); // ✅ fetch vers API
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    form,
    setForm,
    handleLogin,
    loading,
  };
}
