export interface ToastMessage {
  title: string;
  message: string;
}

export type ToastMessages = Record<string, ToastMessage>;
