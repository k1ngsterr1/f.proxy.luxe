"use client";
import { FC, useEffect, useState } from "react";
import Select from "@/components/Select";
import { Option } from "@/interfaces/option.interface";
import { Services } from "@/services";

interface ResidentBuyFormProps {
  targets: Option[];
  amounts: Option[];
  tariffs: Option[];
  onLoaded: () => void;
}

export const ResidentBuyForm: FC<ResidentBuyFormProps> = ({
  amounts,
  targets,
  tariffs,
  onLoaded,
}) => {
  const [amount, setAmount] = useState<string | undefined>(undefined);
  const [target, setTarget] = useState<string | undefined>(undefined);
  const [tariff, setTariff] = useState<string | undefined>(undefined);
  const [price, setPrice] = useState<string | undefined>();

  const fetchPrice = async () => {
    if (!amount || !tariff) return;
    const result = await Services.Product.getCalcResident(amount, tariff);
    if (!result) return;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const rub: string = fx(result.price).from("USD").to("RUB");

    setPrice(`${Math.ceil(parseFloat(rub))}`);

    onLoaded();
  };

  useEffect(() => {
    fetchPrice();
  }, [tariff, amount]);

  const countryAmountHandler = (value: string) => {
    setAmount(value);
  };

  const targetChangeHandler = (value: string) => {
    setTarget(value);
  };

  const tariffChangeHandler = (value: string) => {
    setTariff(value);
  };

  return (
    <form action="">
      <h4 className="buy-item__subheader">Кол-во</h4>
      <Select
        options={amounts}
        value={amount}
        onChange={countryAmountHandler}
        placeholder="Укажите колличество"
      />
      <h4 className="buy-item__subheader">Тарифный план(Gb)</h4>
      <Select
        options={tariffs}
        value={tariff}
        onChange={tariffChangeHandler}
        placeholder="Выбирите тарифный план"
      />
      <h4 className="buy-item__subheader">Цель использования</h4>
      <Select
        options={targets}
        value={target}
        onChange={targetChangeHandler}
        placeholder="Выбирите цель использования"
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
