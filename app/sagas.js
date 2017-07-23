import { getAsyncInjectors } from './utils/asyncInjectors';

import { doctorFlow } from 'entities/doctors/sagas';

export function injectGlobalSagas(store) {
  const { injectSagas } = getAsyncInjectors(store);

  injectSagas([
    doctorFlow,
  ]);
}
