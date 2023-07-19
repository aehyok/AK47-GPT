import { Schema, model, models, Model } from 'mongoose';
import { ExamAnswerModelSchema } from '@/types/mongoSchema';
const ExamAnswerSchema = new Schema({
  paperId: {
    type: Schema.Types.ObjectId,
    ref: 'exampaper'
  },
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'question'
  },
  answerContent: {
    type: String,
  },
  gptContent: {
    type: String,
  },
  score: {
    type: Number,
  },
  remark: {
    type: String,
  },
  isDelete:{
    type: Boolean,
    default: false,
  },
  createAt: {
    type: Date,
    default: () => new Date()
  },
  updateAt: {
    type: Date,
    default: () => new Date()
  },
  createBy: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  updateBy: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
});

export const ExamAnswer: Model<ExamAnswerModelSchema> = models['examanswer'] || model('examanswer', ExamAnswerSchema);
