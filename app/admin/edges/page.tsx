import Link from "next/link";
import { Edge } from "@prisma/client";

// Fetch all edges on the server
async function getEdges(): Promise<Edge[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/edges`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch edges");
  return res.json();
}

export default async function EdgeListPage() {
  const edges = await getEdges();

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">All Edges</h1>
        <Link
          href="/edges/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Edge
        </Link>
      </div>

      {/* Filter options */}
      <div className="mb-4 flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search by name..."
          className="px-3 py-2 border rounded w-full max-w-sm"
        />
        {/* Add dropdowns for category or rank filtering later */}
      </div>

      <div className="join">
        <div>
          <div>
            <input
              className="input input-bordered join-item"
              placeholder="Search"
            />
          </div>
        </div>
        <select
          className="select select-bordered join-item"
          defaultValue={"Filter"}
        >
          <option value="Filter" disabled>
            Filter
          </option>
          <option value="Sci-fi">Sci-fi</option>
          <option value="Drama">Drama</option>
          <option value="Action">Action</option>
        </select>
        <div className="indicator">
          {/* <span className="indicator-item badge badge-secondary">new</span> */}
          <button className="btn join-item">Search</button>
        </div>
      </div>

      <ul className="space-y-4">
        {edges.map((edge) => (
          <li
            key={edge.id}
            className="p-4 bg-white shadow-md rounded-md border"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{edge.name}</h2>
                <p className="text-sm text-gray-600">
                  <strong>Category:</strong> {edge.category || "Uncategorized"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Rank:</strong> {edge.rank}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/edges/${edge.id}/edit`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <form action={`/api/edges/${edge.id}`} method="POST">
                  <input type="hidden" name="_method" value="DELETE" />
                  <button
                    type="submit"
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
            <p className="mt-2 text-gray-800 whitespace-pre-line">
              {edge.effects}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";

// type Edge = {
//   id: string;
//   name: string;
//   category?: string;
//   rank: string;
//   effects: string;
// };

// export default function EdgeListPage() {
//   const [edges, setEdges] = useState<Edge[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchEdges = async () => {
//       try {
//         const res = await fetch("/api/edges");
//         if (!res.ok) throw new Error("Failed to fetch edges");

//         const data = await res.json();
//         setEdges(data);
//       } catch (err: any) {
//         setError(err.message || "An error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEdges();
//   }, []);

//   if (loading) return <p>Loading edges...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">All Edges</h1>
//       <ul className="space-y-4">
//         {edges.map((edge) => (
//           <li
//             key={edge.id}
//             className="p-4 bg-white shadow-md rounded-md border"
//           >
//             <h2 className="text-lg font-semibold text-gray-800">{edge.name}</h2>
//             <p className="text-sm text-gray-600">
//               <strong>Category:</strong> {edge.category || "Uncategorized"}
//             </p>
//             <p className="text-sm text-gray-600">
//               <strong>Rank:</strong> {edge.rank}
//             </p>
//             <p className="mt-2 text-gray-800">{edge.effects}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
