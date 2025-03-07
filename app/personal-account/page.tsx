import "@/assets/styles/style.css"
import {PayForm} from "@/components/forms/pay.form";


export default function PersonalAccount() {
    return (
        <div className="personal_account">
            <div className="main_cont">
                <PayForm />
            </div>
        </div>
    )
}