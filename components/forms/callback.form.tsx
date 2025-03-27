"use client";

import { FC, FormEventHandler, useState } from "react";
import { Option } from "@/shared/interfaces/option.interface";
import Select from "@/components/Select";
import { useTranslations } from "next-intl";

const getOptions = (i18n: any) => [
  { id: "1", text: i18n("support.option1") },
  { id: "2", text: i18n("support.option2") },
];

export const CallbackForm: FC = () => {
  const i18n = useTranslations("forms.callback");
  const [technicalSupport, setTechnicalSupport] = useState<
    string | undefined
  >();
  const options = getOptions(i18n);

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
        placeholder={i18n("name.placeholder")}
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
        placeholder={i18n("support.placeholder")}
      />
      <textarea
        name="message"
        className="question-textarea"
        placeholder={i18n("message.placeholder")}
        required
      ></textarea>
      <button type="submit" className="question-btn btn-hover">
        {i18n("submit")}
      </button>
    </form>
  );
};
