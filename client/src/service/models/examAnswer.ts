import { Schema, model, models, Model } from 'mongoose';
import { ExamAnswerModelSchema } from '@/types/mongoSchema';
const ExamAnswerSchema = new Schema({
  paperId: {
    type: Schema.Types.ObjectId,
    ref: 'exampaper'
  },
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'examquestion'
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
  isDeleted:{
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: () => new Date()
  },
  updatedAt: {
    type: Date,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
});

export const ExamAnswer: Model<ExamAnswerModelSchema> = models['examanswer'] || model('examanswer', ExamAnswerSchema);
