import { seedSources } from "./seeds/sources";
import { seedCoreTags } from "./seeds/core/core-tags";
import { seedCoreEdges } from "./seeds/core/core-edges";
import { seedCoreHindrances } from "./seeds/core/core-hindrances";
import { seedCorePowers } from "./seeds/core/core-powers";
import { seedCoreRacialAbilities } from "./seeds/core/core-racial-abilities";
import { seedHomebrewRacialAbilities } from "./seeds/homebrew/homebrew-racial-abilities";
import { seedCoreRaces } from "./seeds/core/core-races";
import { seedHomebrewRaces } from "./seeds/homebrew/homebrew-races";
import { seedCoreSkills } from "./seeds/core/core-skills";
import { seedCoreArcaneBackgrounds } from "./seeds/core/core-arcane-backgrounds";
import { seedCoreItems } from "./seeds/core/core-items";

async function main() {
  await seedSources();          // must run first
  await seedCoreTags();         // must run first
  await seedCoreEdges();
  await seedCoreHindrances();
  await seedCorePowers();

  await seedCoreRacialAbilities();  // must run before seed core races
  await seedHomebrewRacialAbilities();  // must run before seed homebrew races
  await seedCoreRaces();
  await seedHomebrewRaces();

  await seedCoreSkills();
  await seedCoreArcaneBackgrounds();

  await seedCoreItems();
}

main()
  .then(() => {
    console.log("All seeds completed ✅");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });