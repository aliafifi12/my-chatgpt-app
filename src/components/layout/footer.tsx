import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0 border-t bg-background/95">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} ChatGPT Pro. جميع الحقوق محفوظة.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/disclaimer" className="text-sm text-muted-foreground hover:text-primary">
            إخلاء المسؤولية
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
            سياسة الخصوصية
          </Link>
        </div>
      </div>
    </footer>
  );
}
