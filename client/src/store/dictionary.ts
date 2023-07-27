import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { getDictionaryItemListApi } from '@/api/dictionary/item';
import { DictionaryType } from '@/api/response/dictionary.d';

type State = {
  dictionaryList: DictionaryType[];
  dictionary: {
    level: DictionaryType[];
    themeType: DictionaryType[];
    questionType: DictionaryType[];
  };
  initDictionary: (groupCode?: 'themeType' | 'questionType' | 'level') => Promise<void>;
  getDictionaryAndOption: (groupCode?: 'themeType' | 'questionType' | 'level') => {
    dictionary: DictionaryType[] | State['dictionary'];
    options: { label: string; value: string }[];
  };
  getDictionaryItemName: (
    groupCode?: 'themeType' | 'questionType' | 'level',
    id?: string | string[]
  ) => string | undefined;
};

export const useDictionaryStore = create<State>()(
  devtools(
    immer((set, get) => ({
      dictionaryList: [],
      dictionary: {
        level: [],
        themeType: [],
        questionType: []
      },
      async initDictionary(groupCode) {
        try {
          const res = await getDictionaryItemListApi(groupCode);
          set((state) => {
            res.data.forEach((item) => {
              state.dictionaryList.push(item);
              state.dictionary[item.groupCode].push(item);
            });
          });
        } catch (error) {}
      },
      getDictionaryAndOption(groupCode) {
        const dictionary = groupCode ? get().dictionary[groupCode] : get().dictionary;
        const dictionaryList = groupCode ? get().dictionary[groupCode] : get().dictionaryList;
        return {
          dictionary,
          options: dictionaryList.map((item) => ({ label: item.name, value: item._id }))
        };
      },
      getDictionaryItemName(groupCode, id) {
        if (!groupCode || !id) return undefined;
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
