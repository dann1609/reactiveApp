import { Text } from "react-native";
import { Layout } from "../../components";

export default function HomeScreen() {
    return (
        <Layout
            disableBottomInset
            noScroll
        >
            <Text>Home</Text>
        </Layout>
    );
}