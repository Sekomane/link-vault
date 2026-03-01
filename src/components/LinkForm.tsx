import { LinkFormMode } from "../types/types";

interface LinkFormProps {
  mode: LinkFormMode;
  title: string;
  url: string;
  description: string;
  tags: string[];
  tagInput: string;
  onTitleChange: (value: string) => void;
  onUrlChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onTagInputChange: (value: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function LinkForm({
  mode,
  title,
  url,
  description,
  tags,
  tagInput,
  onTitleChange,
  onUrlChange,
  onDescriptionChange,
  onTagInputChange,
  onAddTag,
  onRemoveTag,
  onSubmit,
  onCancel
}: LinkFormProps) {

  return (
    <form
      className="link-form"
      onSubmit={(e) => {
        e.preventDefault(); 
        onSubmit();       
      }}
    >
      <h2>{mode === "create" ? "Add New Link" : "Edit Link"}</h2>

      {/* Title */}
      <div className="form-group">
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          required
        />
      </div>

      {/* URL */}
      <div className="form-group">
        <label>URL</label>
        <input
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          required
        />
      </div>

      {/* Description */}
      <div className="form-group">
        <label>Description</label>
        <textarea
          className="description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      </div>

      {/* Tags */}
      <div className="form-group">
        <label>Tags</label>

        <div className="tags-display">
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
              <button
                type="button"
                className="tag-remove"
                onClick={() => onRemoveTag(tag)}
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
          onChange={(e) => onTagInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onAddTag();
            }
          }}
        />
      </div>

      {/* Actions */}
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