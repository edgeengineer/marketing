import { Package } from 'lucide-react';

import { Meteors } from '@/components/magicui/meteors';

export function ProfessionalServicesPackages() {
  return (
    <>
      {/* Packages Section */}
      <section className="container">
        <div className="bordered-div-padding relative border border-t-0">
          <div className="absolute top-0 right-full -mt-0.25 hidden h-[calc(100%+2px)] w-[50vw] overflow-hidden border-y md:block">
            <Meteors
              number={1000}
              angle={65}
              maxDuration={20}
              minDuration={5}
              className="opacity-10 [&>div]:opacity-10"
            />
          </div>
          <div className="space-y-6 md:space-y-8 lg:space-y-10">
            <h2 className="text-muted-foreground flex items-center gap-2 text-sm leading-snug font-medium md:text-base">
              <Package className="size-5" />
              Packages
            </h2>

            <div className="space-y-3 text-sm md:text-base">
              <p className="text-muted-foreground leading-relaxed">
                <span className="text-foreground font-medium">QuickStart:</span> Discovery + pilot on one site or system.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <span className="text-foreground font-medium">Production:</span> Multi‑site deployment with governance, SSO, and reliability SLAs.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <span className="text-foreground font-medium">Managed:</span> We run CIC for you—monitoring, updates, dashboards, and on‑call.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contributors Section - Commented out for now */}
      {/* <section className="container">
        <div className="bordered-div-padding border border-t-0">
          <div className="space-y-6 md:space-y-8 lg:space-y-10">
            <h2 className="text-muted-foreground flex items-center gap-2 text-sm leading-snug font-medium md:text-base">
              <HeartHandshake className="size-5" />
              Contributors
            </h2>

            <div className="grid grid-cols-2 gap-6 mask-b-from-60% mask-b-to-100% md:grid-cols-3 md:gap-8 md:mask-b-to-95% lg:grid-cols-5">
              {contributors.map((contributor) => (
                <Link
                  key={contributor.username}
                  href={contributor.url}
                  className="group flex flex-col gap-1"
                  target="_blank"
                >
                  <Avatar className="size-6 md:size-8">
                    <AvatarImage
                      src={contributor.avatar}
                      alt={contributor.username}
                    />
                    <AvatarFallback>
                      {contributor.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-muted-foreground text-sm md:text-base">
                    {contributor.isLink ? (
                      <p className="text-secondary font-medium">
                        {contributor.linkText}
                      </p>
                    ) : (
                      <p className="">{contributor.commits} commits</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}
