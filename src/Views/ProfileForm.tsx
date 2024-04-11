import { Card, Stack } from "@mantine/core";
import { Form, useForm } from "@mantine/form";

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
                <Form form={form}></Form>
            </Card>
        </Stack>
    );
}
