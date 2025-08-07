import { Creature } from "../types/creature";

export default function CreatureCard({ creature }: { creature: Creature }) {
  return (
    <div className="rounded-2xl shadow-lg p-4 bg-white space-y-2">
      <h2 className="text-xl font-bold">{creature.name}</h2>
      <p className="text-gray-700">{creature.description}</p>
      <div className="text-sm text-gray-500">
        <span className="font-medium">Pace:</span> {creature.pace} •{" "}
        <span className="font-medium">Parry:</span> {creature.parry} •{" "}
        <span className="font-medium">Toughness:</span> {creature.toughness}
      </div>

      <div>
        <h3 className="font-semibold">Attributes</h3>
        <ul className="ml-4 list-disc">
          {creature.attributes.map((attr) => (
            <li key={attr.name}>
              {attr.name}: {attr.dieType}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold">Abilities</h3>
        <ul className="ml-4 list-disc">
          {creature.abilities.map((a) => (
            <li key={a.name}>
              <span className="font-medium">{a.name}:</span> {a.description}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold">Tags</h3>
        <div className="flex flex-wrap gap-2 mt-1">
          {creature.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-200 text-sm px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
