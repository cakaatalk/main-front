import React, { useState } from "react";

function EmailButton({ onClick, text, email, setWarningMessage, setViewable, disableValue }) {

    const [verifyNum, setVerifyNum] = useState("");
    const [verificationComplete, setVerificationComplete] = useState(false);
    const [verifyText, setVerifyText] = useState("인증");

    const onValueChange = (e) => {
        setWarningMessage(``);
        setVerifyNum(e.target.value);
    }

    const handleCheckboxClick = async () => {
        setWarningMessage(``);

        try {
            const response = await fetch("http://localhost:8080/api/auth/mail/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    authCode: verifyNum
                }),
            });

            if (response.ok) {
                setVerificationComplete(true);
                setVerifyText("인증 완료");
                setViewable("");
            } else {
                const errorResponse = await response.json();
                setWarningMessage(errorResponse.error);
            }
        } catch (error) {
            setWarningMessage(`${error.response.data.error}`);
        }
    };

    return (
        <div className="email-verification-div">
            <button type="button" className="email-button" onClick={onClick} disabled={disableValue}>
                {text}
            </button>
            <input type="text" value={verifyNum} onChange={onValueChange} placeholder="Verification Number" className="email-verification-input" />
            <input
                type="button"
                className="email-check-button"
                onClick={handleCheckboxClick}
                value={verifyText}
                disabled={verificationComplete}
            />
        </div>
    );
}

export { EmailButton };
