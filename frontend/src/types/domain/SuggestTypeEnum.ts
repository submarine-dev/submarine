export const SuggestTypeEnum = {
  REGISTER: 'REGISTER',
  CHANGE: 'CHANGE',
  CANCEL: 'CANCEL',
} as const;

export type SuggestTypeEnum = (typeof SuggestTypeEnum)[keyof typeof SuggestTypeEnum];
