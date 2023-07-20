import { Schema, model, models, Model } from 'mongoose';
import { ExamQuestionModelSchema } from '@/types/mongoSchema';
const ExamQuestionSchema = new Schema({
  question: {
    type: String
  },
  answer: {
    type: String
  },
  order: {
    type: Number
  },
  remark: {
    type: String
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'dictionaryitem'
  },
  themeId: {
    type: Schema.Types.ObjectId,
    ref: 'dictionaryitem'
  },
  isEnable: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
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
  }
});

export const ExamQuestion: Model<ExamQuestionModelSchema> =
  models['examquestion'] || model('examquestion', ExamQuestionSchema);
