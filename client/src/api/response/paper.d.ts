export interface PaperListResponse {
  _id: string;
  name: string;
  categoryId: string;
  level: string;
  score: number;
  themeChoices: { _id: string }[];
}

export interface PaperParams {
  _id?: string;
  name: string;
  level: string;
  categoryId: string;
  themeChoices: string[];
}

export interface PaperAnswerUpdateParams {
  paperId: string;
  questionId: string;
  answerContent: string;
  questionNumber: number;
}

export interface PaperQuestionListResponse {
  isAnswered: boolean;
  question: string;
  _id: string;
}
