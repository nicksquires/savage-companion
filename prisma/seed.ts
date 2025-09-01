import { seedCoreEdges } from "./seeds/core/core-edges";
import { seedCoreHindrances } from "./seeds/core/core-hindrances";
import { seedCoreTags } from "./seeds/core/core-tags";
import { seedSources } from "./seeds/sources";

async function main() {
  await seedSources();  // must run first
  await seedCoreTags();     // must run first
  await seedCoreHindrances();
  await seedCoreEdges();

//   await seedPowers();
//   await seedItems();
}

main()
  .then(() => {
    console.log("All seeds completed ✅");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });