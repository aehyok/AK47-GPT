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
        _id: {
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
  isDeleted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: () => new Date()
  },
  updatedAt: {
    type: Date
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

export const ExamPaper: Model<ExamPaperModelSchema> =
  models['exampaper'] || model('exampaper', ExamPaperSchema);
