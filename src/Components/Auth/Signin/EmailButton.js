import React, { useEffect, useState } from "react";

function EmailButton({ onClick, text, email, setWarningMessage }) {

    const [verifyNum, setVerifyNum] = useState("");

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
                console.log("정상 요청");
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
            <button type="button" className="email-button" onClick={onClick}>
                {text}
            </button>
            <input type="text" value={verifyNum} onChange={onValueChange} placeholder="Verification Number" className="email-verification-input" />
            <input type="button" className="email-checkbox" onClick={handleCheckboxClick} value="인증" />
        </div>
    );
}

export { EmailButton };
