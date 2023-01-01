import { Schema } from 'mongoose';
import type { TPortScan } from '@tsunamiii/types';

export const PortSchema = new Schema<TPortScan>({
  port: Number,
  open: Boolean,
  type: String
});
