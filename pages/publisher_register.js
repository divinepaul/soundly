import Form from '@/components/Form/Form';
import { useRef } from 'react'
import { useRouter } from 'next/router';

let registerForm = {
    apiRoute: '/api/publisher_register/',
    submitButtonText: "Register",
    buttonFullWidth: true,
    inputs: {
        "email": {
            type: "email",
            label: "Email",
            width: '100%',
            required: true,
            minLength: 5,
            maxLength: 50,
        },
        "publisher_name": {
            type: "text",
            label: "Name",
            width: '100%',
            required: true,
            minLength: 5,
            maxLength: 15,
        },
        "password": {
            type: "password",
            label: "Password",
            width: '100%',
            required: true,
            minLength: 5,
            maxLength: 50,
        },
        "confirm_password": {
            type: "password",
            label: "Confirm Password",
            width: '100%',
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
            width: '100%',
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
        <div className="auth-page">
            <div class="auth-floater">
            <h1>Register as Publisher</h1>
            <br/>
            <br/>
            <Form ref={ref} formDetails={registerForm} onResponse={handleResponse} />
            </div>
        </div>
    )
}
