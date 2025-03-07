"use client";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthService } from '@/services/auth.service';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Некорректный email')
        .required('Обязательное поле'),
    password: Yup.string()
        .min(8, 'Пароль должен содержать минимум 6 символов')
        .required('Обязательное поле')
});

export const AuthForm = () => {
    const authService = new AuthService();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            try {
                await authService.login({
                    email: values.email,
                    password: values.password
                });
            } catch (error) {
                setFieldError('password', 'Неверный email или пароль');
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <form onSubmit={formik.handleSubmit} className="auth-form">
            <div className="form-group">
                <input
                    type="email"
                    name="email"
                    className={`auth-inp auth-mail ${
                        formik.touched.email && formik.errors.email ? 'error' : ''
                    }`}
                    placeholder="E-mail"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                    <div className="error-message">{formik.errors.email}</div>
                )}
            </div>

            <div className="form-group">
                <input
                    type="password"
                    name="password"
                    className={`auth-inp auth-pass ${
                        formik.touched.password && formik.errors.password ? 'error' : ''
                    }`}
                    placeholder="Пароль"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && (
                    <div className="error-message">{formik.errors.password}</div>
                )}
            </div>

            <div className="btn-wrap">
                <button
                    type="submit"
                    className="auth-btn btn"
                    disabled={formik.isSubmitting}
                >
                    {formik.isSubmitting ? 'Вход...' : 'Войти'}
                </button>
            </div>
        </form>
    );
};