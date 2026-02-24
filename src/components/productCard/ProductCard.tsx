import { IProduct } from "../../models/product";
import { Text, View } from "react-native";

export default function ProductCard({ product }: { product: IProduct }) {
    return (
        <View>
            <Text>{product.title}</Text>
        </View>
    );
}