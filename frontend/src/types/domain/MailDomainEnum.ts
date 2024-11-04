export const MailDomainEnum = {
  GMAIL: 'GMAIL',
} as const;

export type MailDomainEnum = (typeof MailDomainEnum)[keyof typeof MailDomainEnum];
