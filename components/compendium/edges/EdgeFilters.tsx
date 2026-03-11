"use client";

export type Rank = "NOVICE" | "SEASONED" | "VETERAN" | "HEROIC" | "LEGENDARY";
export type EdgeSortField = "name" | "category" | "rank" | "sourceName";
export type SortDirection = "asc" | "desc";

export interface EdgeFilterState {
  search: string;
  category: string;
  rank: Rank | "";
  sourceName: string;
  sortBy: EdgeSortField;
  sortDir: SortDirection;
}

interface Props {
  value: EdgeFilterState;
  onChange: (value: EdgeFilterState) => void;
}

export default function EdgeFilters({ value, onChange }: Props) {
  const update = (patch: Partial<EdgeFilterState>) =>
    onChange({ ...value, ...patch });

  return (
    <div className="card bg-base-200 p-6 shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
        {/* Name Search */}
        <div className="form-control">
          <label className="label mb-2">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Search name..."
            className="input input-bordered"
            value={value.search}
            onChange={(e) => update({ search: e.target.value })}
          />
        </div>

        {/* Source */}
        <div className="form-control">
          <label className="label mb-2">
            <span className="label-text">Source</span>
          </label>
          <select
            className="select select-bordered"
            value={value.sourceName}
            onChange={(e) => update({ sourceName: e.target.value })}
          >
            <option value="">All</option>
            <option value="Savage Worlds Adventure Edition">SWADE Core</option>
            <option value="Homebrew">Homebrew</option>
          </select>
        </div>

        {/* Category */}
        <div className="form-control">
          <label className="label mb-2">
            <span className="label-text">Category</span>
          </label>
          <select
            className="select select-bordered"
            value={value.category}
            onChange={(e) => update({ category: e.target.value })}
          >
            <option value="">All</option>
            <option value="background">Background</option>
            <option value="combat">Combat</option>
            <option value="social">Social</option>
            <option value="professional">Professional</option>
            <option value="power">Power</option>
            <option value="leadership">Leadership</option>
            <option value="weird">Weird</option>
          </select>
        </div>

        {/* Rank */}
        <div className="form-control">
          <label className="label mb-2">
            <span className="label-text">Rank</span>
          </label>
          <select
            className="select select-bordered"
            value={value.rank}
            onChange={(e) => update({ rank: e.target.value as Rank })}
          >
            <option value="">All</option>
            <option value="NOVICE">Novice</option>
            <option value="SEASONED">Seasoned</option>
            <option value="VETERAN">Veteran</option>
            <option value="HEROIC">Heroic</option>
            <option value="LEGENDARY">Legendary</option>
          </select>
        </div>

        {/* Reset */}
        <button
          className="btn btn-outline"
          onClick={() =>
            onChange({
              search: "",
              category: "",
              rank: "",
              sourceName: "",
              sortBy: "name",
              sortDir: "asc",
            })
          }
        >
          Reset
        </button>
      </div>
    </div>
  );
}
