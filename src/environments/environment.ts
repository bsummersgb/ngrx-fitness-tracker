// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDIbZp-sjLRYcLrDjS0zzLvKlbW0UMaOwE',
    authDomain: 'ngrx-fitness-tracker.firebaseapp.com',
    databaseURL: 'https://ngrx-fitness-tracker.firebaseio.com',
    projectId: 'ngrx-fitness-tracker',
    storageBucket: 'ngrx-fitness-tracker.appspot.com',
    messagingSenderId: '558048982654'
  }
};
