export const handleSubmit = (connection: string) => {
    const params = new URLSearchParams({
      connection,
      returnTo: "/dashboard",
    });
    window.location.href = `/auth/login?${params.toString()}`;
  }