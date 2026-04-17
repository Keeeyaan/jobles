import { ThemeToggle } from "../theme-toggle";
import { UserNavigation } from "../user-navigation";

export function Topbar() {
  return (
    <header className="flex items-center justify-between gap-3 overflow-x-auto py-3 pl-2 pr-4 md:pl-3.5 md:pr-5 border-b">
      <div className="w-full flex items-center justify-between">
        <span></span>
        <nav className="flex items-center gap-2">
          <ThemeToggle />
          <UserNavigation />
        </nav>
      </div>
    </header>
  );
}
