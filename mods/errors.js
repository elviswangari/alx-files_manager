export const unauthorizedError = (res) => res.status(401).json({ error: 'Unauthorized' });
export const internalServerError = (res, error) => {
  console.error('Error:', error);
  return res.status(500).json({ error: 'Internal server error' });
};
