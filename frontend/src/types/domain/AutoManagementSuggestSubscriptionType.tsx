import { MailDomainEnum } from './MailDomainEnum';
import { PlanType, SubscriptionType } from './SubscriptionType';
import { SuggestTypeEnum } from './SuggestTypeEnum';

/**
 * サブスクのサジェスト表示の型
 */
export type AutoManagementSuggestSubscriptionType = Omit<SubscriptionType, 'plan'> & {
  /* プランが特定されているので1つで固定 */
  plan: PlanType;
  /* サジェストが登録なのか削除なのか変更なのか */
  suggestType: SuggestTypeEnum;
  /* サジェストの元になったメールの件名 */
  mailSubject: string;
  /* サジェストの元になったメールのドメイン */
  mailDomain: MailDomainEnum;
};
