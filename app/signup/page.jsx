import SignUpForm from "./componets/SignupForm"
import SideThing from "./componets/SideThing"

export const generateMetadata = () =>{
    return {
        title: "Link Tree | Create an account",
        description: "Register your new account with us"
    }
}

export default function LoginPage() {

    return (
        <div className="flex h-screen w-screen">
            <SideThing />
            <SignUpForm />
        </div>
    )
}