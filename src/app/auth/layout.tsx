"use client";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex-1 h-screen bg-[#0F172A] overflow-y-auto">
      {children}
    </div>
  );
};

export default AuthLayout;
