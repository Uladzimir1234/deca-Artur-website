import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | DECA Windows",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        nav, footer, header { display: none !important; }
        main { padding-top: 0 !important; margin-top: 0 !important; }
      `}} />
      {children}
    </>
  );
}
