import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
// import { getCurrentUser } from "@/features/users/actions/actions";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { ManageAccount } from "./manage-account";
// import SignOut from "@/services/better-auth/components/sign-out";

export function UserNavigation() {
  // const { user } = await getCurrentUser({ allData: true });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-56">
        <DropdownMenuLabel className="p-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex gap-4">
              <div className="space-y-1">
                <p className="leading-none">
                  {/* {user?.name} */}
                  Test
                </p>
                <p className="text-sm font-light leading-none text-muted-foreground">
                  {/* {user?.email} */}
                  Test
                </p>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem asChild>
          <ManageAccount />
        </DropdownMenuItem> */}
        {/* <DropdownMenuItem asChild>
          <SignOut />
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
