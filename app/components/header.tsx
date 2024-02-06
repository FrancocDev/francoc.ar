import ColorModeSwitcher from "@/app/components/ColorModeSwitch";
import Link from "next/link";
import LanguageSwitch from "./LanguageSwitch";

type Props = {colorMode: "dark" | "light", language: "es" | "en"};

export default function Header({colorMode, language}: Props) {
  return (
    <header className="w-full print:hidden px-4 items-center justify-between py-4 flex sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 mb-24">
    <h1 className="font-medium mr-auto text-lg">Franco Carrara</h1>
    
    <div className="flex gap-8">
      <LanguageSwitch language={language}/>
      <ColorModeSwitcher colorMode={colorMode} />
    </div>
  </header>
  );
}
