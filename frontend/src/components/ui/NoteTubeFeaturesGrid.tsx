import FeaturesCard from './FeaturesCard';
interface NoteTubeFeaturesGridProps {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const NoteTubeFeaturesGrid: React.FC<{
  noteTubeFeatures: NoteTubeFeaturesGridProps[];
}> = ({ noteTubeFeatures }) => {
  return (
    <section id="why" className="bg-gray-900 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-slate-50 font-bold text-3xl sm:text-4xl mb-8">
          Why use NoteTube?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {noteTubeFeatures.map((feature) => (
            <FeaturesCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NoteTubeFeaturesGrid;
