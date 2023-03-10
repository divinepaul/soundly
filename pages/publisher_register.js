import Form from '@/components/Form/Form';
import { useRef } from 'react'
import { useRouter } from 'next/router';

let registerForm = {
    apiRoute: '/api/publisher_register/',
    submitButtonText: "Register",
    inputs: {
        "email": {
            type: "email",
            label: "Email",
            required: true,
            minLength: 5,
            maxLength: 50,
        },
        "publisher_name": {
            type: "text",
            label: "Name",
            required: true,
            minLength: 5,
            maxLength: 15,
        },
        "password": {
            type: "password",
            label: "Password",
            required: true,
            minLength: 5,
            maxLength: 50,
        },
        "confirm_password": {
            type: "password",
            label: "Confirm Password",
            required: true,
            minLength: 5,
            maxLength: 50,
        },
        // "customer_gender": {
        //     type: "select",
        //     datatype: "number",
        //     label: "Gender",
        //     value: "male",
        //     selectValues: [
        //         { label: "Male", value: "male" },
        //         { label: "female", value: "female" },
        //     ],
        //     required: true,
        // },
        "publisher_phone": {
            type: "text",
            datatype: "number",
            label: "Phone",
            required: true,
            minLength: 7,
            maxLength: 10,
        },
    }
}

export default function Home() {

    let ref = useRef();
    const router = useRouter();

    let handleResponse = (values) => {
        console.log(values.user);
        router.push("/contact");
    }

    return (
        <>
            <h1>Register as Publisher</h1>
            <Form ref={ref} formDetails={registerForm} onResponse={handleResponse} />
        </>
    )
}
