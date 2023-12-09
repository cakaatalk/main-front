import WarningMessage from "../../Components/Common/WarningMessage";
import FindForm from "../FindAccount/FindForm";

import { useState } from "react";

function FindAccountArea(props) {
    const [warningMessage, setWarningMessage] = useState("");
    const VERIFICATION_SEND = true;

    return (
        <>
            <h1 className="login-header">
                Find-Account
            </h1>
            <FindForm
                buttonText="비밀번호 변경"
                setWarningMessage={setWarningMessage}
                fields={[
                    {
                        name: "email",
                        type: "text",
                        placeholder: "Ajou University Email (@ajou.ac.kr)",
                        className: "input-email verify-email",
                    },
                    {
                        name: "password",
                        type: "password",
                        placeholder: "Password",
                        className: "input-password",
                    },
                ]}
                showVerificationButton={VERIFICATION_SEND}
            />
            {warningMessage && <WarningMessage message={warningMessage} />}
        </>
    );
}

export { FindAccountArea };
