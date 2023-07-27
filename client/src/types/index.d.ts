import { Response } from './../pages/api/openapi/v1/chat/getHistory';
import type { Mongoose } from 'mongoose';
import type { Agent } from 'http';
import type { Pool } from 'pg';
import type { Tiktoken } from '@dqbd/tiktoken';

export type ResponseType<T> = {
  code: number;
  statusText: string;
  data: PagingData<T>;
};

export type PagingData<T> = {
  pageNum: number;
  pageSize: number;
  data: T[];
  total?: number;
};

export type RequestPaging = { pageNum: number; pageSize: number; [key]: any };

declare global {
  var mongodb: Mongoose | string | null;
  var pgClient: Pool | null;
  var httpsAgent: Agent;
  var particlesJS: any;
  var grecaptcha: any;
  var QRCode: any;
  var qaQueueLen: number;
  var vectorQueueLen: number;
  var OpenAiEncMap: Record<string, Tiktoken>;
  var systemEnv: {
    vectorMaxProcess: number;
    qaMaxProcess: number;
    pgIvfflatProbe: number;
    sensitiveCheck: boolean;
  };

  interface Window {
    ['pdfjs-dist/build/pdf']: any;
  }
}

export type OperatingButtonType = {
  type: string;
  name: string;
  onClickType: string;
  fields?: AddEditformType[];
  dialogTitle?: ((val: { [key: string]: string }) => ReactNode) | string;
  dialogDescription?: ((val: { [key: string]: string }) => ReactNode) | string;
  render?: (...args: any[]) => string;
};

export type columnsType = {
  name: string;
  label: string;
  valueType?: 'text' | 'select' | 'textarea' | 'checkbox';
  required?: boolean;
  render?: (record: any) => ReactNode;
  options?: { label: string; value: string }[];
  hideInForm?: boolean;
  error?: boolean;
  helperText?: string;
  formItemProps?: Record<string, any>;
};
