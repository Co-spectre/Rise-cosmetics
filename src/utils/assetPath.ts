/**
 * Get the correct asset path based on the environment
 * In production (GitHub Pages), adds the base path
 * In development, returns the path as-is
 */
export const getAssetPath = (path: string): string => {
  const base = import.meta.env.BASE_URL || '/';
  // Remove leading slash from path if it exists
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Return base + path, ensuring no double slashes
  return base === '/' ? `/${cleanPath}` : `${base}${cleanPath}`;
};
