import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-5 mt-5 pt-5">
      <h1 className="font-semibold text-5xl text-center max-w-[900px]">Boost Sales with AI-Powered Transcript<span className="bg-my-accent my-5 px-2 ml-5 inline-block rotate-[-5deg]">Insights</span> and <span className="bg-my-accent my-5 px-2 inline-block rotate-[5deg]">Annotation</span></h1>
      <p className="text-2xl text-center">Highlight, comment, and collaborate effortlessly with smart text interactions.</p>
      <div>
        <Link href={'/transcript'}><Button size={"lg"} className="text-xl">Get Started</Button></Link>
      </div>
      <div className="relative min-w-[300px] max-w-[800px] min-h-96 w-[90%] bg-slate-900 rounded shadow shadow-lg">
        {/* <Image
          src=""
          alt="Placeholder"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
          /> */}
      </div>
      {/* <div className="min-h-24 w-full max-w-[800px] h-26 absolute -z-99 bottom-24 right-0">
        <Image src={"/sound1.png"} alt="VoiceTaker" width={0} height={0} className="w-full h-[200px] object-cover" sizes="100vw"/>
      </div> */}
    </main>
  );
}
