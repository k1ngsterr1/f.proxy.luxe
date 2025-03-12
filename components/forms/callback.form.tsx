"use client";

import { FC, FormEventHandler, useState } from "react";
import { Option } from "@/interfaces/option.interface";
import Select from "@/components/Select";

const options: Option[] = [
  { id: "1", text: "Тех. поддержка1" },
  { id: "2", text: "Тех. поддержка2" },
];

export const CallbackForm: FC = () => {
  const [technicalSupport, setTechnicalSupport] = useState<
    string | undefined
  >();

  const technicalSupportOnChange = (value: string) => {
    setTechnicalSupport(value);
  };

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmitHandler} className="question-form">
      <input
        name="name"
        type="text"
        className="question-input"
        placeholder="Имя"
        required
      />
      <input
        name="email"
        type="text"
        className="question-input"
        placeholder="E-mail"
        required
      />
      <Select
        options={options}
        onChange={technicalSupportOnChange}
        placeholder="Выберите тех. поддержку"
      />
      <textarea
        name="message"
        className="question-textarea"
        placeholder="Сообщение"
        required
      ></textarea>
      <button type="submit" className="question-btn btn-hover">
        Отправить
      </button>
    </form>
  );
};
