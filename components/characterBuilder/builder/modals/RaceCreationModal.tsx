"use client";
import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function RaceCreationModal({ isOpen, onClose }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-base-100 w-full max-w-lg rounded-3xl shadow-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-header text-3xl text-primary">Create New Race</h2>
          <button
            onClick={onClose}
            className="text-base-content/70 hover:text-base-content"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Race Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full bg-base-200"
              placeholder="e.g. Shadowkin"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Short Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered w-full h-32 bg-base-200"
              placeholder="Brief lore..."
            />
          </div>

          {/* Future Racial Abilities Section */}
          <div className="pt-6 border-t border-base-300">
            <p className="text-sm text-base-content/70 mb-3">
              Racial Abilities (coming in next phase)
            </p>
            <button className="btn btn-outline btn-sm w-full">
              + Add Racial Ability
            </button>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button onClick={onClose} className="btn btn-ghost flex-1">
            Cancel
          </button>
          <button
            onClick={() => {
              console.log("Race created (skeleton)", { name, description });
              onClose();
            }}
            className="btn btn-primary flex-1"
          >
            Create Race
          </button>
        </div>
      </div>
    </div>
  );
}
