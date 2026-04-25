import { Button } from "@/components/ui/button"
import { Zap, Code, GitBranch, Sparkles } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "AI Code Completion",
    description: "Intelligent suggestions powered by advanced AI to write code faster and with fewer errors.",
    iconBg: "bg-[#D87757]/10",
    iconColor: "text-[#D87757]",
  },
  {
    icon: Zap,
    title: "Instant Compilation",
    description: "Compile and run your code in real-time with support for 20+ programming languages.",
    iconBg: "bg-yellow-500/10",
    iconColor: "text-yellow-600 dark:text-yellow-500",
  },
  {
    icon: GitBranch,
    title: "Version Control",
    description: "Built-in Git integration for seamless version control and collaboration with your team.",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-600 dark:text-green-500",
  },
  {
    icon: Code,
    title: "Live Collaboration",
    description: "Code together in real-time with your team members, anywhere in the world.",
    iconBg: "bg-red-500/10",
    iconColor: "text-red-600 dark:text-red-500",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="container py-20 md:py-32">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div className="space-y-6 lg:sticky lg:top-24">
          <div className="inline-block">
            <span className="text-sm font-semibold tracking-wider text-accent uppercase">Our Best Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            Maximize Your Coding Potential with Aura
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Leverage cutting-edge technology and intelligent features to streamline your development workflow and ship
            faster.
          </p>
          <div className="pt-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Learn more
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-all duration-300"
            >
              <div className="flex gap-4">
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-lg ${feature.iconBg} flex items-center justify-center`}
                >
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
