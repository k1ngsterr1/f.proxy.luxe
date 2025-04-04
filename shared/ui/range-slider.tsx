"use client"

import { type ChangeEvent } from "react"
import "../styles/range-slider.css"

interface IPureRangeSlider {
    value: number
    ref: any
    max: number
    setValue: (value: number) => void
}

export function PureRangeSlider({ value, ref, max, setValue }: IPureRangeSlider) {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = Number.parseFloat(e.target.value)
        setValue(newValue)
    }

    return (
        <div className="space-y-2 w-full max-w-md">
            <div className="relative w-full h-16">
                <input
                    ref={ref}
                    type="range"
                    min={0}
                    max={max}
                    step={1}
                    value={value}
                    onChange={handleChange}
                    className="pure-range-slider w-full mt-4"
                />
            </div>
        </div>
    )
}