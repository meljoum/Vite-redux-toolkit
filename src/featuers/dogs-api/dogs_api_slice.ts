import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' 


//To get an API_KEY you must sign-in in the Dogs api "https://www.thedogapi.com/" and you get it in your email.
const DOGS_API_KEY = 'live_TCEIjUdpEwOOpb8a97550IxN5r55neg1Yf3Wj57WNKg5vnPFpYux51P1auX2utdz';


interface Breed {
    id: string,
    name: string,
    image: {
        url: string
    }
}

export const dogsApiSlice = createApi({
    reducerPath: 'api',

    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.thedogapi.com/v1',
        prepareHeaders(headers) {
            headers.set('x-api-key', DOGS_API_KEY);

            return headers;
        }
    }),
    endpoints(builder) {
        return {
            fetchBreeds: builder.query<Breed[], number | void> ({
                query(limit = 12) {
                    return `/breeds?limit=${limit}`;
                },
            }),
        };
    },
});


export const { useFetchBreedsQuery } = dogsApiSlice;