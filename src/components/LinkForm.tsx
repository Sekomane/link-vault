import { useState, useEffect } from "react";
import { LinkItem, LinkFormMode, LinkFormSubmitHandler } from "../types/types";

interface LinkFormProps {
  onSubmit: LinkFormSubmitHandler;
  mode: LinkFormMode;
  initialData?: LinkItem | null;
  onCancel: () => void;
}

export default function LinkForm({
  onSubmit,
  mode,
  initialData,
  onCancel
}: LinkFormProps) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setTitle(initialData.title);
      setUrl(initialData.url);
      setDescription(initialData.description);
      setTags(initialData.tags);
    }
  }, [mode, initialData]);

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data: any = {
      title,
      url,
      description,
      tags
    };

    if (mode === "edit" && initialData) {
      data.id = initialData.id;
      data.createdAt = initialData.createdAt;
    }

    onSubmit(data);

    if (mode === "create") {
      setTitle("");
      setUrl("");
      setDescription("");
      setTags([]);
      setTagInput("");
    }
  };

  return (
    <form className="link-form" onSubmit={handleSubmit}>
      <h2>{mode === "create" ? "Add New Link" : "Edit Link"}</h2>

      <div className="form-group">
        <label>Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} required />
      </div>

      <div className="form-group">
        <label>URL</label>
        <input value={url} onChange={e => setUrl(e.target.value)} required />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          className="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      {/* Tags */}
      <div className="form-group">
        <label>Tags</label>

        <div className="tags-display">
          {tags.map(tag => (
            <span key={tag} className="tag">
              {tag}
              <button
                type="button"
                className="tag-remove"
                onClick={() => removeTag(tag)}
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <input
          className="tag-input"
          placeholder="Type a tag and press Enter"
          value={tagInput}
          onChange={e => setTagInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
        />
      </div>

      <div className="form-actions">
        <button type="submit">
          {mode === "create" ? "Add Link" : "Update Link"}
        </button>

        {mode === "edit" && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
