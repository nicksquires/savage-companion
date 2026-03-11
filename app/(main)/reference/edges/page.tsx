import { getEdges } from "../../../../lib/utils/getEdges";
import EdgePageClient from "@/components/compendium/edges/EdgePageClient";
import EdgesHeader from "@/components/compendium/edges/EdgesHeader";

export default async function EdgeListPage() {
  const edges = await getEdges();

  return (
    <>
      <div className="flex justify-center">
        <EdgesHeader />
      </div>
      <div className="flex min-w-5/6 flex-col items-center justify-center mb-10">
        <EdgePageClient edges={edges} />
      </div>
    </>
  );
}
