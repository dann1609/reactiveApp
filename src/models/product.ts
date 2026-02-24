export interface IPrice {
    amount: string;
    currencyCode: string;
}

export interface IPriceRange {
    maxVariantPrice: IPrice;
    minVariantPrice: IPrice;
}

export interface IImage {
    id: string;
    url: string;
    width?: number;
    height?: number;
    altText?: string | null;
}

export interface IOption {
    id: string;
    name: string;
    values: string[];
}

export interface ISelectedOption {
    name: string;
    value: string;
}

export interface IMedia {
    mediaContentType: string;
    image: IImage;
}

export interface IVariant {
    id: string;
    title: string;
    quantityAvailable: number;
    availableForSale: boolean;
    currentlyNotInStock: boolean;
    price: IPrice;
    compareAtPrice: IPrice | null;
    sku: string;
    selectedOptions: ISelectedOption[];
    image: IImage | null;
    product: {
        id: string;
        handle: string;
        options: IOption[];
    };
}

export interface IProduct {
    id: string;
    title: string;
    description: string;
    descriptionHtml: string;
    availableForSale: boolean;
    handle: string;
    productType: string;
    tags: string[];
    vendor: string;
    priceRange: IPriceRange;
    compareAtPriceRange: IPriceRange;
    images: IImage[];
    options: IOption[];
    requiresSellingPlan: boolean;
    onlineStoreUrl: string;
    media: IMedia[];
    variants: IVariant[];
    metafields: any[];
    collections: string[];
}

export function getImageUrlFromVariantOrProduct(product: IProduct, selectedVariant: IVariant | null): string {
    return selectedVariant?.image?.url || product.images[0]?.url;
}

export function getPriceFromVariantOrProduct(product: IProduct, selectedVariant: IVariant | null): string {
    return selectedVariant
        ? `${selectedVariant.price.amount} ${selectedVariant.price.currencyCode}`
        : `${product.priceRange.minVariantPrice.amount} ${product.priceRange.minVariantPrice.currencyCode}`;
}

export const checkIfProductIsAvailable = (product: IProduct, selectedVariant: IVariant | null): boolean => {
    return selectedVariant
        ? (selectedVariant.availableForSale && selectedVariant.quantityAvailable > 0)
        : product.availableForSale;
}

export const checkIfIsOptionValueAvailable = (product: IProduct, selectedOptions: Record<string, string>, optName: string, optValue: string): boolean => {
    if (!product) return false;
    return product.variants.some(variant => {
        // Must have the option we're checking
        const matchesTarget = variant.selectedOptions.some(opt => opt.name === optName && opt.value === optValue);
        if (!matchesTarget) return false;

        // Must match all OTHER currently selected options
        const matchesOthers = variant.selectedOptions.every(opt => {
            if (opt.name === optName) return true;
            return selectedOptions[opt.name] === opt.value;
        });

        return matchesOthers && variant.availableForSale && variant.quantityAvailable > 0;
    });
}