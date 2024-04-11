import { Button, Card, Select, Stack, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Form, useForm } from "@mantine/form";
import BirthPlaceInput from "../Components/BirthPlaceInput";

export default function ProfileForm() {
    const form = useForm({
        initialValues: {
            gender: "M",
            firstname: "",
            lastname: "",
            email: "",
            phoneNumber: "",
            birthDate: "",
            birthPlace: {
                city: "",
                state: "",
            },
        },
    });
    return (
        <Stack>
            <Card>
                <Form form={form}>
                    <Select
                        label="Genre"
                        data={[
                            {
                                label: "Homme",
                                value: "M",
                            },
                            {
                                label: "Femme",
                                value: "F",
                            },
                            {
                                label: "Autre",
                                value: "X",
                            },
                        ]}
                        {...form.getInputProps("gender")}
                    />
                    <TextInput
                        {...form.getInputProps("firstname")}
                        label="Prénom"
                        withAsterisk
                    ></TextInput>
                    <TextInput
                        {...form.getInputProps("lastname")}
                        label="Nom"
                        withAsterisk
                    ></TextInput>
                    <TextInput
                        {...form.getInputProps("email")}
                        label="Email"
                        withAsterisk
                    ></TextInput>
                    <TextInput
                        {...form.getInputProps("phoneNumber")}
                        label="Téléphone"
                        withAsterisk
                    ></TextInput>
                    <DateInput
                        {...form.getInputProps("birthDate")}
                        valueFormat="DD MMMM YYYY"
                        label="Date de naissance"
                        withAsterisk
                    ></DateInput>
                    <BirthPlaceInput
                        onChange={(value) => {
                            form.setFieldValue("birthPlace", value);
                        }}
                    />
                    <Button color="red" type="submit" mt="sm">
                        Enregistrer
                    </Button>
                </Form>
            </Card>
        </Stack>
    );
}
