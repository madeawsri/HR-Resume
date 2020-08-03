import loader from '../config.loader';



const VUE_APP_ = 'VUE_APP_'
export default {
    API_URL: loader.getConfigValue(VUE_APP_ + 'API_URL'),
};