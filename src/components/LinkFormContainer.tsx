import { LinkItem, LinkFormMode } from "../types/types";
import LinkForm from "./LinkForm";
import { useState, useEffect } from "react";

interface LinkFormContainerProps {
  onSubmit: (data: LinkItem) => void;
  mode: LinkFormMode;
  initialData?: LinkItem | null;
  onCancel: () => void;
}

export default function LinkFormContainer({
  onSubmit,
  mode,
  initialData,
  onCancel
}: LinkFormContainerProps) {

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

const handleSubmit = () => {
  if (mode === "edit" && initialData) {
    onSubmit({
      ...initialData,
      title,
      url,
      description,
      tags,
    });
  } else {
    onSubmit({
      title,
      url,
      description,
      tags,
    } as any); // raw data only
  }

  // reset form after submit
  setTitle("");
  setUrl("");
  setDescription("");
  setTags([]);
  setTagInput("");
};  return (
    <LinkForm
      mode={mode}
      title={title}
      url={url}
      description={description}
      tags={tags}
      tagInput={tagInput}
      onTitleChange={setTitle}
      onUrlChange={setUrl}
      onDescriptionChange={setDescription}
      onTagInputChange={setTagInput}
      onAddTag={addTag}
      onRemoveTag={removeTag}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  );
}