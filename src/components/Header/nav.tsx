"use client";
"@/components/ui/sheet";
import { navigationItems } from "@/utils/navigationLinks";
import ScrollLink from "../SmoothLink";

export function NavigationBar() {
  return (
    <nav className="w-full">
      <div className="flex h-16 items-center justify-center bg-gradient-to-r from-[#650C0C] to-red">
        <div className="flex items-center gap-3 space-x-6">
          {navigationItems.map((item) => (
            <ScrollLink
              key={item.name}
              href={item.href}
              className=" text-lg xl:text-2xl font-medium transition-colors hover:text-primary"
            >
              {item.name}
            </ScrollLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

// Keep the old export for backward compatibility
export function NavigationSidebar() {
  return <NavigationBar />;
}
