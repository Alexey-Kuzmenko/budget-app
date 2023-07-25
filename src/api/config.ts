interface ApiConfig {
    url: string
    authApi?: string
    apiKey?: string
}

const apiConfig: ApiConfig = {
    url: 'https://budget-app-3c68c-default-rtdb.europe-west1.firebasedatabase.app',
    authApi: 'https://identitytoolkit.googleapis.com/v1/accounts',
    apiKey: 'AIzaSyBuGSdVo-KKuewM_CoTzHAoVVI-7O71FoQ'
};

export default apiConfig;