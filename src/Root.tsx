import { createStore, applyMiddleware, Store, EmptyObject, AnyAction } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { reducers, StoreState } from "./reducers/index";

interface RootProps {
    children: JSX.Element;
    initialState?: any;
}
let store: Store<EmptyObject & StoreState, AnyAction> & { dispatch: unknown; };

const Root = ({ children, initialState = {} }: RootProps) => {
    store = createStore(reducers, initialState, applyMiddleware(thunk));

    return(
        <Provider store={store} >
          {children}
        </Provider>
    )
}
export { store };
export default Root;