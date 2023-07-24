import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { getDictionaryItemListApi } from '@/api/dictionary/item';
import { DictionaryType } from '@/api/response/dictionary.d';

type State = {
  dictionary: {
    level: DictionaryType[];
    themeType: DictionaryType[];
    questionType: DictionaryType[];
  };
  initDictionary: (groupCode?: 'themeType' | 'questionType' | 'level') => Promise<void>;
  getDictionary: (
    groupCode?: 'themeType' | 'questionType' | 'level'
  ) => DictionaryType[] | State['dictionary'];
  getDictionaryItemName: (
    groupCode: 'themeType' | 'questionType' | 'level',
    code: string | string[]
  ) => string | undefined;
};

export const useDictionaryStore = create<State>()(
  devtools(
    immer((set, get) => ({
      dictionary: {
        level: [],
        themeType: [],
        questionType: []
      },
      async initDictionary(groupCode) {
        try {
          const res = await getDictionaryItemListApi(groupCode);
          set((state) => {
            res.forEach((item) => state.dictionary[item.groupCode].push(item));
          });
        } catch (error) {}
      },
      getDictionary(groupCode) {
        return groupCode ? get().dictionary[groupCode] : get().dictionary;
      },
      getDictionaryItemName(groupCode, id) {
        const dictionary = get().dictionary[groupCode];
        if (typeof id === 'string') {
          const item = dictionary.find((item) => item._id === id);
          return item ? item.name : '';
        } else {
          const names = dictionary.filter((item) => id.includes(item._id)).map((item) => item.name);
          return names.join('，');
        }
      }
    }))
  )
);
