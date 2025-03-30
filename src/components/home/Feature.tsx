import { FaUserAstronaut } from "react-icons/fa";
import { IoRocketSharp, IoShield } from "react-icons/io5";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl bg-[#03001C]/32 px-6 py-8">
      {icon}
      <h3 className="font-heading text-xl font-semibold">{title}</h3>
      <p className="text-white/72">{description}</p>
    </div>
  );
};

export default function Feature() {
  return (
    <div
      className="sv-section-aurora container py-16 text-center text-white"
      id="feature"
    >
      <h2 className="font-heading text-4xl font-semibold">
        Take Your Links to the Next Level
      </h2>
      <p className="mt-3 text-xl">
        Designed to make sharing links simple and secure.
      </p>
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        <FeatureCard
          icon={<FaUserAstronaut size={56} />}
          title="Personal"
          description="Customize your links to reflect your brand and style."
        />
        <FeatureCard
          icon={<IoRocketSharp size={56} />}
          title="Fast"
          description="Shorten your links in seconds with our powerful API."
        />
        <FeatureCard
          icon={<IoShield size={56} />}
          title="Secure"
          description="Protect your links with password and expiration date."
        />
      </div>
    </div>
  );
}
