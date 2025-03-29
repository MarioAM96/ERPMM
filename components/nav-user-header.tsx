"use client";
import { useEffect, useState } from "react";
import {
  IconCreditCard,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import CryptoJS from "crypto-js";

export function NavUser() {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    avatar: string;
  } | null>(null);

  useEffect(() => {
    const encryptedUserData = document.cookie
      .split("; ")
      .find((row) => row.startsWith("userData="))
      ?.split("=")[1];

    if (encryptedUserData) {
      const bytes = CryptoJS.AES.decrypt(encryptedUserData, "your-secret-key");
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      setUser(decryptedData);
    }
  }, []);

  const handleLogout = async () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) return;

    try {
      const response = await fetch("http://192.168.18.180:8000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/login";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <DropdownMenuContent 
      className="min-w-56 rounded-lg" 
      side="bottom" 
      align="end" 
      sideOffset={4}
    >
      <DropdownMenuLabel className="p-0 font-normal">
              {user ? (
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg grayscale">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">
                      {user.name
                        .split(" ") // Divide el nombre en palabras
                        .map((n) => n[0]) // Obtiene la primera letra de cada palabra
                        .join("") // Une las iniciales
                        .toUpperCase()}{" "}
                      {/* Asegura que estén en mayúsculas */}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="text-muted-foreground truncate text-xs">
                      {user.email}
                    </span>
                  </div>
                </div>
              ) : (
                <span>Loading...</span>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
      
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <IconUserCircle className="mr-2" />
          Account
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconCreditCard className="mr-2" />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconNotification className="mr-2" />
          Notifications
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleLogout}>
        <IconLogout className="mr-2" />
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}