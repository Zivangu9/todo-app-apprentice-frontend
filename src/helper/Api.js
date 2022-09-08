export const getApiUrl = () => {
  switch (process.env.NODE_ENV) {
    default:
      return "http://localhost:9090";
  }
};
