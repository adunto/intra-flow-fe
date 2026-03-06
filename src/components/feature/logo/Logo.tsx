import Link from "next/link";
import { TypographyH3 } from "@/components/ui/typography";

const Logo = () => {
  return (
    <Link href="/" className="cursor-pointer">
      <TypographyH3>IntraFlow</TypographyH3>
    </Link>
  );
};

export default Logo;
