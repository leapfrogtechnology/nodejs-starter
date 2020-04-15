import db from '../db';

import { createBaseModel } from '@leapfrogtechnology/db-model';

const resolver = () => db;

// Create BaseModel passing in connection resolver.
const BaseModel = createBaseModel(resolver);

export default BaseModel;
