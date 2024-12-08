const API_CONFIG = {
    baseURL: 'https://dummyjson.com',
    endpoints: {
        products: {
            all: '/products',
            byId: (id: number) => `/products/${id}`,
            search: (query: string) => `/products/search?q=${query}`
        }
    }
}

export default API_CONFIG;