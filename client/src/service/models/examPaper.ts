import { Schema, model, models, Model } from 'mongoose';
import { ExamPaperModelSchema } from '@/types/mongoSchema';
const ExamPaperSchema = new Schema({
  name: {
    type: String
  },
  level: {
    type: Schema.Types.ObjectId,
    ref: 'dictionaryitem'
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'dictionaryitem'
  },
  themeChoices: {
    type: [
      {
        id: {
          type: Schema.Types.ObjectId
        }
      }
    ],
    default: []
  },
  score: {
    type: Number,
    default: 0
  },
  remark: {
    type: String
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

export const ExamPaper: Model<ExamPaperModelSchema> =
  models['exampaper'] || model('exampaper', ExamPaperSchema);
