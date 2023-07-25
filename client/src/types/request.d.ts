export interface RequestType {
  code: number;
  data: RequsetListType;
  statusText: string;
}

export interface RequsetListType {
  docs: Array;
  page: number;
  pages: number;
  total: number;
}

export type listParameterType = {
  pageSize: number;
  pageNumber: number;
  keyword?: string;
};
