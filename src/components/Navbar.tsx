import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-2 w-[95%] mx-auto">
      <div className="flex items-center gap-2">
        <div>
          <Link href={'/'}>
            <Image src={"/favicons/favicon-32x32.png"} alt="VoiceTaker" width={32} height={32}/>
          </Link>
        </div>
        <Link href={'/'}>
          <h3>VoiceTaker</h3>
        </Link>
      </div>
      <div>
        <Button variant="outline" className="uppercase text-primary hover:text-primary">
          Login
        </Button>
      </div>
    </nav>
  )
}