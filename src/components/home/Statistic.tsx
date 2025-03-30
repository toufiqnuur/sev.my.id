interface CounterCardProps {
  title: string;
  value: number;
}

const CounterCard = ({ title, value }: CounterCardProps) => {
  return (
    <div
      className="flex flex-col items-center gap-4 rounded-3xl bg-gradient-to-t from-indigo-800/5 via-indigo-700/20 to-indigo-500/10 px-4 py-6"
      style={{ boxShadow: "inset rgba(255,255,255,0.05) 0 4px 0 2px" }}
    >
      <p className="font-heading text-6xl font-bold opacity-75 lg:text-8xl">
        {value}
      </p>
      <h3 className="text-lg font-semibold opacity-50 lg:text-2xl">{title}</h3>
    </div>
  );
};

interface StatisticsProps {
  data: { user: number; link: number; click: number };
}

export default function Statistics({ data }: StatisticsProps) {
  return (
    <div className="container py-16 text-center text-white">
      <h2 className="font-heading text-4xl font-semibold">
        Proven Results, Powerful Performance
      </h2>
      <p className="mt-3 text-xl">
        Join thousands of users who rely on us every day to manage their links.
      </p>
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        <CounterCard title="Total Links" value={data.link} />
        <CounterCard title="Total Users" value={data.user} />
        <CounterCard title="Total Clicks" value={data.click} />
      </div>
    </div>
  );
}
