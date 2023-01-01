import type { Document, ObjectId } from 'mongoose';

import type { TScan } from '@tsunamiii/types';

export type ScanDocument = TScan & Document<ObjectId, unknown, TScan>;
