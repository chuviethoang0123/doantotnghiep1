import {createStore} from 'vuex';
import {auth} from './auth/auth';
import {home} from './home/home';
import {admin} from './admin/admin';


export const store = createStore({
    modules: {
        auth,
        home,
        admin,
    }
});