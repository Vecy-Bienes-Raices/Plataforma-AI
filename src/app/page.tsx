import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, Lock } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden">

      {/* Background Ambience has effectively been set in globals.css, 
          but we can add some floating elements if needed */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[20%] w-64 h-64 bg-brand-gold/20 rounded-full blur-[100px] animate-float-custom"></div>
        <div className="absolute bottom-[10%] right-[20%] w-64 h-64 bg-brand-coffee-light/20 rounded-full blur-[100px] animate-float-custom" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="z-10 w-full max-w-md">

        {/* Main Card */}
        <div className="glass-panel p-8 flex flex-col items-center text-center">

          {/* Logo Animation - Precise Fit */}
          <div className="w-32 h-32 relative mb-6 rounded-full overflow-hidden shadow-2xl border-2 border-brand-gold/10">
            <Image
              src="/LogoVecyGold.gif"
              alt="Vecy Bienes Raíces AI"
              fill
              className="object-cover scale-[1.2]"
              unoptimized
            />
          </div>

          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-gold via-white to-brand-gold mb-2 drop-shadow-sm">
            VECY AI
          </h1>
          <p className="text-brand-coffee-light text-lg mb-8 font-light">
            Plataforma Inmobiliaria Inteligente
          </p>

          <div className="w-full space-y-4">
            <Link href="/admin" className="block w-full">
              <button className="w-full btn-gold group">
                <span className="mr-2">Ingresar al Dashboard</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            <Link href="/propiedades" className="block w-full">
              <button className="w-full btn-ios bg-white/5 text-white border border-white/10 hover:bg-white/10">
                <Sparkles className="w-5 h-5 mr-2 text-brand-gold" />
                Explorar Tienda Pública
              </button>
            </Link>
          </div>

          <div className="mt-8 flex items-center text-xs text-white/40">
            <Lock className="w-3 h-3 mr-1" />
            <span>Acceso Seguro &bull; Vecy Bienes Raíces 2026</span>
          </div>

        </div>
      </div>

    </main>
  );
}
