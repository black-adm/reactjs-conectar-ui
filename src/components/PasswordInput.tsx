"use client"

import type React from "react"

import { EyeClosedIcon, EyeIcon } from "@phosphor-icons/react"
import { useState } from "react"
import { twMerge } from "../lib/utils"
import { Button } from "./Button"
import { Input } from "./Input"

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export function PasswordInput({ className, error, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <Input
        {...props}
        type={showPassword ? "text" : "password"}
        className={twMerge(
          "pr-10",
          error && "border-red-500 focus-visible:ring-red-500",
          className
        )}
      />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full rounded-full text-gray-light hover:bg-transparent hover:text-green-main"
        onClick={() => setShowPassword(!showPassword)}
        tabIndex={-1}
      >
        {showPassword ? <EyeClosedIcon className="size-5" /> : <EyeIcon className="size-5" />}
        <span className="sr-only">{showPassword ? "Ocultar senha" : "Mostrar senha"}</span>
      </Button>
    </div>
  )
}
