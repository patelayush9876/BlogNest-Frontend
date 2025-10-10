export interface ValidationRule {
  validate: (value: string) => boolean;
  message: string;
}

// ----------------- Generic Rules -----------------

export const required = (
  fieldName?: string
): ValidationRule & { stopIfFail: true } => ({
  validate: (value: string) => value.trim().length > 0,
  message: fieldName ? `${fieldName} is required` : "This field is required",
  stopIfFail: true,
});

export const minLength = (length: number): ValidationRule => ({
  validate: (value) => value.trim().length >= length,
  message: `Must be at least ${length} characters`,
});

export const maxLength = (length: number): ValidationRule => ({
  validate: (value) => value.trim().length <= length,
  message: `Must be at most ${length} characters`,
});

export const onlyAlphabets: ValidationRule = {
  validate: (value) => /^[A-Za-z ]+$/.test(value),
  message: "Only alphabets are allowed",
};

export const onlyNumbers: ValidationRule = {
  validate: (value) => /^\d+$/.test(value),
  message: "Only numbers are allowed",
};

// ----------------- Auth Fields -----------------
export const validEmail: ValidationRule = {
  validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  message: "Enter a valid email address",
};

export const strongPassword: ValidationRule = {
  validate: (value) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value),
  message:
    "Password must be 8+ chars, include uppercase, number, and special character",
};

export const validCaptcha: ValidationRule = {
  validate: (value: string | null) => !!value && value.trim().length > 0,
  message: "Please complete the captcha",
};

// ----------------- Helper -----------------
export const validateField = (
  value: string,
  rules: ValidationRule[]
): string[] => {
  const errors: string[] = [];

  for (const rule of rules) {
    if (!rule.validate(value)) {
      errors.push(rule.message);
      // Stop further validations if this rule says so
      if ((rule as any).stopIfFail) break;
    }
  }

  return errors;
};
