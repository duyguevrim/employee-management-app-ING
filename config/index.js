export const CONFIG = {
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
  },
  VALIDATION: {
    MIN_AGE: 18,
    PHONE_REGEX: /^\+90\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  BREAKPOINTS: {
    MOBILE: '(max-width: 767px)',
    DESKTOP: '(min-width: 768px)',
  },
};

export default CONFIG;
