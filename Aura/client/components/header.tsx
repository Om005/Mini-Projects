"use client"

import { Moon, Sun, Code2, Bell, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "./theme-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/store/store"
import { logoutUser } from "@/store/auth.store"
import { toast } from "sonner"

import Link from "next/link"
import { clsx } from "clsx"


export function Header() {
  const { theme, setTheme } = useTheme()
  const dispatch = useDispatch();
  const { isAuthenticated, name, email } = useSelector((state: RootState) => state.auth);

  const handleLogout = async() => {
    console.log("Logout clicked")
    // Add your logout logic here
    const toastId = toast.loading("Logging out...");
    try {
      const response = await dispatch(logoutUser());
      console.log("Logout response:", response.payload);
      const payload = response.payload as { success: boolean; message: string };
      if (payload.success) {
        toast.success("Logged out successfully", { id: toastId });
      } else {
        toast.error(`Logout failed: ${payload.message}`, { id: toastId });
      }
    } catch (error) {
      toast.error("An error occurred during logout", { id: toastId });
    }
  }

  const handleMyAccount = () => {
    console.log("My Account clicked")
    // Add your navigation logic here
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground">
            <Code2 className="h-5 w-5 text-background" />
          </div>
          <span className="text-xl font-semibold">Aura</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Home
          </a>
          <a
            href="#features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Docs
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent" />
            <span className="sr-only">Notifications</span>
          </Button>

          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>


          {isAuthenticated ? <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3 h-auto py-2 px-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <User className="h-5 w-5" />
                </div>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-semibold">{name}</span>
                  <span className="text-xs text-muted-foreground">{email}</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center gap-3 p-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <User className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">{name}</span>
                  <span className="text-xs text-muted-foreground">{email}</span>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleMyAccount}>
                <User className="h-4 w-4" />
                My Account
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Logout  
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>: 
          <div className="flex gap-2">

          <Button asChild className="bg-transparent hover:bg-accent/90 text-accent-foreground">
            <Link href="/signin" className={clsx(
    theme !== "dark" && "text-orange-700 hover:text-white"
  )}> Sign In</Link>
            </Button>
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
          }
        </div>
      </div>
    </header>
  )
}
