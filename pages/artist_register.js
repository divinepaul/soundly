import { useRef } from 'react'
import { useRouter } from 'next/router';
import Form from '@/components/Form/Form';

let registerForm = {
    apiRoute: '/api/auth/artist_register',
    submitButtonText: "Register",
    file: true,
    inputs: {
        "email": {
            type: "email",
            label: "Email",
            required: true,
            minLength: 5,
            maxLength: 50,
        },
        "artist_name": {
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
        "artist_phone": {
            type: "text",
            datatype: "number",
            label: "Phone",
            required: true,
            minLength: 7,
            maxLength: 10,
        },
         "artist_image": {
             type: "file",
             label: "Arist Image",
             required: true,
         },
    }
}

export default function RegisterArtist() {

    let ref = useRef();
    const router = useRouter();

    let handleSubmit = async (values) => {
        let formData = new FormData();
        formData.append('file', values.artist_image);
        formData.append('email', values.email);
        formData.append('password', values.password);
        formData.append('confirm_password', values.confirm_password);
        formData.append('artist_phone', values.artist_phone);
        formData.append('artist_name', values.artist_name);

        console.log(formData.get('file'));

        let rawResponse = await fetch('/api/auth/artist_register', {
            method: 'POST',
            body: formData
        });
        let data = await rawResponse.json();
        if(rawResponse.status == 200){
            console.log(data);
            router.push('/admin/customer/view');
        }
    }

    return (
        <>
            <h1>Artist Register</h1>
            <Form ref={ref} formDetails={registerForm} onSubmit={handleSubmit} />
        </>
    )
}
