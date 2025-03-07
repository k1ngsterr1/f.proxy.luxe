"use client";
import {useFormik} from 'formik';
import * as Yup from 'yup';

import Visa from "@/assets/images/visa.png";
import WebMoney from "@/assets/images/webmoney.png";
import BitCoin from "@/assets/images/bitcoin.png";
import LitCoin from "@/assets/images/litecoin.png";
import DogeCoin from "@/assets/images/dogetoin.png";
import Payer from "@/assets/images/payeer.png";
import Enot from "@/assets/images/enot.png";
import Image from "next/image";

const validationSchema = Yup.object({
    paymentMethod: Yup.string().required('Выберите способ оплаты'),
    paymentAmount: Yup.number()
        .min(10, 'Минимальная сумма 10₽')
        .required('Введите сумму платежа'),
    agreed: Yup.boolean()
        .oneOf([true], 'Вы должны подтвердить ознакомление с FAQ')
});

export const PayForm = () => {
    const formik = useFormik({
        initialValues: {
            paymentMethod: '',
            paymentAmount: '',
            agreed: false
        },
        validationSchema,
        onSubmit: values => {
            console.log('Form data', values);
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="m_title">
                <h1 className="h1">
                    <span>ЛИЧНЫЙ КАБИНЕТ </span>/БАЛАНС
                </h1>
            </div>

            <div className="agree_faq">
                <label className="checkbox">
                    <input
                        className="checkbox-inp"
                        name="agreed"
                        type="checkbox"
                        checked={formik.values.agreed}
                        onChange={formik.handleChange}
                    />
                    <span className="checkbox-box"></span>
                    <span className="checkbox-text">
              Я прочитал раздел FAQ. Я знаю, что покупаю и согласен с условиями использования
            </span>
                </label>
                {formik.touched.agreed && formik.errors.agreed ? (
                    <div className="error">{formik.errors.agreed}</div>
                ) : null}
            </div>

            <div className="payment_method">
                <div className="h5">
                    Способ оплаты:
                </div>

                <div className="methods">
                    {[
                        {id: 'visa', img: Visa, text: 'VISA/Mastercard/MIR'},
                        {id: 'webmoney', img: WebMoney, text: 'Webmoney (WMZ)'},
                        {id: 'bitcoin', img: BitCoin, text: 'Bitcoin (BTC)'},
                        {id: 'litecoin', img: LitCoin, text: 'Litecoin (LTC)'},
                        {id: 'dogecoin', img: DogeCoin, text: 'Dogecoin (DOGE)'},
                        {id: 'Payeer', img: Payer, text: 'Payeer'},
                        {id: 'Enot', img: Enot, text: 'Enot.io'},
                    ].map((method) => (
                        <label key={method.id} className="method">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value={method.id}
                                checked={formik.values.paymentMethod === method.id}
                                onChange={formik.handleChange}
                            />
                            <span className="method_cont">
                                      <span className="img">
                                        <Image src={method.img} alt={method.id}/>
                                      </span>
                                      <span className="txt">{method.text}</span>
                                    </span>
                        </label>
                    ))}
                </div>
                {formik.touched.paymentMethod && formik.errors.paymentMethod ? (
                    <div className="error">{formik.errors.paymentMethod}</div>
                ) : null}
            </div>

            <div className="sum_line">
                <div className="h5">Сумма платежа:</div>

                <div className="form">
                    <input
                        name="paymentAmount"
                        type="number"
                        placeholder="10.000₽"
                        value={formik.values.paymentAmount}
                        onChange={formik.handleChange}
                    />
                    <button type="submit" className="btn_next">
                        продолжить
                    </button>
                </div>
                {formik.touched.paymentAmount && formik.errors.paymentAmount ? (
                    <div className="error">{formik.errors.paymentAmount}</div>
                ) : null}
            </div>
        </form>
    )
}