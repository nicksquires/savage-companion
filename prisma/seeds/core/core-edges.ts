// Dependencies: core-tags
import { prisma } from "../../client";
import { Rank } from "@prisma/client";
import edges from "../json/core/core-edges.json";
import { toJson } from "../toJson";

export async function seedCoreEdges() {
  console.log("🌱 Seeding edges...");

  // Counters
  let addedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const edgeData of edges) {
    try {
      // Create Edge with requirements
      // Each seed according to source
      // i.e: core infers homebrew=false and isPublic=true 
      const edge = await prisma.edge.create({
        data: {
          name: edgeData.name,
          slug: edgeData.slug,
          sourceName: edgeData.sourceName,
          category: edgeData.category,
          description: edgeData.description,
          summary: edgeData.summary,          
          rank: edgeData.rank as Rank,
          requirements: edgeData.requirements ?? [],
          modifierData: edgeData.modifierData ?? "",
          isPublic: edgeData.isPublic,
          authorId: edgeData.authorId,
        },
      });

      // Attach tags (resolve by name)
      for (const tagName of edgeData.tags) {
        const tag = await prisma.tag.findUnique({ where: { name: tagName } });
        if (tag) {
          await prisma.edgeTag.create({
            data: {
              edgeId: edge.id,
              tagId: tag.id,
            },
          });
        }
      }

      console.log(`✅ Seeded edge: ${edge.name}`);
       addedCount++;
    } catch (err: any) {
      // Handle unique constraint violation (edge already exists)
      if (err.code === "P2002") {
        console.log(`⏭ Skipped edge: ${edgeData.name} (already exists)`);
        skippedCount++;
      } else {
        console.error(`❌ Failed to seed edge ${edgeData.name}:`, err);
        failedCount++;
      }
    }
  }

  const total = edges.length;

  console.log("\n📊 Seeding summary:");
  console.log(`   ✅ Added:   ${addedCount}`);
  console.log(`   ⏭ Skipped: ${skippedCount}`);
  console.log(`   ❌ Failed:  ${failedCount}`);
  console.log(`   📦 Total:   ${total}`);
  console.log("🌱 Finished seeding edges.");
}

// Allow standalone execution
if (require.main === module) {
  seedCoreEdges()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}