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
import CryptoJS from "crypto-js";
import Cookies from 'js-cookie';
import { apiService } from "@/services/apiService"; // Importa el servicio API

export function NavUser() {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    avatar: string;
  } | null>(null);

  useEffect(() => {
    const encryptedUserData = Cookies.get('userData');

    if (encryptedUserData) {
      const bytes = CryptoJS.AES.decrypt(encryptedUserData, "your-secret-key");
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      setUser(decryptedData);
    }
  }, []);

  const handleLogout = async () => {
    const token = Cookies.get('token');

    if (!token) return;

    try {
      // Usa el método de logout del apiService
      await apiService.logout();

      // Eliminar cookies
      Cookies.remove('token');
      Cookies.remove('userData');

      // Redirigir a la página de login
      window.location.href = "/login";
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
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
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