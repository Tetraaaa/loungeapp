import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import ProfileForm from "./Views/ProfileForm";
import { DatesProvider } from "@mantine/dates";
import "@mantine/dates/styles.css";
import "dayjs/locale/fr";

export default function App() {
    return (
        <MantineProvider theme={theme}>
            <DatesProvider settings={{ locale: "fr" }}>
                <ProfileForm />
            </DatesProvider>
        </MantineProvider>
    );
}
