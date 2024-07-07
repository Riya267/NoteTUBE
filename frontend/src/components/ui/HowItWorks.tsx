interface HowItWorksProps {
  title: string;
  description: string;
  steps: { id: number; title: string; description: string }[];
}

const HowItWorks: React.FC<HowItWorksProps> = ({
  title,
  steps,
  description,
}) => {
  return (
    <section
      className="my-12 mx-6 rounded-full rounded-tl-none bg-gray-900 py-14"
      id="how"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
          {title}
        </h2>
        <p className="text-gray-300 text-lg mb-8">{description}</p>
        <ol className="list-decimal list-inside text-gray-300 text-lg space-y-4">
          {steps.map((step) => (
            <li
              key={step.id}
              className="bg-slate-900 p-8 rounded-full rounded-tr-none border border-dashed"
            >
              <strong>{step.title}</strong> {step.description}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HowItWorks;
