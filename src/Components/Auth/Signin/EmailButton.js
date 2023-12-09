import React from "react";

function EmailButton({ onClick, text }) {
    return (
        <div className="email-verification-div">
            <button type="button" className="email-button" onClick={onClick}>
                {text}
            </button>
            <input type="text" placeholder="Verification Number" className="email-verification-input" />
        </div>
    );
}

export { EmailButton };
