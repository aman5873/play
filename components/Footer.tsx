"use client";

import React, { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Twitter, Instagram, Mail, Phone } from "lucide-react";
import { DiscordIcon } from "@/app/icons";
import { useTranslation } from "react-i18next";

import { AndroidIcon, IosIcon } from "@/app/icons";

export const iconMap: Record<string, React.ElementType> = {
  twitter: Twitter,
  instagram: Instagram,

  discord: DiscordIcon,
  email: Mail,
  phone: Phone,
  iOS: IosIcon,
  Android: AndroidIcon,
  ios: IosIcon,
  android: AndroidIcon,
};

const links = [
  { key: "home", href: "/", active: true },
  { key: "tournaments", href: "/tournaments", active: true },
  { key: "games", href: "/games", active: true },
  { key: "social", href: "/social", active: true },
  { key: "levels", href: "/levels", active: false },
];

const resources = [
  { key: "support", href: "/", active: true },
  { key: "faqs", href: "/", active: true },
  { key: "rules", href: "/", active: true },
  { key: "community", href: "/", active: true },
];

const contact = [
  { key: "email", icon: "", value: "info@playhub.com" },
  { key: "phone", icon: "", value: "+1 (555) 123-4567" },
  { key: "twitter", icon: "twitter", value: "https://x.com/" },
  { key: "instagram", icon: "instagram", value: "https://www.instagram.com/" },
  { key: "discord", icon: "discord", value: "https://discord.com/" },
];

const FooterColumn = memo(
  ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div>
      <h4 className="font-semibold mb-3 text-[var(--textTwo)] text-lg">
        {title}
      </h4>
      <ul className="space-y-1 text-[var(--textTwo)] text-sm">{children}</ul>
    </div>
  )
);
FooterColumn.displayName = "FooterColumn";

const ContactItem = memo(
  ({ icon, value }: { icon?: string; value: string }) => {
    if (icon) {
      const Icon = iconMap[icon];
      return (
        <li>
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full border mx-1"
            style={{
              borderColor: "var(--borderThree)",
              color: "var(--textTwo)",
              transition: "all 0.2s ease",
            }}
          >
            <Icon size={20} />
          </a>
        </li>
      );
    }

    return (
      <li>
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-[var(--textTwo)] text-sm"
        >
          {value}
        </a>
      </li>
    );
  }
);
ContactItem.displayName = "ContactItem";

export default function Footer() {
  const { t: tFooter } = useTranslation("footer");

  const socialLinks = contact.filter((c) =>
    ["twitter", "instagram", "discord"].includes(c.icon ?? "")
  );
  const otherContacts = contact.filter(
    (c) => !["twitter", "instagram", "discord"].includes(c.icon ?? "")
  );

  return (
    <div className="pt-4 px-4 mt-auto">
      <footer className="w-full text-center p-8  gradient-one text-[var(--textTwo)]  rounded-lg border-t border-[var(--borderThree)]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-left">
          {/* Logo + Tagline */}
          <div className="flex flex-col items-start max-w-[200px]">
            <Link href="/" className="flex items-center justify-center mb-4">
              <Image
                src="/logo.png"
                alt="Brand Logo"
                width={86}
                height={50}
                className="rounded-md"
                priority
              />
            </Link>
            <p className="text-[var(--textTwo)] text-sm md:text-base">
              {tFooter("tagline")}
            </p>
          </div>

          {/* Links */}
          <FooterColumn title={tFooter("links.title")}>
            {links.map((link) => (
              <li key={link.key} className={link.active ? "" : "opacity-50"}>
                <a
                  href={link.href}
                  className="hover:underline flex items-center gap-1 w-fit"
                >
                  {tFooter(`links.${link.key}`)}
                </a>
              </li>
            ))}
          </FooterColumn>

          {/* Resources */}
          <FooterColumn title={tFooter("resources.title")}>
            {resources.map((res) => (
              <li key={res.key} className={res.active ? "" : "opacity-50"}>
                <a href={res.href} className="hover:underline">
                  {tFooter(`resources.${res.key}`)}
                </a>
              </li>
            ))}
          </FooterColumn>

          {/* Contact */}
          <FooterColumn title={tFooter("contact.title")}>
            <ul className="mb-2 space-y-1">
              {otherContacts.map((item) => (
                <ContactItem key={item.key} value={item.value} />
              ))}
            </ul>

            {/* Social icons row */}
            <ul className="flex items-center mt-2">
              {socialLinks.map((item) => (
                <ContactItem
                  key={item.key}
                  icon={item.icon}
                  value={item.value}
                />
              ))}
            </ul>
          </FooterColumn>
        </div>
      </footer>
    </div>
  );
}
