import { Button } from "@/components/ui/button";
import Link from "next/link";
interface VideoProps {
  className: string
}
function Video({className}:VideoProps) {
  return (
    <video className={className}
    width="0" 
    height="0"
    playsInline 
    autoPlay 
    muted
    loop 
    preload="auto">
      <source src="/demo.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-5 mt-5 pt-5">
      <h1 className="font-semibold text-5xl text-center max-w-[900px]">Boost Sales with AI-Powered Transcript<span className="bg-my-accent my-5 px-2 ml-5 inline-block rotate-[-5deg]">Insights</span> and <span className="bg-my-accent my-5 px-2 inline-block rotate-[5deg]">Annotation</span></h1>
      <p className="text-2xl text-center">Highlight, comment, and collaborate effortlessly with smart text interactions.</p>
      <div>
        <Link href={'/transcript'}><Button size={"lg"} className="text-xl">Get Started</Button></Link>
      </div>
      <div className="relative min-w-[300px] max-w-[800px] min-h-96 w-[90%] aspect-[16/9] shadow shadow-xl">
        <Video className={'w-full h-full object-cover rounded'}/>
      </div>
      {/* <div className="min-h-24 w-full max-w-[800px] h-26 absolute -z-99 bottom-24 right-0">
        <Image src={"/sound1.png"} alt="VoiceTaker" width={0} height={0} className="w-full h-[200px] object-cover" sizes="100vw"/>
      </div> */}
    </main>
  );
}
