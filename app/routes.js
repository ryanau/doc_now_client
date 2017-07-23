// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      name: 'home',
      // onEnter(nextState, replace, callback) {
      //   if (this.loadedSagas) {
      //     callback();
      //     return;
      //   }
      //
      //   // Inject sagas as usual
      //   const importModules = System.import('containers/HomePage/sagas');
      //
      //   importModules.then((sagas) => {
      //     this.loadedSagas = injectSagas(sagas.default);
      //     callback();
      //   });
      //
      //   importModules.catch(errorLoading);
      // },
      // onLeave() {
      //   if (this.loadedSagas) {
      //     this.loadedSagas.forEach((saga) => saga.cancel());
      //     delete this.loadedSagas;
      //   }
      // },
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/HomePage'),
          System.import('containers/HomePage/reducer'),
        ]);
        const renderRoute = loadModule(cb);
        importModules.then(([component, reducer]) => {
          injectReducer('homePage', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/areas',
      name: 'areas',
      // onEnter(nextState, replace, callback) {
      //   if (this.loadedSagas) {
      //     callback();
      //     return;
      //   }
      //
      //   // Inject sagas as usual
      //   const importModules = System.import('containers/Area/sagas');
      //
      //   importModules.then((sagas) => {
      //     this.loadedSagas = injectSagas(sagas.default);
      //     callback();
      //   });
      //
      //   importModules.catch(errorLoading);
      // },
      // onLeave() {
      //   if (this.loadedSagas) {
      //     this.loadedSagas.forEach((saga) => saga.cancel());
      //     delete this.loadedSagas;
      //   }
      // },
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Area'),
          import('containers/Area/reducer'),
        ]);
        const renderRoute = loadModule(cb);
        importModules.then(([component, reducer]) => {
          injectReducer('area', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/doctors',
      name: 'doctors',
      onEnter(nextState, replace, callback) {
        if (this.loadedSagas) {
          callback();
          return;
        }

        // Inject sagas as usual
        const importModules = System.import('containers/Doctor/sagas');

        importModules.then((sagas) => {
          this.loadedSagas = injectSagas(sagas.default);
          callback();
        });

        importModules.catch(errorLoading);
      },
      onLeave() {
        if (this.loadedSagas) {
          this.loadedSagas.forEach((saga) => saga.cancel());
          delete this.loadedSagas;
        }
      },
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Doctor'),
          import('containers/Doctor/reducer'),
        ]);
        const renderRoute = loadModule(cb);
        importModules.then(([component, reducer]) => {
          injectReducer('doctor', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
