export type SnapPayOptions = {
  onSuccess?: (result: unknown) => void;
  onPending?: (result: unknown) => void;
  onError?: (result: unknown) => void;
  onClose?: () => void;
};

export type Snap = {
  pay: (token: string, options?: SnapPayOptions) => void;
};
