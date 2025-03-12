"use client";
import { FC, useEffect, useState } from "react";
import Select from "@/components/Select";
import { Option } from "@/interfaces/option.interface";
import { Services } from "@/services";

interface IspBuyFormProps {
  countries: Option[];
  targets: Option[];
  amounts: Option[];
  periods: Option[];
  onLoaded: () => void;
}

export const IspBuyForm: FC<IspBuyFormProps> = ({
  countries,
  targets,
  amounts,
  periods,
  onLoaded,
}) => {
  const [country, setCountry] = useState<string | undefined>(undefined);
  const [amount, setAmount] = useState<string | undefined>(undefined);
  const [target, setTarget] = useState<string | undefined>(undefined);
  const [period, setPeriod] = useState<string | undefined>(undefined);
  const [price, setPrice] = useState<string | undefined>();

  const fetchPrice = async () => {
    if (!country || !amount || !period) return;
    const result = await Services.Product.getCalc(country, period, amount);
    if (!result) return;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const rub: string = fx(result.price).from("USD").to("RUB");

    setPrice(`${Math.ceil(parseFloat(rub))}`);

    onLoaded();
  };

  useEffect(() => {
    fetchPrice();
  }, [country, amount, period]);

  const countryChangeHandler = (value: string) => {
    setCountry(value);
  };

  const countryAmountHandler = (value: string) => {
    setAmount(value);
  };

  const targetChangeHandler = (value: string) => {
    setTarget(value);
  };

  const periodChangeHandler = (value: string) => {
    setPeriod(value);
  };

  return (
    <form action="">
      <h4 className="buy-item__subheader">СТРАНА</h4>
      <Select
        options={countries}
        value={country}
        onChange={countryChangeHandler}
        placeholder="Выбирите страну"
      />
      <h4 className="buy-item__subheader">Кол-во</h4>
      <Select
        options={amounts}
        value={amount}
        onChange={countryAmountHandler}
        placeholder="Укажите колличество"
      />
      <h4 className="buy-item__subheader">Цель использования</h4>
      <Select
        options={targets}
        value={target}
        onChange={targetChangeHandler}
        placeholder="Выбирите цель использования"
      />
      <h4 className="buy-item__subheader">Период</h4>
      <Select
        options={periods}
        value={period}
        onChange={periodChangeHandler}
        placeholder="Выбирите период"
      />

      <div className="buy-item__price">
        ЦЕНА
        <span>{price} ₽</span>
      </div>
      <a href="#" className="btn">
        купить
      </a>
    </form>
  );
};
