import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Welcome to Fynra!</h1>
        <p className="mt-4 text-lg text-slate-700 dark:text-slate-300">
          Your Gateway to Fynra
        </p>
        </div>
    </div>
  );
}
