export interface ConfirmationConfig {
  title?: string;
  message?: string;
  icon?: {
    show?: boolean;
    name?: string;
    color?:
      | 'primary'
      | 'accent'
      | 'warn'
      | 'basic'
      | 'info'
      | 'success'
      | 'warning'
      | 'error';
  };
  actions?: {
    confirm?: {
      show?: boolean;
      label?: string;
    };
    cancel?: {
      show?: boolean;
      label?: string;
    };
  };
}
