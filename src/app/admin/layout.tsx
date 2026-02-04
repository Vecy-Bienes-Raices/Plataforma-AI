export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-brand-coffee-darkest text-stone-200">
            <div className="container mx-auto p-6">
                <header className="mb-8 flex justify-between items-center border-b border-white/10 pb-4">
                    <h1 className="text-2xl font-bold text-brand-gold">Panel Administrativo</h1>
                    <div className="text-sm text-white/50">Vecy Bienes Raíces</div>
                </header>

                <main className="glass-panel-dark p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
