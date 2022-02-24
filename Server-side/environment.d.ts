declare global {
    namespace NodeJS {
      interface ProcessEnv {
        DB_CONN_STRING : string,
        DB_NAME : string,
        COLLECTION_NAME_TEST : string,
        COLLECTION_NAME_PROD : string,
        PORT : number,
        CLOCK_TICK_IN_MS : number,
        OPEN_ROUTE_API_KEY : string
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}