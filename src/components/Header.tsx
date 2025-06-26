"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SiInstagram,
  SiFacebook,
  SiWhatsapp,
  SiX,
} from "@icons-pack/react-simple-icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Toaster } from "./ui/sonner";
import { Copy, LogOut, Settings, Share, User, UserRound } from "lucide-react";
import { toast } from "sonner";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const Header = () => {
  const router = useRouter();
  const { globalUser, logout } = useAuth();

  const shareData = {
    url: encodeURIComponent(
      `https://albumifyv2.vercel.app/view-profile/${globalUser?.uid}`
    ),
    title: encodeURIComponent("Check out my ratings on Albumify! "),
    description: encodeURIComponent("Check out my profile!"),
  };

  const socialPlatforms = [
    {
      name: "X",
      icon: SiX,
      color: "hover:bg-blue-400",
      textColor: "hover:text-white",
      shareUrl: `https://twitter.com/intent/tweet?text=${shareData.title}&url=${shareData.url}`,
    },
    {
      name: "Facebook",
      icon: SiFacebook,
      color: "hover:bg-blue-600",
      textColor: "hover:text-white",
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${shareData.url}`,
    },
    {
      name: "WhatsApp",
      icon: SiWhatsapp,
      color: "hover:bg-green-500",
      textColor: "hover:text-white",
      shareUrl: `https://wa.me/?text=${shareData.title}%20${shareData.url}`,
    },
  ];

  const handleShare = (url: string) => {
    window.open(url, "_blank", "width=600,height=600");
  };

  const copyToClipboard = async () => {
    const url = `https://albumifyv2.vercel.app/view-profile/${globalUser.uid}`;
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch (err) {
      console.error("Failed to copy: ", err);
      return false;
    }
  };

  return (
    <>
      <Toaster
        position="top-center"
        richColors
      />
      <header className="flex flex-row justify-between m-4 ml-10 mt-6 mr-10 mb-10">
        <div className="flex flex-row">
          <h1
            className="text-white font-extrabold text-3xl cursor-pointer"
            onClick={() => router.push("/")}
          >
            albumify
          </h1>
          {/* <Link href="/overview">
            <Button
              variant="ghost"
              className="text-lg ml-4 mr-4 lg:ml-10"
            >
              Explore
            </Button>
          </Link> */}
        </div>

        <div className="flex flex-row gap-2">
          {!globalUser && (
            <>
              <Link href="/login">
                <Button
                  variant="secondary"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Login
                </Button>
              </Link>
            </>
          )}

          {globalUser && (
            <>
              {/* Share Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className="p-0 w-10 h-10 flex flex-row items-center justify-center mr-2"
                >
                  <Button
                    variant="ghost"
                    className="p-0 w-10 h-10 border-none bg-transparent hover:bg-transparent"
                  >
                    <Share className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {socialPlatforms.map((platform) => {
                    const IconComponent = platform.icon;
                    return (
                      <div key={platform.name}>
                        <div className="flex flex-row items-center gap-2 justify-center">
                          <Button
                            variant="ghost"
                            className="flex items-center justify-center w-full p-0 border-none bg-transparent"
                            onClick={() => handleShare(platform.shareUrl)}
                          >
                            <IconComponent className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={async () => {
                      const success = await copyToClipboard();
                      if (success) {
                        toast.success("Link copied to clipboard");
                      } else {
                        toast.error("Failed to copy link. Please try again.");
                      }
                    }}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Link
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="p-0 w-10 h-10 border-none bg-transparent hover:bg-transparent"
                  >
                    <UserRound className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-56"
                >
                  <DropdownMenuLabel>
                    <div className="flex flex-row items-center gap-2">
                      <UserRound className="h-6 w-6" />

                      <div className="flex flex-col">
                        <p className="text-sm font-medium">Profile</p>
                        <p className="text-xs text-gray-500 truncate">
                          {globalUser.email}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => router.push(`/profile/${globalUser.uid}`)}
                  >
                    <User className="mr-2 h-4 w-4" />
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-transparent">
                    <HoverCard
                      openDelay={0}
                      closeDelay={0}
                    >
                      <HoverCardTrigger className="flex flex-row items-center gap-2">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </HoverCardTrigger>
                      <HoverCardContent
                        side="left"
                        align="center"
                        className="bg-neutral-900"
                      >
                        <p>Coming Soon</p>
                      </HoverCardContent>
                    </HoverCard>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </header>
    </>
  );
};
export default Header;
