"use client";

import {FC, useEffect, useRef} from 'react';
import {Option} from "@/interfaces/option.interface";

interface SelectProps {
    options: Option[];
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;

}

const Select: FC<SelectProps> = ({options, value, onChange, placeholder}) => {
    const selectRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        onChange(options[0].id)
    }, []);

    useEffect(() => {
        if (!selectRef.current) return;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const $select = window.jQuery(selectRef.current);

        $select.select2({
            options: options,
            minimumResultsForSearch: -1,
        });

        if (value !== undefined && value !== null) {
            $select.val(value).trigger('change');
        }

        $select.on('change', () => {
            const newValue = $select.val();
            if (onChange) {
                onChange(newValue)
            }
        });

        return () => {
            $select.off('change');
            $select.select2('destroy');
        };
    }, [onChange, placeholder, value]);

    return (
        <select
            ref={selectRef}
            className="buy-item__select"
        >
            {options.map((item, index) => {
                return <option key={index} value={item.id}>{item.text}</option>
            })}
        </select>
    );
};

export default Select;