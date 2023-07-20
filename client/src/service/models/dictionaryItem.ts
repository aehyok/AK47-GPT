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
    type: String,
  },
  isEnable: {
    type: Boolean,
    default: true
  },
  isVisible: {
    type: Boolean,
    default: true
  },
  isDeleted:{
    type: Boolean,
    default: false,
  },
  groupCode: {
    type: String,
    required: true,
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

export const DictionaryItem: Model<DictionaryItemModelSchema> = models['dictionaryitem'] || model('dictionaryitem', DictionaryItemSchema);
