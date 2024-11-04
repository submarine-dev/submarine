import { SuggestTypeEnum } from '@/types/domain/SuggestTypeEnum';

export const convertSuggestTypeEnumToLabel = (suggestType: SuggestTypeEnum): string => {
  switch (suggestType) {
    case 'REGISTER':
      return '登録';
    case 'CHANGE':
      return '変更';
    case 'CANCEL':
      return '解約';
  }
};
