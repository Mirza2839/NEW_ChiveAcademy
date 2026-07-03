import { useState } from "react"
import { Plus, Ticket, Users2, CalendarClock, Percent } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { coupons as initialCoupons, type Coupon } from "@/lib/data"
import { cn } from "@/lib/utils"

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

function isExpiringSoon(iso: string) {
  const diff = new Date(iso).getTime() - Date.now()
  return diff > 0 && diff < 1000 * 60 * 60 * 24 * 14
}

function isExpired(iso: string) {
  return new Date(iso).getTime() < Date.now()
}

export function CouponManagement() {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons)
  const [open, setOpen] = useState(false)

  const handleCreate = (coupon: Coupon) => {
    setCoupons((prev) => [coupon, ...prev])
    setOpen(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-0.5">
          <h2 className="text-lg font-semibold tracking-tight">
            Active Coupons
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage discount codes available to students.
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="size-4" />
          Create New Coupon
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {coupons.map((coupon) => (
          <CouponCard key={coupon.id} coupon={coupon} />
        ))}
      </div>

      <CreateCouponDialog
        open={open}
        onOpenChange={setOpen}
        onCreate={handleCreate}
      />
    </div>
  )
}

/* ------------------------- Coupon card ------------------------- */

function CouponCard({ coupon }: { coupon: Coupon }) {
  const expired = isExpired(coupon.expires)
  const soon = isExpiringSoon(coupon.expires)
  const usagePct = Math.round((coupon.used / coupon.quota) * 100)

  return (
    <Card className="gap-4">
      <CardHeader className="flex-row items-start justify-between gap-3 space-y-0">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground">
            <Ticket className="size-5" />
          </div>
          <div>
            <CardTitle className="font-mono tracking-tight">
              {coupon.code}
            </CardTitle>
            <CardDescription className="mt-0.5 flex items-center gap-1">
              <Percent className="size-3" />
              {coupon.discount}% discount
            </CardDescription>
          </div>
        </div>
        <Badge
          variant={expired ? "destructive" : soon ? "muted" : "success"}
        >
          {expired ? "Expired" : soon ? "Ending Soon" : "Active"}
        </Badge>
      </CardHeader>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Users2 className="size-3.5" />
            Quota usage
          </span>
          <span className="font-medium tabular-nums">
            {coupon.used} / {coupon.quota}
          </span>
        </div>
        <Progress value={usagePct} className="h-2" />
      </div>

      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <CalendarClock className="size-3.5" />
        Expires on
        <span
          className={cn(
            "font-medium",
            expired ? "text-destructive" : "text-foreground",
          )}
        >
          {formatDate(coupon.expires)}
        </span>
      </div>
    </Card>
  )
}

/* ------------------------- Create coupon dialog ------------------------- */

function CreateCouponDialog({
  open,
  onOpenChange,
  onCreate,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreate: (coupon: Coupon) => void
}) {
  const [code, setCode] = useState("")
  const [discount, setDiscount] = useState("")
  const [quota, setQuota] = useState("")
  const [expires, setExpires] = useState("")

  const reset = () => {
    setCode("")
    setDiscount("")
    setQuota("")
    setExpires("")
  }

  const close = () => {
    onOpenChange(false)
    reset()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreate({
      id: `C-${Date.now()}`,
      code: code.trim().toUpperCase(),
      discount: Number(discount),
      quota: Number(quota),
      used: 0,
      expires,
    })
    reset()
  }

  const valid =
    code.trim() !== "" &&
    Number(discount) > 0 &&
    Number(quota) > 0 &&
    expires !== ""

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent onClose={close}>
        <DialogHeader>
          <DialogTitle>Create New Coupon</DialogTitle>
          <DialogDescription>
            Set up a new discount code for your students.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="coupon-code">Coupon Code</Label>
            <Input
              id="coupon-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. SUMMER25"
              className="font-mono uppercase"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="coupon-discount">Discount (%)</Label>
              <Input
                id="coupon-discount"
                type="number"
                min={1}
                max={100}
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="25"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="coupon-quota">Quota</Label>
              <Input
                id="coupon-quota"
                type="number"
                min={1}
                value={quota}
                onChange={(e) => setQuota(e.target.value)}
                placeholder="500"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="coupon-expires">Expiration Date</Label>
            <Input
              id="coupon-expires"
              type="date"
              value={expires}
              onChange={(e) => setExpires(e.target.value)}
            />
          </div>

          <DialogFooter className="mt-2">
            <Button type="button" variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button type="submit" disabled={!valid}>
              Create Coupon
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
