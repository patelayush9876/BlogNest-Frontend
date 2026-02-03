let onSessionExpired: (() => void) | null = null;

export const setSessionExpiredHandler = (cb: () => void) => {
  onSessionExpired = cb;
};

export const triggerSessionExpired = () => {
  onSessionExpired?.();
};
