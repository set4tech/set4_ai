export default function SocialProof() {
  const testimonial = {
    quote: "set4 caught critical accessibility issues that would have delayed our project by weeks. The AI review is remarkably thorough.",
    author: "Sarah Chen",
    role: "Principal Architect",
    company: "Studio Partners",
    metric: {
      value: "12 days",
      label: "Average time saved per project"
    }
  };

  return (
    <section className="py-12 px-6 bg-background border-y border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Testimonial */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="text-primary text-5xl font-bold leading-none">&ldquo;</div>
              <blockquote className="text-display-small text-foreground">
                {testimonial.quote}
              </blockquote>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-semibold text-base">
                  {testimonial.author.charAt(0)}
                </span>
              </div>
              <div>
                <div className="typography-body font-medium text-foreground">
                  {testimonial.author}
                </div>
                <div className="typography-small text-muted-foreground">
                  {testimonial.role}, {testimonial.company}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Metric */}
          <div className="border-l border-border/50 pl-12 py-4">
            <div className="space-y-3">
              <div className="text-5xl font-serif font-bold text-primary">
                {testimonial.metric.value}
              </div>
              <div className="typography-subheadline text-foreground">
                {testimonial.metric.label}
              </div>
              <div className="pt-4 border-t border-border/30">
                <p className="typography-body text-muted-foreground leading-snug">
                  Based on average review and resubmission timelines for commercial projects
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
