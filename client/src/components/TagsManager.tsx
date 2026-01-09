import { useTags } from "@/contexts/TagsContext";
import { X, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface TagsManagerProps {
  itemId: string;
  onTagsChange?: (tags: string[]) => void;
}

/**
 * Design Philosophy: Dark Historical Archive
 * - Componente para gerenciar tags de um item
 * - Permite adicionar e remover tags
 */

export default function TagsManager({ itemId, onTagsChange }: TagsManagerProps) {
  const { tags, getTagsByItemId, addTagToItem, removeTagFromItem, addTag } = useTags();
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState("bg-blue-600");
  const itemTags = getTagsByItemId(itemId);

  const colors = [
    "bg-blue-600",
    "bg-red-600",
    "bg-green-600",
    "bg-yellow-600",
    "bg-purple-600",
    "bg-pink-600",
    "bg-indigo-600",
    "bg-amber-600",
  ];

  const handleAddTag = () => {
    if (newTagName.trim()) {
      const tag = {
        id: Date.now().toString(),
        nome: newTagName,
        cor: newTagColor,
        itemIds: [itemId],
      };
      addTag(tag);
      setNewTagName("");
      onTagsChange?.(itemTags.map((t) => t.id));
    }
  };

  const handleRemoveTag = (tagId: string) => {
    removeTagFromItem(tagId, itemId);
    onTagsChange?.(itemTags.filter((t) => t.id !== tagId).map((t) => t.id));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Tags
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {itemTags.map((tag) => (
            <div
              key={tag.id}
              className={`${tag.cor} text-white px-3 py-1 rounded-full text-sm flex items-center gap-2`}
            >
              {tag.nome}
              <button
                onClick={() => handleRemoveTag(tag.id)}
                className="hover:opacity-80"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            placeholder="Nova tag..."
            className="flex-1 px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
            onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
          />
          <select
            value={newTagColor}
            onChange={(e) => setNewTagColor(e.target.value)}
            className="px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            {colors.map((color) => (
              <option key={color} value={color}>
                {color.replace("bg-", "").replace("-600", "")}
              </option>
            ))}
          </select>
          <Button
            onClick={handleAddTag}
            className="bg-amber-600 hover:bg-amber-700 text-black"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
