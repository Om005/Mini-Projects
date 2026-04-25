import { Button } from "@/components/ui/button"
import { CodeTypingAnimation } from "./code-typing-animation"
import { Play, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="container p-20 md:py-32">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">AI-Powered IDE</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
            Code Faster, <span className="text-accent">Build Better</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
            Experience the next generation of online coding with Aura. Write, compile, and deploy your code seamlessly
            with intelligent auto-completion and real-time collaboration.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Start 7 Day Free Trial
              <Play className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>

          <div className="flex items-center gap-8 pt-4">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-background" />
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-background" />
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-400 border-2 border-background" />
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-teal-400 border-2 border-background" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★★★★★</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Trusted by 10,000+ developers</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-accent/5 blur-3xl rounded-full" />
          <div className="relative">
            <CodeTypingAnimation />
          </div>
        </div>
      </div>
    </section>
  )
}
