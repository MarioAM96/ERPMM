"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NavUser } from "@/components/nav-user-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "../components/theme-toggle";
import { usePathname } from "next/navigation";

// Interfaz para definir las props del componente
interface SiteHeaderProps {
  title?: string; // Título opcional
}

export function SiteHeader({ title }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Mapeo de rutas a títulos
  const pageTitle =
    {
      "/": "Inicio",
      "/inventory": "Inventario",
      "/dashboard": "Dashboard",
      "/team": "Equipo",
      // Agrega más rutas según necesites
    }[pathname] ||
    title ||
    "Página";

  return (
    <header
      className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear 
      group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)"
    >
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{pageTitle}</h1>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            {isOpen && (
              <DropdownMenuContent
                align="end"
                className="z-50 min-w-[200px]"
                onCloseAutoFocus={(e) => e.preventDefault()}
                onInteractOutside={() => setIsOpen(false)}
              >
                <NavUser />
              </DropdownMenuContent>
            )}
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
