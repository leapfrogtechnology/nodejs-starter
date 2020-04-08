import { createNamespace, getNamespace } from 'continuation-local-storage';

/**
 * User session namespace limited to request response roundtrip.
 */
export const userSession = createNamespace('user-namespace');

/**
 * User object that is consumed by services.
 */
const session = getNamespace('user-namespace');
const user = () => session.get('user');

export default user;
