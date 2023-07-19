import { Schema, model, models, Model } from 'mongoose';
import { DictionaryItemModelSchema } from '@/types/mongoSchema';
const DictionaryItemSchema = new Schema({
  name: {
    type: String,
  },
  code: {
    type: String,
  },
  order: {
    type: Number,
  },
  remark: {
    type: String,
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'dictionaryitem'
  },
  isEnable: {
    type: Boolean,
    default: true
  },
  isDelete:{
    type: Boolean,
    default: false,
  },
  dictionaryGroupId: {
    type: Schema.Types.ObjectId,
    ref: 'dictionarygroup'
  },
  createdAt: {
    type: Date,
    default: () => new Date()
  },
  updatedAt: {
    type: Date,
    default: () => new Date()
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

export const DictionaryItem: Model<DictionaryItemModelSchema> = models['dictionaryitem'] || model('dictionaryitem', DictionaryItemSchema);
