import { seedCoreEdges } from "./seeds/core/core-edges";
import { seedCoreEffects } from "./seeds/core/core-effects";
import { seedCoreHindrances } from "./seeds/core/core-hindrances";
import { seedCorePowers } from "./seeds/core/core-powers";
import { seedCoreRacialAbilities } from "./seeds/core/core-racial-abilities";
import { seedCoreTags } from "./seeds/core/core-tags";
import { seedSources } from "./seeds/sources";

async function main() {
  await seedSources();          // must run first
  await seedCoreTags();         // must run first
  
  await seedCoreHindrances();
  await seedCoreEdges();
  // await seedCoreEffects();
  // await seedCorePowers();
  // await seedCoreRacialAbilities();

//   await seedCoreItems();
//   await seedCoreFirearms();
}

main()
  .then(() => {
    console.log("All seeds completed ✅");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });