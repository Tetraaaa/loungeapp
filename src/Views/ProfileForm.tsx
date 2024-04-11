import {
    Alert,
    Button,
    Card,
    Code,
    Flex,
    Image,
    Select,
    Stack,
    TextInput,
    Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Form, useForm } from "@mantine/form";
import BirthPlaceInput from "../Components/BirthPlaceInput";
import dayjs from "dayjs";
import { useState } from "react";

export default function ProfileForm() {
    interface FormValues {
        gender: "M" | "F" | "X";
        firstname: string;
        lastname: string;
        email: string;
        phoneNumber: string;
        birthDate: string;
        birthPlace: {
            city: string;
            state: string;
        };
    }

    const [formData, setFormData] = useState(null);

    const form = useForm<FormValues>({
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
        validate: {
            firstname: (value) =>
                value !== "" ? null : "Merci de renseigner votre prénom",
            lastname: (value) =>
                value !== "" ? null : "Merci de renseigner votre nom",
            birthDate: (value) =>
                value
                    ? dayjs(value) >= dayjs()
                        ? "La date de naissance semble incorrecte"
                        : null
                    : "Merci de renseigner votre date de naissance",
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "L'adresse email est invalide",
            phoneNumber: (value) =>
                /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(value)
                    ? null
                    : "Le numéro de téléphone est invalide",
        },
        transformValues: (values) => ({
            ...values,
            birthDate: dayjs(values.birthDate).format("YYYY-MM-DD"),
        }),
    });

    function onSubmit() {
        setFormData(form.getTransformedValues());
    }
    return (
        <Stack align="center" bg="red.2" p="md" mih="100vh">
            <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                miw="15rem"
                maw="50rem"
                w="80%"
            >
                <Stack align="center">
                    <Image w="10%" src={"/loungeup.svg"} />
                    <Title flex="1">Formulaire</Title>
                </Stack>
                <Form form={form} onSubmit={onSubmit}>
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
                    <Flex justify="flex-end">
                        <Button color="red" type="submit" mt="sm">
                            Enregistrer
                        </Button>
                    </Flex>
                </Form>
                {formData && (
                    <Alert title="Formulaire envoyé 🎉" color="green">
                        <Code>{JSON.stringify(formData, null, "\t")}</Code>
                    </Alert>
                )}
            </Card>
        </Stack>
    );
}
