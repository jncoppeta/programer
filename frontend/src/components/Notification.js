import React, { useState } from 'react';
import "./Sandbox.css"

const Notification = ({ message }) => {

    const hide = () => {
        var popup = document.getElementById("success-popup")
        popup.style.display = "none"
    }

  return (
    <div className="success-notification" id="success-popup" style={{ display: 'none' }}>
        <div
            className="bg-white border border-slate-300 w-max h-20 shadow-lg rounded-md gap-4 p-4 flex flex-row items-center justify-center">
            <section className="h-full flex flex-col items-start justify-end gap-1">
                <h1 className="text-base font-semibold text-zinc-800 antialiased">{message}</h1>
            </section>
            <section className="w-5 h-full flex flex-col items-center justify-start">
                <svg onClick={hide} width="100%" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer">
                    <path
                        d="M4.06585 3.00507C3.77296 2.71218 3.29809 2.71218 3.00519 3.00507C2.7123 3.29796 2.7123 3.77284 3.00519 4.06573L4.06585 3.00507ZM10.0763 11.1368C10.3692 11.4297 10.844 11.4297 11.1369 11.1368C11.4298 10.8439 11.4298 10.369 11.1369 10.0761L10.0763 11.1368ZM3.00519 4.06573L10.0763 11.1368L11.1369 10.0761L4.06585 3.00507L3.00519 4.06573Z"
                        fill="#989fac" />
                    <path
                        d="M11.1369 4.06573C11.4298 3.77284 11.4298 3.29796 11.1369 3.00507C10.844 2.71218 10.3691 2.71218 10.0762 3.00507L11.1369 4.06573ZM3.00517 10.0761C2.71228 10.369 2.71228 10.8439 3.00517 11.1368C3.29806 11.4297 3.77294 11.4297 4.06583 11.1368L3.00517 10.0761ZM10.0762 3.00507L3.00517 10.0761L4.06583 11.1368L11.1369 4.06573L10.0762 3.00507Z"
                        fill="#989fac" />
                </svg>
            </section>
        </div>
    </div>
  );
}

export default Notification;
