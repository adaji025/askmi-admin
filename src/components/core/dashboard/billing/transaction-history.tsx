import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Transaction {
  id: string
  campaign: string
  expectedVotes: string
  votesGotten: string
  amount: string
  status: "Paid" | "Pending"
  date: string
}

const transactions: Transaction[] = [
  {
    id: "1",
    campaign: "Product feedback survey",
    expectedVotes: "50,000",
    votesGotten: "48,854",
    amount: "$120",
    status: "Paid",
    date: "Nov 2, 2025",
  },
  {
    id: "2",
    campaign: "Product feedback survey",
    expectedVotes: "50,000",
    votesGotten: "48,854",
    amount: "$120",
    status: "Paid",
    date: "Nov 2, 2025",
  },
  {
    id: "3",
    campaign: "Product feedback survey",
    expectedVotes: "50,000",
    votesGotten: "48,854",
    amount: "$120",
    status: "Pending",
    date: "Nov 2, 2025",
  },
  {
    id: "4",
    campaign: "Product feedback survey",
    expectedVotes: "50,000",
    votesGotten: "48,854",
    amount: "$120",
    status: "Pending",
    date: "Nov 2, 2025",
  },
  {
    id: "5",
    campaign: "Product feedback survey",
    expectedVotes: "50,000",
    votesGotten: "48,854",
    amount: "$120",
    status: "Pending",
    date: "Nov 2, 2025",
  },
  {
    id: "6",
    campaign: "Product feedback survey",
    expectedVotes: "50,000",
    votesGotten: "48,854",
    amount: "$120",
    status: "Paid",
    date: "Nov 2, 2025",
  },
]

export function TransactionHistory() {
  return (
    <div className="w-full space-y-4 bg-white rounded-md">
      <h2 className="font-bold text-foreground">Transaction History</h2>
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30 border-none">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Campaign
              </TableHead>
              <TableHead className="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Expected Votes
              </TableHead>
              <TableHead className="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Votes Gotten
              </TableHead>
              <TableHead className="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Amount
              </TableHead>
              <TableHead className="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id} className="hover:bg-muted/20 border-border">
                <TableCell className="py-5 px-6 font-bold text-foreground">{transaction.campaign}</TableCell>
                <TableCell className="py-5 px-6 text-muted-foreground text-center">
                  {transaction.expectedVotes}
                </TableCell>
                <TableCell className="py-5 px-6 text-muted-foreground text-center">{transaction.votesGotten}</TableCell>
                <TableCell className="py-5 px-6 font-bold text-foreground text-center">{transaction.amount}</TableCell>
                <TableCell className="py-5 px-6 text-center">
                  <Badge
                    variant="outline"
                    className={cn(
                      "px-3 py-1 rounded-md text-[11px] font-medium border",
                      transaction.status === "Paid"
                        ? "bg-green-50 text-green-600 border-green-100 hover:bg-green-50"
                        : "bg-orange-50 text-orange-400 border-orange-100 hover:bg-orange-50",
                    )}
                  >
                    {transaction.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-5 px-6 text-muted-foreground text-right">{transaction.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
