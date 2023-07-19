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
  isDelete: {
    type: Boolean,
    default: false
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
  }
});

export const ExamQuestion: Model<ExamQuestionModelSchema> =
  models['examquestion'] || model('examquestion', ExamQuestionSchema);
