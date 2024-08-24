import Image from "next/image"
import { Button } from "./ui/button"
export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-2 w-[90%] mx-auto">
      <div className="flex items-center gap-2">
        <div>
          <Image src={"/favicons/favicon-32x32.png"} alt="VoiceTaker" width={32} height={32}/>
        </div>
        <h3>VoiceTaker</h3>
      </div>
      <div>
        <Button variant="outline" className="uppercase text-primary hover:text-primary">
          Login
        </Button>
      </div>
    </nav>
  )
}