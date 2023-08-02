export interface questionListResponse {
  _id: string;
  answer: string;
  categoryId: string;
  createdAt: string;
  createdBy: string;
  question: string;
  themeId: string;
  updatedAt: string;
  updatedBy: string;
}

export interface questionParams {
  _id?: string;
  name: string;
  // level: string;
  // categoryId: string;
  // themeChoices: string[];
}
