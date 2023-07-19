import { Schema, model, models, Model } from 'mongoose';
import { DictionaryGroupModelSchema } from '@/types/mongoSchema';
const DictionaryGroupSchema = new Schema({
  name: {
    type: String,
  },
  code: {
    type: String,
  },
  order: {
    type: Number,
  },
  isSystem: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  remark: {
    type: String,
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
  },
});

export const DictionaryGroup: Model<DictionaryGroupModelSchema> = models['dictionarygroup'] || model('dictionarygroup', DictionaryGroupSchema);
