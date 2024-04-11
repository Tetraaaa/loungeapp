import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import ProfileForm from "./Views/ProfileForm";

export default function App() {
    return (
        <MantineProvider theme={theme}>
            <ProfileForm />
        </MantineProvider>
    );
}
