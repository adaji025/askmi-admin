import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PaymentCard } from "./payment-card"

export function BillingSettings() {
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 p-2 sm:p-4">
      {/* Payment Methods Section */}
      <section className="space-y-6 bg-white rounded-md">
        <h2 className="text-xl font-bold tracking-tight">Payment Methods</h2>
        <div className="space-y-4">
          <PaymentCard brand="mastercard" last4="4242" expiry="12/26" isDefault />
          <PaymentCard brand="visa" last4="8888" expiry="12/26" />
          <Button
            variant="outline"
            className="w-full h-16 rounded-xl border-dashed border-2 flex items-center justify-center gap-2 bg-blue-50/30 border-blue-100 hover:bg-blue-50/50 hover:border-blue-200 text-blue-600 font-semibold"
          >
            <div className="bg-blue-600 rounded-full p-0.5">
              <Plus className="w-3 h-3 text-white" />
            </div>
            Add new payment method
          </Button>
        </div>
      </section>

      {/* Billing Information Section */}
      <section className="space-y-6 bg-white rounded-md p-2 sm:p-4">
        <h2 className="text-xl font-bold tracking-tight">Billing Information</h2>
        <div className="space-y-0">
          <div className="flex items-center justify-between py-5 border-b first:pt-0">
            <span className="text-sm font-medium text-foreground">Email</span>
            <span className="text-sm font-medium">myemail@example.com</span>
          </div>
          <div className="flex items-center justify-between py-5 border-b">
            <span className="text-sm font-medium text-foreground">Address</span>
            <span className="text-sm font-medium">1234 Tech Street, London, UK</span>
          </div>
          <div className="flex items-center justify-between py-5 border-b">
            <span className="text-sm font-medium text-foreground">Postal code</span>
            <span className="text-sm font-medium">122345</span>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full h-16 rounded-xl border-blue-100 bg-white hover:bg-blue-50/50 text-blue-600 font-semibold mt-4"
        >
          Edit information
        </Button>
      </section>
    </div>
  )
}
