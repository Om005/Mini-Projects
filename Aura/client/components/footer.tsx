import { Github, Twitter, Youtube, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground">
                <Code2 className="h-5 w-5 text-background" />
              </div>
              <span className="text-xl font-semibold">Aura</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              An open-source online IDE with powerful features to craft, customize, and ship code faster.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Changelog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Docs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Subscribe to newsletter</h3>
            <div className="flex gap-2">
              <Input type="email" placeholder="Your email..." className="bg-background" />
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground flex-shrink-0">→</Button>
            </div>
            <div className="flex flex-wrap gap-3 mt-6">
              <img src="/product-hunt-logo.png" alt="Product Hunt" className="h-6 opacity-60" />
              <img src="/y-combinator-logo.png" alt="Y Combinator" className="h-6 opacity-60" />
              <img src="/techcrunch-logo.png" alt="TechCrunch" className="h-6 opacity-60" />
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">©2025 Aura, Made with ❤️ for developers.</p>
        </div>
      </div>
    </footer>
  )
}
