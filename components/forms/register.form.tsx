export const RegisterForm = () => {
    return (
        <form action="#">
            <input type="text" className="auth-inp auth-mail" placeholder="E-mail"/>
            <input type="text" className="auth-inp auth-pass" placeholder="Пароль"/>
            <input type="text" className="auth-inp auth-pass" placeholder="Повторить пароль"/>
            <div className="btn-wrap">
                <button className="auth-btn btn">регистрация</button>
            </div>
            {/*<div className="btn-wrap">*/}
            {/*    <a href="#" className="auth-link">Войти</a>*/}
            {/*</div>*/}
        </form>
    )
}