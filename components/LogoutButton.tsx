"use client";
import {FC, MouseEventHandler} from "react";
import {Services} from "@/services";

export const LogoutButton: FC = () => {
    const onClickHandler: MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault()
        Services.Auth.signOut();
    }
    return (
        <a href="#" onClick={onClickHandler}>Выход</a>
    )
}