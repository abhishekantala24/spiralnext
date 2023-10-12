import { store } from '@/redux/store'

export const getStore = () => {
    return store.getState().Auth
}
