import { IProduct } from "../models/product";
import { cachedApiFacade } from "./cache";

export const getProductsFromApi = (): Promise<IProduct[]> => {
    const apiCall = () => fetch('https://gist.githubusercontent.com/agorovyi/40dcd166a38b4d1e9156ad66c87111b7/raw/36f1c815dd83ed8189e55e6e6619b5d7c7c4e7d6/testProducts.json')
        .then(response => response.json())
        .then(json => {
            console.log(json)
            return json as IProduct[]
        })
        .catch(error => {
            console.error(error);
            throw (error)
        });

    return cachedApiFacade<IProduct[]>('products', apiCall, []);
};