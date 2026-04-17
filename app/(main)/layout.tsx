import Navbar from "@/components/Navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Navbar bây giờ chỉ thuộc về nhà (main) */}
      <Navbar />

      {/* pt-24 để đẩy nội dung xuống, không bị Navbar đè lên */}
      <main className=" min-h-screen">{children}</main>
    </>
  );
}
