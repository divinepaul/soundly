import { useContext, useRef } from "react";
import { useRouter } from "next/router";
import Form from "@/components/Form/Form";
import UserContext from "@/lib/usercontext";

let loginForm = {
    apiRoute: '/api/login',
    submitButtonText: "Login",
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
        "password": {
            type: "password",
            label: "Password",
            width: '100%',
            required: true,
            minLength: 5,
            maxLength: 50,
        }
    }
};




export default function Login() {

    const router = useRouter()
    let ref = useRef();

    const [user, setUser] = useContext(UserContext);

    let handleSubmit = async (values) => {
        let user = values.user;
        setUser(user)

        if(user.type=="admin"){
            router.push("/admin/customer/view");
        } else if(user.type == "publisher"){
            router.push("/admin/music/view");
        } else if(user.type == "artist"){
            router.push("/admin/music/view");
        } else {
            router.push("/home");
        }
    }

    return (
        <div className="auth-page">
            <div class="auth-floater">
                <h1>Login</h1>
                <br/>
                <br/>
                <br/>
                <Form ref={ref} formDetails={loginForm} onResponse={handleSubmit} />
            </div>
        </div>
    );
}
