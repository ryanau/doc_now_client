import { fromJS } from 'immutable';

const normalizeEntities = (entities) => entities.reduce((obj, elm) => obj.withMutations((o) => {
  o.setIn(['byId', elm.id], elm)
        .update('allIds', (allIds) => allIds.push(elm.id));
}), fromJS({ byId: {}, allIds: [] }));

export default normalizeEntities;

