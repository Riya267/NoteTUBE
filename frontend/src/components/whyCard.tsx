import { CardProps } from '../types';

function Card({ icon, title, description }: CardProps) {
  return (
    <div className="bg-gray-900 text-white rounded-lg p-6 shadow-lg">
      <div className="flex items-center mb-4">
        <div className="text-4xl mr-4">{icon}</div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

export default Card;
