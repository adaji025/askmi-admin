import { Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface PaymentCardProps {
  brand: "mastercard" | "visa"
  last4: string
  expiry: string
  isDefault?: boolean
}

export function PaymentCard({ brand, last4, expiry, isDefault }: PaymentCardProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-card border-[#E2E8F0]">
      <div className="flex items-center gap-4">
        <div className="w-12 h-8 flex items-center justify-center">
          {brand === "mastercard" ? (
            <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="9" cy="12" r="7" fill="#EB001B" fillOpacity="0.8" />
              <circle cx="15" cy="12" r="7" fill="#F79E1B" fillOpacity="0.8" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19.467 6H4.533C3.687 6 3 6.643 3 7.438v9.124C3 17.357 3.687 18 4.533 18h14.934c.846 0 1.533-.643 1.533-1.438V7.438C21 6.643 20.313 6 19.467 6z"
                fill="#1434CB"
              />
              <path
                d="M9.475 14.805l1.09-6.33h1.745l-1.09 6.33H9.475zm6.54-6.19c-.322-.119-.824-.247-1.44-.247-1.587 0-2.705.803-2.713 1.956-.01.85.8 1.325 1.41 1.608.628.29 0.838.475 0.835.733-.005.397-.502.578-.967.578-.646 0-.993-.093-1.523-.314l-.213-.097-.227 1.34c.38.167 1.08.312 1.805.32 1.688 0 2.785-.795 2.8-2.025.012-.675-.425-1.188-1.358-1.61-.565-.276-.913-.46-.91-.74.003-.243.285-.504.903-.504.51 0 .878.104 1.163.22l.14.064.232-1.288zm3.012-.14h-1.345c-.417 0-.73.116-.913.535l-2.585 5.795h1.835l.365-.967h2.245l.213.967h1.615l-1.43-6.33zm-2.083 3.555l.775-2.115.443 2.115h-1.218zm-11.23-3.555L4 13.953l-.16-.783c-.275-.9-.997-1.867-1.84-2.292V10.66h2.95l.495 2.59 1.825-4.635h1.91l-2.81 6.19H4.714l-1.68-7.575"
                fill="#F7B600"
              />
            </svg>
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">**** **** **** **** {last4}</span>
            {isDefault && (
              <Badge
                variant="secondary"
                className="bg-blue-50 text-blue-600 hover:bg-blue-50 font-medium text-[10px] px-1.5 h-5 border-none"
              >
                Default
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{expiry}</p>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )
}
