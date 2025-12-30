import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

// PhoneInput component
interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  countryCode: string;
  onCountryCodeChange: (code: string) => void;
  placeholder?: string;
  className?: string;
}

export interface CountryCode {
  code: string;
  flag: string;
  name: string;
}

const countryCodes: CountryCode[] = [
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+972", flag: "🇮🇱", name: "Israel" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
];

export function PhoneInput({
  value,
  onChange,
  countryCode,
  onCountryCodeChange,
  placeholder = "123 - 456 - 789",
  className,
}: PhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCountry = countryCodes.find((c) => c.code === countryCode);

  return (
    <div
      className={cn(
        "flex items-center rounded-md border border-input bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        className
      )}
    >
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex items-center gap-2 px-3 h-full border-r border-input hover:bg-muted/50 transition-colors"
          >
            <span className="text-base">{selectedCountry?.flag}</span>
            <span className="text-sm font-medium whitespace-nowrap">{countryCode}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-2" align="start">
          <div className="max-h-60 overflow-y-auto">
            {countryCodes.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => {
                  onCountryCodeChange(country.code);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md text-left hover:bg-muted transition-colors",
                  countryCode === country.code && "bg-muted"
                )}
              >
                <span className="text-base">{country.flag}</span>
                <div className="flex gap-2 items-center">
                  <span className="text-sm font-medium">{country.code}</span>
                  <span className="text-xs text-muted-foreground">
                    {country.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <Input
        type="tel"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-full"
      />
    </div>
  );
}
