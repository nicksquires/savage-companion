"use client";

import { useState, useTransition } from "react";
import { PenIcon, Plus, Trash2 } from "lucide-react";
import DeleteModal from "@/components/characterBuilder/builder/modals/DeleteModal";
import {
  createNewCharacter,
  deleteCharacter,
} from "../../../../app/(main)/characters/[id]/builder/api/draft/characterActions";
import { useRouter } from "next/navigation";

type Character = {
  id: string;
  name: string;
  concept: string | null;
  rank: string;
  builderState: any;
};

export default function CharacterListClient({
  characters,
}: {
  characters: Character[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const draft = characters.find((c) => c.builderState !== null);
  const hasDraft = !!draft;

  const handleAction = () => {
    if (hasDraft) {
      router.push(`/characters/${draft.id}/builder/concept`);
    } else {
      startTransition(() => {
        createNewCharacter();
      });
    }
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      startTransition(() => {
        deleteCharacter(deleteId);
      });
    }
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-header text-5xl text-primary">My Characters</h1>
        <button
          onClick={handleAction}
          disabled={isPending}
          className="btn btn-primary gap-2"
        >
          <Plus className="w-5 h-5" />
          {isPending
            ? "Loading..."
            : hasDraft
              ? "Resume Draft"
              : "New Character"}
        </button>
      </div>

      {characters.length === 0 ? (
        <div className="card bg-base-200 p-12 text-center">
          <p className="text-xl text-base-content/60">No characters yet.</p>
          <button
            onClick={handleAction}
            disabled={isPending}
            className="btn btn-primary btn-lg mt-6"
          >
            Create Your First Character
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {characters.map((char) => {
            const isDraft = char.builderState !== null;
            return (
              <div
                key={char.id}
                className="card bg-base-100 hover:bg-base-200 border border-base-300 p-6 transition-all hover:shadow-xl group relative"
              >
                <a
                  href={
                    isDraft
                      ? `/characters/${char.id}/builder/concept`
                      : `/characters/${char.id}/sheet`
                  }
                  className="block"
                >
                  <div className="font-header text-2xl flex items-center gap-2">
                    {char.name}
                    {isDraft && (
                      <span className="text-xs badge badge-warning px-2">
                        DRAFT
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-base-content/60 mt-1">
                    {char.concept || "No concept yet"}
                  </div>
                  <div className="text-xs mt-4 badge badge-primary px-1">
                    {char.rank}
                  </div>
                </a>

                {/* Edit & Delete Form/Buttons */}
                <div className="absolute bottom-4 right-1 opacity-50 group-hover:opacity-100 transition flex">
                  <a
                    href={
                      isDraft
                        ? `/characters/${char.id}/builder/concept`
                        : `/characters/${char.id}/builder`
                    }
                    className="btn btn-ghost btn-circle text-success hover:bg-error/10"
                    title="Edit Character"
                  >
                    <PenIcon className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => {
                      setDeleteId(char.id);
                      setShowDeleteModal(true);
                    }}
                    className="btn btn-ghost btn-circle text-error hover:bg-error/10"
                    title="Delete Character"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title={draft?.id === deleteId ? "Delete Draft?" : "Archive Character?"}
        message={
          draft?.id === deleteId
            ? "This will permanently delete the draft. This action cannot be undone."
            : "This will archive the character (soft delete). You can restore it later."
        }
      />
    </>
  );
}
