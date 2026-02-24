import { View } from "react-native";
import { IProduct } from "../../models/product";
import { Text } from "../index.ts";

export default function ProductCard({ product }: { product: IProduct }) {
    return (
        <View>
            <Text>{product.title}</Text>
        </View>
    );
}