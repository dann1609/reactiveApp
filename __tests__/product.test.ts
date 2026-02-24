import {
    getImageUrlFromVariantOrProduct,
    getPriceFromVariantOrProduct,
    checkIfProductIsAvailable,
    IProduct,
    IVariant
} from '../src/models/product';

const mockProduct: IProduct = {
    id: 'prod-1',
    title: 'Test Product',
    images: [{ id: 'img-1', url: 'product-image.jpg' }],
    priceRange: {
        minVariantPrice: { amount: '10.00', currencyCode: 'USD' },
        maxVariantPrice: { amount: '20.00', currencyCode: 'USD' }
    },
    availableForSale: true,
    variants: [],
    // ... other fields omitted for brevity as they are not used in tested helpers
} as any;

const mockVariant: IVariant = {
    id: 'var-1',
    image: { id: 'img-2', url: 'variant-image.jpg' },
    price: { amount: '15.00', currencyCode: 'USD' },
    availableForSale: true,
    quantityAvailable: 10,
} as any;

describe('Product Model Helpers', () => {
    describe('getImageUrlFromVariantOrProduct', () => {
        it('should return variant image url if available', () => {
            expect(getImageUrlFromVariantOrProduct(mockProduct, mockVariant)).toBe('variant-image.jpg');
        });

        it('should fallback to product image url if variant has no image', () => {
            const variantNoImg = { ...mockVariant, image: null } as IVariant;
            expect(getImageUrlFromVariantOrProduct(mockProduct, variantNoImg)).toBe('product-image.jpg');
        });

        it('should fallback to product image url if variant is null', () => {
            expect(getImageUrlFromVariantOrProduct(mockProduct, null)).toBe('product-image.jpg');
        });
    });

    describe('getPriceFromVariantOrProduct', () => {
        it('should return variant price if available', () => {
            expect(getPriceFromVariantOrProduct(mockProduct, mockVariant)).toBe('15.00 USD');
        });

        it('should fallback to product min price if variant is null', () => {
            expect(getPriceFromVariantOrProduct(mockProduct, null)).toBe('10.00 USD');
        });
    });

    describe('checkIfProductIsAvailable', () => {
        it('should return variant availability if variant is provided', () => {
            expect(checkIfProductIsAvailable(mockProduct, mockVariant)).toBe(true);

            const unavailableVariant = { ...mockVariant, availableForSale: false } as IVariant;
            expect(checkIfProductIsAvailable(mockProduct, unavailableVariant)).toBe(false);

            const outOfStockVariant = { ...mockVariant, quantityAvailable: 0 } as IVariant;
            expect(checkIfProductIsAvailable(mockProduct, outOfStockVariant)).toBe(false);
        });

        it('should return product availability if variant is null', () => {
            expect(checkIfProductIsAvailable(mockProduct, null)).toBe(true);

            const unavailableProduct = { ...mockProduct, availableForSale: false } as IProduct;
            expect(checkIfProductIsAvailable(unavailableProduct, null)).toBe(false);
        });
    });
});
