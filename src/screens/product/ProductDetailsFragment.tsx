import { View } from "react-native";
import { Text } from "../../components";
import { IProduct } from "../../models/product";

interface ProductDetailsProps {
    product: IProduct;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    return (
        <View>
            <Text>{product.title}</Text>
            <Text>{product.description}</Text>
        </View>
    );
}