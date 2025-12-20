import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from './input';
import { Label } from './label';
import { Textarea } from './textarea';
import { cn } from '@/lib/utils';

export function FormField({
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    required = false,
    icon: Icon,
    className,
    multiline = false,
    rows = 3,
    ...props
}) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
        <div className="space-y-2">
            {label && (
                <Label className="text-sm font-semibold text-slate-600">
                    {label} {required && <span className="text-danger">*</span>}
                </Label>
            )}

            <div className="relative">
                {/* Icon on the right (RTL) */}
                {Icon && (
                    <Icon
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                        size={18}
                    />
                )}

                {/* Input or Textarea */}
                {multiline ? (
                    <Textarea
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        required={required}
                        rows={rows}
                        className={cn(
                            Icon && 'pr-10',
                            className
                        )}
                        {...props}
                    />
                ) : (
                    <Input
                        type={inputType}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        required={required}
                        className={cn(
                            'h-12',
                            Icon && 'pr-10',
                            isPassword && 'pl-10',
                            className
                        )}
                        {...props}
                    />
                )}

                {/* Password Toggle */}
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                        tabIndex={-1}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>
        </div>
    );
}

export function FormSelect({
    label,
    value,
    onChange,
    options = [],
    required = false,
    placeholder,
    className,
    ...props
}) {
    return (
        <div className="space-y-2">
            {label && (
                <Label className="text-sm font-semibold text-slate-600">
                    {label} {required && <span className="text-danger">*</span>}
                </Label>
            )}

            <select
                value={value}
                onChange={onChange}
                required={required}
                className={cn(
                    'w-full h-12 px-3 pl-10 rounded-lg border border-slate-300 text-base text-slate-700',
                    'focus:border-primary focus:ring-2 focus:ring-primary/20',
                    'outline-none transition-all bg-white appearance-none',
                    'bg-[url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2394a3b8\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")]',
                    'bg-[length:20px] bg-[left_12px_center] bg-no-repeat',
                    className
                )}
                {...props}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export function FormUpload({
    label,
    required = false,
    onUpload,
    accept,
    className,
}) {
    return (
        <div className="space-y-2">
            {label && (
                <Label className="text-sm font-semibold text-slate-600">
                    {label} {required && <span className="text-danger">*</span>}
                </Label>
            )}

            <div
                className={cn(
                    'border-2 border-dashed border-slate-200 rounded-lg p-6',
                    'text-center cursor-pointer hover:border-slate-300',
                    'transition-colors group',
                    className
                )}
                onClick={onUpload}
            >
                <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                        <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-700">اضغط لرفع الملف</p>
                        <p className="text-xs text-slate-500 mt-1">أو اسحب الملف هنا</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
