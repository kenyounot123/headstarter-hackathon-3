import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-5 mt-5">
      <h1 className="font-semibold text-5xl text-center max-w-[800px]">Boost Sales with AI-Powered <span className="bg-my-accent">Transcript Insights</span> and Annotation</h1>
      <div className="min-h-24 w-full max-w-[800px]">
        <Image src={"/rilla.png"} alt="VoiceTaker" width={0} height={0} className="w-full h-auto object-cover" sizes="100vw"/>
      </div>
      <div>
        <Button size={"lg"} className="text-xl">Get Started</Button>
      </div>
      <div className="relative min-w-[300px] max-w-[800px] min-h-96 w-[90%] bg-slate-900 rounded">
        {/* <Image
          src=""
          alt="Placeholder"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        /> */}
      </div>
    </main>
  );
}
