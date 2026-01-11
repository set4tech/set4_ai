import Image from "next/image";

export default function TrustedBy() {
  const partners = [
    { name: "Cambridge", logo: "/cambridge-logo.png" },
    { name: "Duke", logo: "/duke-logo.png" },
    { name: "Oxford", logo: "/oxford-logo.svg" },
    { name: "Partner", logo: "/partner-logo.png" },
  ];

  return (
    <section className="py-8 px-6 bg-secondary/30 border-y border-border/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <h3 className="typography-body text-muted-foreground whitespace-nowrap">
            Trusted By
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 flex-1">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="relative h-20 w-32 flex items-center justify-center"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
