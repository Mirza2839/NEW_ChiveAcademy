import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Gateway = {
  id: string
  name: string
  description: string
  placeholder: string
  connected: boolean
}

const gateways: Gateway[] = [
  { id: "midtrans", name: "Midtrans", description: "Server Key", placeholder: "Mid-server-xxxxxxxxxxxxxxxx", connected: true },
  { id: "xendit", name: "Xendit", description: "Secret API Key", placeholder: "xnd_production_xxxxxxxxxxxx", connected: true },
  { id: "stripe", name: "Stripe", description: "Secret Key", placeholder: "sk_live_xxxxxxxxxxxxxxxxxxxx", connected: false },
]

export function PaymentGateway() {
  return (
    <Card className="gap-0 p-0">
      <div className="border-b border-border p-6">
        <h2 className="text-base font-semibold text-foreground">Payment Gateway</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Connect payment services to process course transactions securely.
        </p>
      </div>

      <div className="flex flex-col gap-6 p-6">
        {gateways.map((gateway) => (
          <GatewayField key={gateway.id} gateway={gateway} />
        ))}
      </div>
    </Card>
  )
}

function GatewayField({ gateway }: { gateway: Gateway }) {
  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState("")

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={gateway.id}>
          {gateway.name}{" "}
          <span className="font-normal text-muted-foreground">· {gateway.description}</span>
        </Label>
        <Badge
          variant="outline"
          className={cn(
            gateway.connected
              ? "border-transparent bg-[var(--chart-2)]/10 text-[var(--chart-2)]"
              : "text-muted-foreground",
          )}
        >
          {gateway.connected ? "Connected" : "Not connected"}
        </Badge>
      </div>
      <div className="relative">
        <Input
          id={gateway.id}
          type={visible ? "text" : "password"}
          placeholder={gateway.placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="pr-10"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide API key" : "Show API key"}
          className="absolute right-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </div>
  )
}
