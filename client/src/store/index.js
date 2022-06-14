import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducer";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// Creamos la store y le pasamos el reducer  como primer parametro(en este caso el rootReducer que importamos directamente del archivo reducer) Y el compose como segundo parametro (con el compose vemos como cambia nuestro estado. Y luego le colocamos el middleware thunk.
