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
