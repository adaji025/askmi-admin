import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CheckCircle2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

const Security = () => {
  return (
    <div className="space-y-6 bg-white p-4 rounded-md">
      {/* Authentication Section */}
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-foreground">Authentication</h2>
        </div>

        <Table>
          <TableBody>
            {/* Password */}
            <TableRow className="border-b border-[#E2E8F0]">
              <TableCell className="py-6 w-1/3">
                <span className="text-sm font-medium text-muted-foreground">
                  Password
                </span>
              </TableCell>
              <TableCell className="py-6 w-1/3">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-foreground">
                    •••••••••••
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5">
                    Last changed 3 months ago
                  </span>
                </div>
              </TableCell>
              <TableCell className="py-6 text-right w-1/3">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-4 text-xs font-medium bg-white border-border hover:bg-muted text-foreground"
                >
                  Change
                </Button>
              </TableCell>
            </TableRow>

            {/* Two-factor authentication */}
            <TableRow className="border-b-0">
              <TableCell className="py-6 w-1/3">
                <span className="text-sm font-medium text-muted-foreground">
                  Two-factor authentication
                </span>
              </TableCell>
              <TableCell className="py-6 w-1/3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-foreground">
                    Enabled
                  </span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </div>
                <span className="text-xs text-muted-foreground mt-0.5">
                  Extra security to your account with SMS
                </span>
              </TableCell>
              <TableCell className="py-6 text-right w-1/3">
                <Switch
                  defaultChecked
                  className="data-[state=checked]:bg-[#2563EB]"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Privacy & Data Section */}
      <div className="space-y-6 pt-8">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-foreground">Privacy & Data</h2>
        </div>

        <Table>
          <TableBody>
            {/* Security alerts */}
            <TableRow className="border-b border-[#E2E8F0]">
              <TableCell className="py-6 w-1/3">
                <span className="text-sm font-medium text-muted-foreground">
                  Security alerts
                </span>
              </TableCell>
              <TableCell className="py-6 w-1/3">
                <span className="text-xs text-muted-foreground">
                  Get notified about suspicious login attempts and security
                  issues
                </span>
              </TableCell>
              <TableCell className="py-6 text-right w-1/3">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-4 text-xs font-medium bg-white border-border hover:bg-muted text-foreground"
                >
                  Change
                </Button>
              </TableCell>
            </TableRow>

            {/* Auto sign-out */}
            <TableRow className="border-b border-[#E2E8F0]">
              <TableCell className="py-6 w-1/3">
                <span className="text-sm font-medium text-muted-foreground">
                  Auto sign-out
                </span>
              </TableCell>
              <TableCell className="py-6 w-1/3">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-foreground">
                    After 1 hour of inactivity
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5">
                    Automatically sign out for security
                  </span>
                </div>
              </TableCell>
              <TableCell className="py-6 text-right w-1/3">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-4 text-xs font-medium bg-white border-border hover:bg-muted text-foreground"
                >
                  Change
                </Button>
              </TableCell>
            </TableRow>

            {/* Delete account */}
            <TableRow className="border-b-0">
              <TableCell className="py-6 w-1/3">
                <span className="text-sm font-medium text-muted-foreground">
                  Delete account
                </span>
              </TableCell>
              <TableCell className="py-6 w-1/3">
                <span className="text-xs text-muted-foreground">
                  Permanently delete your account and all associated data
                </span>
              </TableCell>
              <TableCell className="py-6 text-right w-1/3">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-4 text-xs font-medium bg-white border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  Delete account
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Security;
